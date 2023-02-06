<?php

header("Access-Control-Allow-Origin: *");

$db = new SQLite3('./db/module.db');

$query = $db->query('SELECT *
    FROM categories WHERE parent_id IS NULL');

$categories = array();

while ($row = $query->fetchArray()) {
    $has_files = false;
    $direct_link = false;
    $files_result = $db->query('SELECT COUNT(*) as count FROM files WHERE category_id='.$row['id'].'');
    $files_row = $files_result->fetchArray();
    $numRows = $files_row['count'];
    if($numRows !== 0) {
        $has_files = true;
        if($numRows == 1){
            $direct_link = true;
        }
    }
    else{
        $has_files = false; 
    }
    $categories[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'description' =>$row['description'],
        'has_files'=> $has_files,
        'show_image' => $row['show_image'],
        'direct_link' => $direct_link,
        'path' => "content".$row['path']
    ];
}
 
print(json_encode($categories));



