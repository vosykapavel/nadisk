<?
header('Access-Control-Allow-Origin: http://www.nadisk.cz');
if($_REQUEST['url']){
    $url = $_REQUEST['url'];
    require 'phpQuery.php';
    $json = array('album'=>array(),'photos'=>array(), 'status'=>'ok');

    function fotky($zdroj){
            global $json;
            $doc= phpQuery::newDocument($zdroj);
            $albumName = pq($doc['#albumName']);
            $albumName = str_replace("</span>","", $albumName); 
            array_push($json['album'],array('name' => "$albumName"));
            foreach(pq($doc['#photoList a']) as $photo){
                $photoId = pq($photo)->attr('id');
                $photoUrl = pq($photo)->attr('href');
                $photoTitle = pq($photo)->attr('title');
                array_push($json['photos'], array('id'=>$photoId, 'url'=>$photoUrl,'title'=>$photoTitle));
            }
    }
    function je_zamcene($zdroj){
        global $json;
        if(strpos($zdroj,'name="password"')){
            $json['status']='ko';
        }else{
            fotky($zdroj);
        }
    }
    function file_get_contents_curl($url, $post) {
    $ch = curl_init();
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
	curl_setopt($ch, CURLOPT_URL, $url);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
    }

    if($_REQUEST['password'] && $_REQUEST['login']){
        $zdroj = file_get_contents_curl($url,array('login' => $_REQUEST['login'], 'password' => $_REQUEST['password']));
        je_zamcene($zdroj);
             
         
    }else{
        $zdroj = file_get_contents($url);
        je_zamcene($zdroj);
    }
    echo json_encode($json);

}

