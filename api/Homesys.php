<?php

require_once './Database.php';

class Homesys {

	const METHODS = [
		'getTemperature' => 'GET|/temperature',
		'postLogin' => 'POST|/login',
		'postControl' => 'POST|/control',
		'postLoggedUser' => 'POST|/logged-user'
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
	 * **** modulo      = (int|null)        - every how result show?
	 *
	 * @param array ...$params
	 */
	public function getTemperature(...$params) {
		$dateFrom = $this->findInArray($params, 'dateFrom');
		$dateTo = $this->findInArray($params, 'dateTo') ?? new \DateTime();
		$modulo = $this->findInArray($params, 'modulo') ?? 5;

		$data = $this->db->getTemp($dateFrom, $dateTo, $modulo);
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

		$hash = $this->db->updateUserHash($user);
		$user->{'hash'} = $hash;

		$this->sendJson($user);
	}

	/**
	 * Post control to control by paython scripts
	 *
	 * [POST]
	 *
	 * PARAMS -
	 * **** user    = (string)  - user hash
	 * **** button  = (string)  - name of python script
	 *
	 * @param array ...$params
	 * @return null
	 */
	public function postControl(...$params) {
		$user = $this->findInArray($params, 'user');
		$button = $this->findInArray($params, 'button');

		$user = $this->db->getSingleUser($user);

		if (!$user) {
			$this->sendJson('Uživatel není přihlášen!', 'error', 401);
			return null;
		}

		$this->sendJson(shell_exec(escapeshellcmd('sudo python /var/www/html/' . $button . '.py')));
	}

	public function postLoggedUser(...$params) {
		$user = $this->findInArray($params, 'user');

		$this->sendJson($this->db->getSingleUser($user));
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

