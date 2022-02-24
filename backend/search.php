<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once 'database.php';
    include_once 'movie.php';

    $database = new Database();
    $db = $database->getConnection();
    $movie = new Movie($db);
    $movie->searchText = isset($_GET['searchText']) ? $_GET['searchText'] : die();
    $result = $movie->search();
    $num = $result->rowCount();

    if ($num > 0) {
        $array = array();
        $array['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $movie_item = array(
                'id' => $id,
                'name' => $name,
                'year' => $year,
                'detail' => $detail,
                'picLink' => $picLink,
            );
            array_push($array['data'], $movie_item);
        }
        echo json_encode($array);
    } else {
        $emptyArray = array();
        $emptyArray['data'] = array();
        echo json_encode(
            $emptyArray
        );
    }