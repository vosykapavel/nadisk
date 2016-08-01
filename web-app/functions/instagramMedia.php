<?
header('Access-Control-Allow-Origin: http://www.nadisk.cz');
$url = "http://instagram.com/";
$media = "/media?max_id=";
$nick= $_REQUEST['nick'];
$maxId = ($_REQUEST['max_id']?$_REQUEST['max_id']:'');

$source= file_get_contents($url.$nick.$media.$maxId);
echo $source;