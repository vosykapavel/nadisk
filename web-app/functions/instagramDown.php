<?
header('Access-Control-Allow-Origin: http://www.nadisk.cz');
$error = "Sorry boy :(";
if($_REQUEST['url'] && $_REQUEST['key']){
    $url = $_REQUEST['url'];
    $key = $_REQUEST['key'];
    $path = "../data/";
    $temp = "/temp/";
    $odd = "oddelovac";

    if(!is_dir($path.$key)){
        mkdir($path.$key);
    }
    if(is_dir($path.$key)){
        if(!is_dir($path.$key.$temp))mkdir($path.$key.$temp);
        foreach(explode($odd,$url) as $u){
            $u = strtok($u, '?');
            file_put_contents($path.$key.$temp.strrchr($u, "/"),file_get_contents($u));
        }
    }else{
        echo $error;
    }
}else{
    echo $error;
}
