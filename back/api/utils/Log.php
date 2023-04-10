<?php

namespace api\utils;

class Log {
    public function __construct() {}

    public static function debug(string $msg) {
        error_log('Debug: ' . $msg, E_USER_NOTICE);
    }
}