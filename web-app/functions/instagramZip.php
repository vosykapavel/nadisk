<?
header('Access-Control-Allow-Origin: http://www.nadisk.cz');
function picturesInFolder($path)
    {
		if(!(glob($path."/*.{jpg,JPG,png,mp4}",GLOB_BRACE)))
			{
				return array();
			}
		else
			{
				$soubory = glob($path."/*.{jpg,JPG,png}",GLOB_BRACE);
//				$soubory = str_replace($path.'/',"",$soubory);
				return $soubory;
			}
	}
    
function create_zip($files = array(),$destination = '',$overwrite = false) {
  //if the zip file already exists and overwrite is false, return false
  if(file_exists($destination) && !$overwrite) { return false; }
  //vars
  $valid_files = array();
  //if files were passed in...
  if(is_array($files)) {
    //cycle through each file
    foreach($files as $file) {
      //make sure the file exists
      if(file_exists($file)) {
        $valid_files[] = $file;
      }
    }
  }
  //if we have good files...
  if(count($valid_files)) {
    //create the archive
    $zip = new ZipArchive();
    if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
      return false;
    }
    //add the files
    foreach($valid_files as $file) {
        $new_filename = substr($file,strrpos($file,'/') + 1);
        $zip->addFile($file,$new_filename);
    }
    //debug
    //echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;
    
    //close the zip -- done!
    $zip->close();
    
    //check to make sure the file exists
    return file_exists($destination);
  }
  else
  {
    return false;
  }
}

$appKey= $_REQUEST['key'];//'1366233682-4017';
$path1 = '../data/';
$data = '/temp';
$zip = '/zip/';

$path = $path1.$appKey.$data;
if(create_zip(picturesInFolder($path), $path1.$appKey."/".$appKey.".zip")){
    echo "http://nadisk.cz/data/".$appKey."/".$appKey.".zip";
    mail("vosykapavel@gmail.com","NaDisk - instagram", "Stazeni alba z instagramu - "."http://nadisk.cz/data/".$appKey."/".$appKey.".zip");
}else{
    echo "err";
}


