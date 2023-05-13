<?php
$file=file_get_contents("musicdb.json");

$musicdb=json_decode($file);

if(!isset($_GET['artist']) && !isset($_GET['album']) ) {
  $arr_artists=array();
  foreach($musicdb->artist as $artist) {
    array_push($arr_artists,$artist->name);
  }
  echo json_encode($arr_artists);
  exit;
}

if(isset($_GET['artist']) && !isset($_GET['album']) ) {
  $get_artist=$_GET['artist'];
  $arr_albums=array();
  foreach($musicdb->artist as $artist) {
    if ($artist->name==$get_artist) {
      foreach($artist->album as $album) {
        array_push($arr_albums,$album->title);
      }
      echo json_encode($arr_albums);
    }
  }
  exit;
}

if(isset($_GET['artist']) && isset($_GET['album']) ) {
  $get_artist=$_GET['artist'];
  $get_album=$_GET['album'];
  
  foreach($musicdb->artist as $artist) {
    if ($artist->name==$get_artist) {
      foreach($artist->album as $album) {
        if($album->title==$get_album){
          echo json_encode($album);
        }
      }
    }
  }
}

?>