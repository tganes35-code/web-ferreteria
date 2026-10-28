<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

$projectRoots = [
	__DIR__,
	dirname(__DIR__),
];

$projectRoot = null;
foreach ($projectRoots as $root) {
	if (file_exists($root.'/vendor/autoload.php') && file_exists($root.'/bootstrap/app.php')) {
		$projectRoot = $root;
		break;
	}
}

if ($projectRoot === null) {
	http_response_code(500);
	exit('Application dependencies are not installed.');
}

if (file_exists($maintenance = $projectRoot.'/storage/framework/maintenance.php')) {
	require $maintenance;
}

require $projectRoot.'/vendor/autoload.php';

/** @var Application $app */
$app = require_once $projectRoot.'/bootstrap/app.php';

$app->handleRequest(Request::capture());
