<?php
$apiUrl = 'https://api.onlinecarts.in/';


$shopUrl = isset($_REQUEST["p"]) ? $_REQUEST["p"] : '';
if(!$shopUrl) {
    header("Location: /front");
    exit;
}

$shopUrl = ltrim(trim($shopUrl), '/');
$basePath = ($shopUrl) ? current(explode('/', $shopUrl)).'/' : '/';   
$themeFileName =  basename($shopUrl);

$ismanifest = false;
if (strpos($themeFileName , '.webmanifest') !== false) {
    $ismanifest = true;
}

if($ismanifest){
    $file_parts = pathinfo($themeFileName);
    
    
    if($file_parts["filename"]){
        $url = "{$apiUrl}v1/shop/manifest/".$file_parts["filename"];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,false);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        $rt = curl_exec($ch);
        $info = curl_getinfo($ch);
        if( $info["http_code"] == 200 && $rt){
            //header('Content-disposition: attachment; filename=manifest.webmanifest');
            header("Content-Type: text/json");
            echo $rt;
            exit;
        }
    }
     
   
}else if(
    file_exists("_theme/{$themeFileName}") ||
    file_exists("_theme/assets/{$themeFileName}") || 
    file_exists("_theme/assets/icons/{$themeFileName}") || 
    file_exists("_theme/{$themeFileName}") 
){
    $file_parts = pathinfo($themeFileName);
   
    $filePath = "_theme/".str_replace("$basePath","",$shopUrl);
    switch($file_parts['extension'])
    {
        case "js":
             header("Content-Type: application/javascript");
        break;
    
        case "png":
             header("Content-Type: image/png");
        break;
    
        case "webmanifest":
            
             header("Content-Type: text/json");
        break;
        case "css":
             header("Content-Type: text/css");
        break;
        
        default:
             header("Content-Type: text/json");
        break;
    }
    
   
  
    header("Cache-Control: max-age=604800, public");
    if(file_exists($filePath)){
      echo file_get_contents($filePath);
    }
        
}else{


  
   $url = "{$apiUrl}v1/shopName/".rtrim($basePath, "/");

    
    
    

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    $rt = curl_exec($ch);
    $info = curl_getinfo($ch);

    
    if( $info["http_code"] == 200 && $rt){
        $shop = json_decode($rt, true);
        $data["siteName"] = $shop["name"] ?? 'demo';
        $data["basePath"] = "/{$basePath}";
        $data["shopKey"] =  $shop["shop_key"] ?? 'demo';
        $data["baseUrl"] =  "{$apiUrl}" ?? '';
        $data["themeColor"] = $shop["theme_color"] ?? '#000000';
        
        require_once '_theme/index.php';
    }else{
        header("Location: /front");
        exit;
    }
    
}

//echo $result; 
  
?>