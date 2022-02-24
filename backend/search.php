<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once 'database.php';
    include_once 'movie.php';

    $database = new Database();
    $db = $database->connect();
    $movie = new Movie($db);

    $movie->searchquery = isset($_GET['searchquery']) ? $_GET['searchquery'] : die();

    $result = $movie->search();
    $num = $result->rowCount();

    if ($num > 0) {
        $movie_arr = array();
        $movie_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $movie_item = array(
                'id' => $id,
                'name' => $name,
                'year' => $year,
                'detail' => $detail,
                'picLink' => $picLink,
            );
            array_push($movie_arr['data'], $movie_item);
        }
        echo json_encode($movie_arr);
    } else {
        $emptyArray = array();
        $emptyArray['data'] = array();
        echo json_encode(
            $emptyArray
        );
    }