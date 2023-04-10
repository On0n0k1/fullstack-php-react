<?php

namespace api\product;

use InvalidArgumentException;

use api\product\Product;
use api\product\exception\DatabaseException;
use api\utils\Log;
use api\utils\exception\ProductAlreadyExists;

class Book extends Product
{
    private $weight;

    public function __construct(array $args)
    {
        if (!$this->isValid($args)) {
            throw new InvalidArgumentException("Invalid arguments");
        }
        parent::__construct($args);
        $this->setWeight($args['weight']);
    }

    public function save($connection)
    {
        Log::debug('Inserting Product');

        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $type = $this->getType();
        $weight = $this->getWeight();

        $result = $connection->query("INSERT INTO products (sku, name, price, type) VALUES ('{$sku}', '{$name}', {$price}, '{$type}')");

        // check if result was successful
        if ($result === false) {
            if (mysqli_errno($connection) == 1062) {
                Log::debug("Checking error code 1062");
                throw new ProductAlreadyExists("Item Already Exists");
            }
            throw new DatabaseException("Error while inserting product");
        }

        Log::debug('Inserting Book');
        $result = $connection->query("INSERT INTO book_products (sku, weight) VALUES ('{$sku}', '{$weight}')");

        // check if result was successful
        if ($result === false) {
            if (mysqli_errno($connection) == 1062) {
                Log::debug("Checking error code 1062");
                throw new ProductAlreadyExists("Item Already Exists");
            }
            throw new DatabaseException("Error while inserting book");
        }
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function setWeight(float $weight)
    {
        $this->weight = $weight;
    }

    public function getType(): string
    {
        return 'Book';
    }

    public function jsonSerialize(): array
    {
        return array_merge(parent::jsonSerialize(), [
            'weight' => $this->getWeight(),
            'type' => $this->getType(),
        ]);
    }

    public function isValid(array $args): bool
    {
        return parent::isValid($args) &&
            is_numeric($args['weight']);
    }
}