<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'database.php';
include_once 'movie.php';

$database = new Database();
$db = $database->getConnection();
$item = new Movie($db);
$data = json_decode(file_get_contents("php://input"), true);
$item->name = $data["name"];
$item->year = $data["year"];
$item->detail = $data["detail"];
$item->picLink = $data["picLink"];

if ($item->name == null || $item->year == null || $item->detail == null || $item->picLink == null) {
    $error = json_encode(array("message" => "Empty", "status" => 400));
    echo $error;
}

if (!isset($error) && $item->createMovie()) {
    echo 'Created';
} else {
    echo 'Not created';
}
