<?php

namespace api;

require_once __DIR__ . '/../vendor/autoload.php';

use api\db\Dao;
use api\utils\Log;
use api\utils\exception\ProductAlreadyExists;
use api\utils\Failure;
use api\utils\Success;

if (isset($_GET['sku'])) {
    $sku = $_GET['sku'];
    $dao = new DAO();

    try {
        $dao->check($sku);
        Log::debug("Check: product SKU is available.");
        http_response_code(200);
    } catch (ProductAlreadyExists $e) {
        Log::debug("Check: product already exists.");
        Failure::skuAlreadyExists();
    }
} else {
    $dao = new DAO();
    $response = $dao->read();
    Success::success($response);
}