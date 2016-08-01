<?
// pokus o přihlášení bez OAuth
header('Access-Control-Allow-Origin: http://www.nadisk.cz');
//martpolak ID 9767327

$nick = "login";
$heslo  = "password";
function zdrojak($user,$pass){
$loginData = array('username'=>$user,'password'=>$pass);
$postData = array('url'=>'https://instagram.com/accounts/login/');
$loginURL = "https://instagram.com/accounts/login/";
$addURL = "http://instagram.com/$user/media";
$curl_options = array(
    CURLOPT_RETURNTRANSFER => true,     /* return web page */
    CURLOPT_HEADER         => false,    /* don't return headers */
    //CURLOPT_FOLLOWLOCATION => true,     /* follow redirects */
    CURLOPT_ENCODING       => "utf-8",       /* handle all encodings */
    CURLOPT_AUTOREFERER    => true,     /* set referer on redirect */
    CURLOPT_CONNECTTIMEOUT => 120,      /* timeout on connect */
    CURLOPT_TIMEOUT        => 120,      /* timeout on response */
    CURLOPT_MAXREDIRS      => 10,       /* stop after 10 redirects */
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_SSL_VERIFYPEER => 0
);

$cookie = "cookie.txt";
if ( $ch = curl_init() )
{
    curl_setopt_array($ch,$curl_options);
    if ( $cookie )
    {
        curl_setopt($ch,CURLOPT_COOKIEJAR,$cookie);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_URL, $loginURL);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($loginData) );
        $r = curl_exec($ch);
        curl_setopt($ch, CURLOPT_URL, $addURL);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData) );
        $r = curl_exec($ch);

    }
     curl_close($ch);
}
return ($r);
}

echo zdrojak($nick, $heslo);
