<?php

require_once './Constants.php';

class Database {

	public $db;

	public function __construct() {
		try {
			$this->db = new mysqli(DB_HOST, DB_NAME, DB_PASSWORD, DB_DATABASE);
			mysqli_set_charset($this->db,"utf8");
		} catch (\Exception $ex) {
			die($ex->getMessage());
		}

		return $this->db;
	}

	public function getTemp($dateFrom, $dateTo, $modulo = 5) {
		$dateFrom = convertDateTimeToString($dateFrom);
		$dateTo = convertDateTimeToString($dateTo);

		$result = $this->db->query("
SELECT tmp.*, sen.name, sen.description FROM `temperature` AS tmp 
LEFT JOIN `sensor` AS sen ON sen.id = tmp.sensor_id 
WHERE tmp.created >= '{$dateFrom}' AND tmp.created <= '{$dateTo}' AND tmp.id MOD {$modulo} = 0"
		);

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
SELECT u.id, r.name as role_name, r.key as role_key, u.name, u.email, u.hash
FROM `user_n` as u 
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

	public function updateUserHash($user) {
		$hash = passwordCrypt(time() . random_bytes(50));
		$this->db->query("UPDATE `user_n` AS u SET hash = '{$hash}' WHERE u.id = '{$user->id}'");

		return $hash;
	}

	public function getSingleUser($hash) {
		$result = $this->db->query("
SELECT u.id, r.name as role_name, r.key as role_key, u.name, u.email, u.hash 
FROM `user_n` as u 
LEFT JOIN role as r ON u.role_id = r.id 
WHERE u.hash = '{$hash}' LIMIT 1"
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