<?php

namespace api\utils;

class Failure{
    public static function invalidArgument($response)
    {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }

    public static function skuAlreadyExists()
    {
        http_response_code(409);
        exit();
    }
}