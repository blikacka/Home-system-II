<?php

require_once './Database.php';

class Homesys {

	const METHODS = [
		'getTemperature' => 'GET|/temperature',
		'postLogin' => 'POST|/login'
	];

	public $db;

	function __construct() {
		$this->db = new Database;
	}

	/**
	 * Get temperature data
	 *
	 * [GET]
	 *
	 * PARAMS -
	 * **** dateFrom    = (string)
	 * **** dateTo      = (string|null)
	 *
	 * @param array ...$params
	 */
	public function getTemperature(...$params) {
		$dateFrom = $this->findInArray($params, 'dateFrom');
		$dateTo = $this->findInArray($params, 'dateTo') ?? new \DateTime();

		$data = $this->db->getTemp($dateFrom, $dateTo);
		$this->sendJson($data);
	}

	/**
	 * Post login and return user data
	 *
	 * [POST]
	 *
	 * PARAMS -
	 * **** email       = (string)
	 * **** password    = (string)
	 *
	 * @param array ...$params
	 * @return null
	 */
	public function postLogin(...$params) {
		$email = $this->findInArray($params, 'email');
		$password = $this->findInArray($params, 'password');

		$user = $this->db->getUser($email, $password);

		if (!$user) {
			$this->sendJson('Uživatel nebyl nalezen!', 'error', 404);
			return null;
		}

		$this->sendJson($user);
	}

	private function findInArray($array, $key) {
		$arrIt = new RecursiveIteratorIterator(new RecursiveArrayIterator($array));

		foreach ($arrIt as $sub) {
			$subArray = $arrIt->getSubIterator();
			if (isset($subArray[$key])) {
				return $subArray[$key];
			}
		}

		return null;
	}

	private function sendJson($data, $status = 'ok', $code = 200) {
		header('Content-Type: application/json');
		http_response_code($data instanceof \Exception ? 400 : $code);
		$data = [
			'data' => $data instanceof \Exception ? $data->getMessage() : $data,
			'status' => $data instanceof \Exception ? 'error' : $status
		];
		echo json_encode($data);
	}
}

