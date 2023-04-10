<?php

namespace api;

require_once __DIR__ . '/../vendor/autoload.php';

use api\db\Dao;
use api\utils\Log;
use api\utils\Failure;
use api\utils\Success;

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!is_array($data['products'])){
    Failure::invalidArgument("Missing products attribute.");
}

$products = $data['products'];

Log::debug(implode(" ", $products));

$dao = new DAO();
$response = $dao->delete($products);

Success::success($response);