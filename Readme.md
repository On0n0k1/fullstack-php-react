# Junior Developer Test Task

Source code for this website: https://lucas-lemos-assessment.000webhostapp.com

## Introduction

Full-stack application with a front-end in React + vite, back-end in php 8.

## Testing

Tests for the deployed website can be found in `/fullstack-php-react-test`. Instructions are included in the `Readme.md` file.

## Requirements

- PHP 8;
- Docker;
- Node.js;

### Environment variables

Environment variables are loaded from .env file at the root. Check .env-example for an example of the values that the '.env' file require and create the file.

The environment variables are the following:

 - MYSQL_USER: Username to connect;
 - MYSQL_PASSWORD: User password to connect;
 - MYSQL_DATABASE: Database that contains the data;
 - MYSQL_PORT: port for connection. Usually 3306 for Mysql;

Important: In order for php to properly connect to the database, make sure that the

## Installation

Only ```Docker``` and `docker-compose` are required to run the application.

PHP uses the package manager `composer`. In order to have proper linting in the php files. It is recommended to run:

```bash
cd back
composer install
```

### Starting/Closing

Start the application using docker-compose as follows:

```bash
# Must be on the root folder
docker-compose up
```

To close the application, run this in the root folder:

```bash
docker-compose down
```

### Removing built containers

```bash
# Close running containers
docker-compose down
# Remove all stopped containers and images
docker system prune -a
# Remove all database volumes
docker volume prune
```

## Usage

Open the browser on ```localhost``` to see the webpage.

### API Endpoints

For testing with a tool like Postman. Incorrect request messages will return status code 400 Bad Request.

#### `GET /api/v1/products`

Retrieves a list of all products. The response will include an array of product objects, each product can be of type DVD, Furniture or Book. Each containing the following properties:

##### DVD

 - `sku` (string): unique identifier for the product.
 - `name` (string): Name of the product.
 - `price` (number): The price of the product.
 - `size` (number): Size (in MB) of the DVD.
 - `type` (string): "DVD".

##### Furniture

 - `sku` (string): unique identifier for the product.
 - `name` (string): Name of the product.
 - `price` (number): The price of the product.
 - `height` (number): The height of the Furniture.
 - `width` (number): The width of the Furniture.
 - `length` (number): The length of the Furniture.
 - `type` (string): "Furniture".

##### Book

 - `sku` (string): unique identifier for the product.
 - `name` (string): Name of the product.
 - `price` (number): The price of the product.
 - `weight` (number): The weight of the book.
 - `type` (string): "Book".

#### `GET /api/v1/products?sku=:sku`

Checks if a product with the specified SKU exists. the `:sku` parameter should be replaced with the SKU to check.

Example request:

```
GET /api/v1/products?sku=example
```

If a product with the specified SKU does **not** exist, the response will have a status code of 200 OK.

If a product with the specified SKU does exist, the response will have a status code of 409 Conflict.

#### `POST /api/v1/products`

Creates a new product. The request body should include a JSON object with the following properties:

##### DVD

 - `sku` (string): unique identifier for the product.
 - `name` (string): Name of the product.
 - `price` (number): The price of the product.
 - `size` (number): Size (in MB) of the DVD.
 - `type` (string): "DVD".

##### Furniture

 - `sku` (string): unique identifier for the product.
 - `name` (string): Name of the product.
 - `price` (number): The price of the product.
 - `height` (number): The height of the Furniture.
 - `width` (number): The width of the Furniture.
 - `length` (number): The length of the Furniture.
 - `type` (string): "Furniture".

##### Book

 - `sku` (string): unique identifier for the product.
 - `name` (string): Name of the product.
 - `price` (number): The price of the product.
 - `weight` (number): The weight of the book.
 - `type` (string): "Book".


Example request body:

```
{
    "sku": "BOOK-400",
    "name": "The Saga of Tanya The Evil: Deus Lo Vult",
    "price": 15,
    "type": "Book",
    "weight": 1
}
```

The response will be a status code 201 CREATED or 409 Conflict with the product SKU already exists. The response body is the updated list of products available.

#### `DELETE/api/v1/products`

Deletes one or more products. The request body should include a JSON object with a single property `products`, which is an array of SKUs representing the products to be deleted.

Example request body:

```
{
  "products": ["sku1", "sku2", "sku3"]
}
```

It will always return 200 OK with the same response as [the first GET endpoint](#get-apiv1products). Regardless if it finds or doesn't find the SKU values. The php backend will log the errors for debugging instead.


## Contributing

This application is not intended to be maintained. Feel free to contribute if you feel like it.

## License

Copyright 2023 Lucas Alessandro do Carmo Lemos

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contact

Contact me through email at stiltztinkerstein@gmail.com
