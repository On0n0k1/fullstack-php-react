<?php

namespace api\product;

use InvalidArgumentException;

use api\product\exception\DatabaseException;
use api\product\Product;
use api\utils\Log;
use api\utils\exception\ProductAlreadyExists;

class DVD extends Product {
    // DVD-specific attributes and methods
    private $size;

    public function __construct(array $args) {
        if (!$this->isValid($args)) {
            throw new InvalidArgumentException("Invalid arguments");
        }

        parent::__construct($args);
        $this->setSize($args['size']);
    }

    public function save($connection) {
        Log::debug('Inserting Product');

        $sku = $this->getSKU();
        $name = $this->getName();
        $price = $this->getPrice();
        $type = $this->getType();
        $size = $this->getSize();

        $result = $connection->query(
            "INSERT INTO products (sku, name, price, type) VALUES ('{$sku}', '{$name}', {$price}, '{$type}')"
        );

        // check if result was successful
        if ($result === false) {
            if (mysqli_errno($connection) == 1062) {
                Log::debug("Checking error code 1062");
                throw new ProductAlreadyExists("Item Already Exists");
            }

            throw new DatabaseException("Error while inserting product");
        }

        Log::debug('Inserting DVD');
        $result = $connection->query(
            "INSERT INTO dvd_products (sku, size) VALUES ('{$sku}', '{$size}')"
        );

        // check if result was successful
        if ($result === false) {
            if (mysqli_errno($connection) == 1062) {
                Log::debug("Checking error code 1062");
                throw new ProductAlreadyExists("Item Already Exists");
            }
            throw new DatabaseException("Error while inserting dvd");
        }
    }

    public function getSize() {
        return $this->size;
    }

    public function setSize(float $size) {
        $this->size = $size;
    }

    public function getType(): string {
        return 'DVD';
    }

    // DVD-specific serialization
    public function jsonSerialize(): array {
        return array_merge(parent::jsonSerialize(), [
            'size' => $this->getSize(),
            'type' => $this->getType(),
        ]);
    }

    // Validate constructor param types before building
    public function isValid(array $args): bool {
        return parent::isValid($args) && 
            is_numeric($args['size']);
    }
}