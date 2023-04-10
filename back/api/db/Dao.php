<?php

declare(strict_types=1);

namespace api\db;

use Dotenv\Dotenv;
use mysqli;

use api\utils\exception\ProductAlreadyExists;
use api\product\Product;

class Dao
{
    protected string $dbHost;
    protected int $dbPort;
    protected string $dbUser;
    protected string $dbPassword;
    protected string $dbDatabase;
    protected mysqli $connection;

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(dirname(__DIR__));
        $dotenv->load();
        
        $this->dbHost = getenv('MYSQL_HOST');
        $this->dbPort = (int) getenv('MYSQL_PORT');
        $this->dbUser = getenv('MYSQL_USER');
        $this->dbPassword = getenv('MYSQL_PASSWORD');
        $this->dbDatabase = getenv('MYSQL_DATABASE');

        $this->connection = new mysqli(
            $this->dbHost,
            $this->dbUser,
            $this->dbPassword,
            $this->dbDatabase,
            $this->dbPort
        );

        if ($this->connection->connect_error) {
            http_response_code(500);
            die('Connection failed: ' . $this->connection->connect_error);
        }
    }

    public function __destruct()
    {
        $this->connection->close();
    }

    public function check(string $sku): void
    {
        $stmt = $this->connection->prepare('SELECT sku FROM products WHERE sku = ?');
        $stmt->bind_param('s', $sku);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows() > 0) {
            throw new ProductAlreadyExists('Item Already Exists');
        }
    }

    public function create(array $data): array
    {
        $factory = new Product($data);
        $product = $factory->createProduct($data);
        $sku = $product->getSku();

        $this->check($sku);

        $product->save($this->connection);

        return $this->read();
    }

    public function read(): array
    {
        $sql = 'SELECT p.sku, p.name, p.price, p.type, d.size AS size, b.weight AS weight, f.height AS height, f.width AS width, f.length AS length
                FROM products p
                LEFT JOIN dvd_products d ON d.sku = p.sku
                LEFT JOIN book_products b ON b.sku = p.sku
                LEFT JOIN furniture_products f ON f.sku = p.sku
                ORDER BY p.sku';

        $result = $this->connection->query($sql);
        $products = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $product = new Product($row);
                $product = $product->createProduct($row);
                $products[] = $product;
            }
        }

        return $products;
    }

    public function delete(array $products): array
    {
        $skuList = implode("', '", $products);
        $query = "DELETE FROM products WHERE sku IN ('$skuList')";
        // Run the delete operation
        $result = $this->connection->query($query);
        // Regardless if successful or failure, retrieve the updated list of items
        return $this->read();
    }
}