<?php

namespace api\utils;

class Success{
    public static function success($response)
    {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
}