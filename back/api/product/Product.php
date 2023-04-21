<?php

namespace api\product;

use JsonSerializable;
use InvalidArgumentException;
use Exception;

use api\product\Book;
use api\product\DVD;
use api\product\Furniture;


class Product implements JsonSerializable {
    protected $sku;
    protected $name;
    protected $price;

    public function __construct(array $args) {
        $this->setSku($args['sku']);
        $this->setName($args['name']);
        $this->setPrice($args['price']);
    }

    public static function createProduct(array $args) {
        $classMap = [
            "DVD" => DVD::class,
            "Furniture" => Furniture::class,
            "Book" => Book::class
        ];

        $itemType = $args['type'];
        $class = $classMap[$itemType] ?? throw new InvalidArgumentException("Product type not specified");

        return new $class($args);
    }

    public function getSku(): string {
        return $this->sku;
    }

    public function setSku(string $sku): void {
        $this->sku = $sku;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getPrice(): float {
        return $this->price;
    }

    public function setPrice(float $price): void {
        $this->price = $price;
    }

    public function getType(): string {
        throw new Exception('Parent Class called');
    }

    public function jsonSerialize(): array {
        return [
            'sku' => $this->getSku(),
            'name' => $this->getName(),
            'price' => $this->getPrice(),
        ];
    }

    public function isValid(array $args): bool {
        return is_string($args['sku']) &&
            is_string($args['name']) &&
            is_numeric($args['price']);
    }
}