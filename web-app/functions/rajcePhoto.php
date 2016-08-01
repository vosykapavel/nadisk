<?
header('Access-Control-Allow-Origin: http://www.nadisk.cz');
$nick = 'bruise8';
$url = "http://".$nick.".rajce.net";

$text = file_get_contents($url);
$pred = "var albumUserID = ";
$za = ";";

$text = strstr($text, $pred);
$text = str_replace($pred,"",$text);
$text = strstr($text, $za, true);
echo "http://www.rajce.idnes.cz/u".$text."/avatar/tiny.jpg";
