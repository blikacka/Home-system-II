<?php
//https://github.com/nikic/FastRoute
require './vendor/autoload.php';
require_once './Homesys.php';

function getUriUrl($uri, $url) {
	return str_replace($url, '', $uri) . $url;
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] === 'POST') {
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: *');
	}
	exit;
}

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if (false !== $pos = strpos($uri, '?')) {
	$uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $route) use ($uri) {
	foreach (Homesys::METHODS as $method => $type) {
		list ($httpMethod, $url) = explode('|', $type);
		$route->addRoute($httpMethod, getUriUrl($uri, $url), $method);
	}
});

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
	case FastRoute\Dispatcher::NOT_FOUND:
		echo 'Page not found!';
		http_response_code(404);
		break;
	case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
		$allowedMethods = $routeInfo[1];
		echo 'Method not allowed!';
		http_response_code(401);
		break;
	case FastRoute\Dispatcher::FOUND:
		$handler = $routeInfo[1];
		$vars = $routeInfo[2] ?? [];
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: *');
		$homesys = new Homesys();
		$homesys->{$handler}(array_merge($_GET, array_merge($_POST, $vars)));
		break;
}
