<?
header('Access-Control-Allow-Origin: http://www.nadisk.cz');

if($_REQUEST['nick']){
$nick = $_REQUEST['nick'];
$url = "http://".$nick.".rajce.net";

require 'phpQuery.php';
$zdroj = file_get_contents($url);
$zdroje = array($zdroj);
$user = 'user';
$albums = 'albums';

$json = array($user =>array(),$albums =>array());

$doc = phpQuery::newDocument($zdroj);
$nav = $doc['.pagination:first a'];

foreach(pq($nav) as $odkaz) {
        // iteration returns PLAIN dom nodes, NOT phpQuery objects
//        $tagName = $li->tagName;
//        $childNodes = $li->childNodes;
        // so you NEED to wrap it within phpQuery, using pq();
//        pq($li)->addClass('my-second-new-class');
    $href =pq($odkaz)->attr('href');
    if(substr($href,-1) != '1'){
//        echo $url.$href."<br>";
        array_push($zdroje,file_get_contents($url.$href));
    }
    
}

//echo count($zdroje);
foreach($zdroje as $z){
    $doc = phpQuery::newDocument($z);
    
    foreach(pq($doc['.albumItem']) as $li){
        $l = pq($li);
        $albumId = pq($li)->attr('id');
        $albumName = pq($l['.albumName'])->text();
        $albumUrl = pq($l['.albumName'])->attr('href');
        $albumImg = pq($l['.photo .img img'])->attr('src');
        $albumCount = explode(" ", pq($l['.basic span:first'])->text());
        $albumCountImg = $albumCount[0];
        if(count($albumCount)>2)
            $albumCountVid = $albumCount[3];
        else
            $albumCountVid=0;
        if(substr($albumImg,-10)=="locked.png")
            $albumLocked = true;
        else
            $albumLocked = false;
        
        //var_dump( explode(" ",pq($l['.basic span:first'])->text()));
        
        array_push($json[$albums], array(   'id' => $albumId,
                                            'name' => $albumName,
                                            'url' => $albumUrl,
                                            'img' => $albumImg,
                                            'countImg' => $albumCountImg,
                                            'countVid' => $albumCountVid,
                                            'locked' => $albumLocked 
                                        )
                    );
        
        //echo $albumName;
        //echo "\n";
    }
}
echo json_encode($json);
}

