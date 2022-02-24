<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'database.php';
include_once 'movie.php';

$database = new Database();
$db = $database->getConnection();

$item = new Movie($db);
$item->id = isset($_GET['id']) ? $_GET['id'] : die();
$item->getMovie();

if ($item->name != null) {
    $myMovie = array(
        "id" =>  $item->id,
        "name" => $item->name,
        "year" => $item->year,
        "detail" => $item->detail,
        "picLink" => $item->picLink
    );

    http_response_code(200);
    echo json_encode($myMovie);
} else {
    http_response_code(404);
    echo json_encode("Error");
}
