<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'database.php';
include_once 'movie.php';

$database = new Database();
$db = $database->getConnection();
$items = new Movie($db);
$stmt = $items->getMovies();
$itemCount = $stmt->rowCount();

if ($itemCount > 0) {

    $myMovies = array();
    $myMovies["data"] = array();
    $myMovies["itemCount"] = $itemCount;

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $m = array(
            "id" => $id,
            "name" => $name,
            "year" => $year,
            "detail" => $detail,
            "picLink" => $picLink
        );

        array_push($myMovies["data"], $m);
    }
    echo json_encode($myMovies);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "Not found")
    );
}
