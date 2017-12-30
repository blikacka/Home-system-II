<?php

require_once './Constants.php';

class Database {

	public $db;

	public function __construct() {
		try {
			$this->db = new mysqli(DB_HOST, DB_NAME, DB_PASSWORD, DB_DATABASE);
		} catch (\Exception $ex) {
			die($ex->getMessage());
		}

		return $this->db;
	}

	public function getTemp($dateFrom, $dateTo) {
		$dateFrom = convertDateTimeToString($dateFrom);
		$dateTo = convertDateTimeToString($dateTo);

		$result = $this->db->query("SELECT * FROM `temperature` AS tmp WHERE tmp.created >= '{$dateFrom}' AND tmp.created <= '{$dateTo}'");

		$results = [];

		if ($result) {
			while ($row = $result->fetch_object()) {
				$results[] = $row;
			}
			$result->close();
		}

		return $results;
	}

	public function getUser($email, $password) {
		$password = passwordCrypt($password, $email);

		$result = $this->db->query("
SELECT u.id, r.name as role_name, r.key as role_key, u.name, u.email 
FROM `user` as u 
LEFT JOIN role as r ON u.role_id = r.id 
WHERE u.email = '{$email}' AND u.password = '{$password}' LIMIT 1"
		);

		$results = null;

		if ($result) {
			while ($row = $result->fetch_object()) {
				$results = $row;
			}
			$result->close();
		}

		return $results;
	}

}