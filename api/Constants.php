<?php

if (file_exists('./Constants.local.php')) {
	require_once './Constants.local.php';
}

if (!defined('DB_NAME')) {
	define('DB_NAME', '');
}

if (!defined('DB_PASSWORD')) {
	define('DB_PASSWORD', '');
}

if (!defined('DB_HOST')) {
	define('DB_HOST', '');
}

if (!defined('DB_DATABASE')) {
	define('DB_DATABASE', '');
}

if (!defined('PASSWORD_SALT')) {
	define('PASSWORD_SALT', '');
}

/**
 * Convert date time to formatted string
 *
 * @param string|\DateTime $dateTime
 * @param string $format
 * @return string
 */
function convertDateTimeToString($dateTime, $format = 'Y-m-d H:i:s') {
	try {
		if ($dateTime instanceof \DateTime) {
			return $dateTime->format($format);
		} else {
			return (new \DateTime($dateTime))->format($format);
		}
	} catch (\Exception $ex) {
		return (new \DateTime())->format($format);
	}
}

/**
 * Get password hash
 *
 * @param        $password
 * @param string $ultraSalt
 * @return string
 */
function passwordCrypt($password, $ultraSalt = '') {
	return hash('sha256', crypt(sha1($password . $ultraSalt), PASSWORD_SALT));
}