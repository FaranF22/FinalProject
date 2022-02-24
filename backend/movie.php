<?php
class Movie
{
    private $conn;
    private $db_table = "movie";

    public $id;
    public $name;
    public $year;
    public $detail;
    public $picLink;
    public $searchquery;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getMovies()
    {
        $sqlQuery = "SELECT id, name, year, detail, picLink FROM " . $this->db_table . "";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    public function getMoviesNames()
    {
        $sqlQuery = "SELECT id, name FROM " . $this->db_table . "";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    public function createMovie()
    {
        $sqlQuery = "INSERT INTO
                     " . $this->db_table . " SET name = :name,  year = :year, detail = :detail, picLink = :picLink";

        $stmt = $this->conn->prepare($sqlQuery);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->year = htmlspecialchars(strip_tags($this->year));
        $this->detail = htmlspecialchars(strip_tags($this->detail));
        $this->picLink = htmlspecialchars(strip_tags($this->picLink));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":year", $this->year);
        $stmt->bindParam(":detail", $this->detail);
        $stmt->bindParam(":picLink", $this->picLink);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getSingleMovie()
    {
        $sqlQuery = 'SELECT
                     *
                     FROM ' . $this->db_table . '
                 WHERE id = ?
                 ';

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name = $dataRow['name'];
        $this->year = $dataRow['year'];
        $this->detail = $dataRow['detail'];
        $this->picLink = $dataRow['picLink'];
    }

    public function updateMovie()
    {
        $sqlQuery = "UPDATE " . $this->db_table . " SET name = :name, year = :year, detail = :detail, picLink = :picLink WHERE id = :id";

        $stmt = $this->conn->prepare($sqlQuery);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->year = htmlspecialchars(strip_tags($this->year));
        $this->detail = htmlspecialchars(strip_tags($this->detail));
        $this->picLink = htmlspecialchars(strip_tags($this->picLink));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":year", $this->year);
        $stmt->bindParam(":detail", $this->detail);
        $stmt->bindParam(":picLink", $this->picLink);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function deleteMovie()
    {
        $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ?";
        $stmt = $this->conn->prepare($sqlQuery);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function search() {
        $sqlQuery = 'select * from ' . $this->db_table . ' where name=:name or year=:year';

        $stmt = $this->conn->prepare($sqlQuery);

        if (isset($this->searchquery)) {
            $stmt->bindParam(':name', $this->searchquery);
            $stmt->bindParam(':year', $this->searchquery);
        } else {
            $sqlQuery = 'select * from ' . $this->db_table;
        }
        $stmt->execute();
        return $stmt;
    }
}
