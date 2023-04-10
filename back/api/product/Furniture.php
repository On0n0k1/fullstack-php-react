<?php

namespace api\product;

use InvalidArgumentException;

use api\product\Product;
use api\utils\exception\ProductAlreadyExists;
use api\product\exception\DatabaseException;
use api\utils\Log;

class Furniture extends Product
{
    private $height;
    private $width;
    private $length;

    public function __construct(array $args)
    {
        if (!$this->isValid($args)) {
            throw new InvalidArgumentException("Invalid arguments");
        }

        parent::__construct($args);

        $this->setHeight($args['height']);
        $this->setWidth($args['width']);
        $this->setLength($args['length']);
    }

    public function save($connection)
    {
        Log::debug('Inserting Product');

        $sku = $this->getSKU();
        $name = $this->getName();
        $price = $this->getPrice();
        $type = $this->getType();
        $height = $this->getHeight();
        $width = $this->getWidth();
        $length = $this->getLength();

        $result = $connection->query(
            "INSERT INTO products (sku, name, price, type) VALUES ('{$sku}', '{$name}', {$price}, '{$type}')"
        );

        if ($result === false) {
            if (mysqli_errno($connection) == 1062) {
                Log::debug("Checking error code 1062");
                throw new ProductAlreadyExists("Item Already Exists");
            }
            throw new DatabaseException("Error while inserting product");
        }

        Log::debug('Inserting Furniture');
        $result = $connection->query(
            "INSERT INTO furniture_products (sku, height, width, length) VALUES ('{$sku}', '{$height}', '{$width}', '{$length}')"
        );

        if ($result === false) {
            if (mysqli_errno($connection) == 1062) {
                Log::debug("Checking error code 1062");
                throw new ProductAlreadyExists("Item Already Exists");
            }
            throw new DatabaseException("Error while inserting furniture");
        }
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight(float $height)
    {
        $this->height = $height;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function setWidth(float $width)
    {
        $this->width = $width;
    }

    public function getLength()
    {
        return $this->length;
    }

    public function setLength(float $length)
    {
        $this->length = $length;
    }

    public function getType(): string
    {
        return 'Furniture';
    }

    public function jsonSerialize(): array
    {
        return array_merge(parent::jsonSerialize(), [
            'height' => $this->getHeight(),
            'width' => $this->getWidth(),
            'length' => $this->getLength(),
            'type' => $this->getType(),
        ]);
    }

    public function isValid(array $args): bool
    {
        return parent::isValid($args)
            && is_numeric($args['height'])
            && is_numeric($args['width'])
            && is_numeric($args['length']);
    }
}