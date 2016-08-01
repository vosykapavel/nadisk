<?
header('Access-Control-Allow-Origin: http://www.nadisk.cz');
$error = "Sorry boy :(";
if($_REQUEST['url'] && $_REQUEST['key']&& $_REQUEST['tab']){
    $url = $_REQUEST['url'];
    $key = $_REQUEST['key'];
    $tab = "/".$_REQUEST['tab'];
    $path = "../data/";
    $temp = "/temp/";
    $odd = "oddelovac";

    if(!is_dir($path))mkdir($path);
    if(!is_dir($path.$key))mkdir($path.$key);
    if(!is_dir($path.$key.$tab))mkdir($path.$key.$tab);
    if(!is_dir($path.$key.$tab.$temp))mkdir($path.$key.$tab.$temp);
        foreach(explode($odd,$url) as $u){
            file_put_contents($path.$key.$tab.$temp.strrchr($u, "/"),file_get_contents($u));
        }
}else{
    echo $error;
}