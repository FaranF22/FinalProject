<?php
class Database
{
    private $host = "localhost";
    private $database_name = "movies";
    private $username = "Faran";
    private $password = "#Phoen!X2258";

    public $conn;

    public function getConnection()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo "Error: " . $ex->getMessage();
        }
        return $this->conn;
    }
}
