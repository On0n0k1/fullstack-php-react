<?php

namespace api;

require_once __DIR__ . '/../vendor/autoload.php';

use InvalidArgumentException;

use api\db\Dao;
use api\utils\exception\ProductAlreadyExists;
use api\product\exception\DatabaseException;
use api\utils\Failure;
use api\utils\Success;
use api\utils\Log;


$json = file_get_contents('php://input');
$data = json_decode($json, true);
$dao = new DAO();

try {
    $result = $dao->create($data);
} catch (InvalidArgumentException $e) {
    Log::debug("Request Error: parameters invalid or missing.");
    Failure::invalidArgument(array('error' => $e->getMessage()));
} catch (ProductAlreadyExists $e) {
    Log::debug("Request Error: product already exists.");
    Failure::skuAlreadyExists();
} catch (DatabaseException $e) {
    Log::debug("Request Error: Database Error.");
    http_response_code(500);
    exit();
}

// Set status code to CREATED
http_response_code(201);
Success::success($result);