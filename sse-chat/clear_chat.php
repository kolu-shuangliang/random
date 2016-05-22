<?php
try{
    //make a connection to MySQL database
    $connection = new PDO( 'mysql:host=localhost;dbname=ssechat;charset=utf8', 'ssechat', 'ssechat' );
    $connection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    $connection->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
    
    $query = $connection->prepare( 'TRUNCATE TABLE chat' );
    $query->execute();
    
    $query = $connection->prepare( 'UPDATE size SET count = 0 WHERE id = 1' );
    $query->execute();
    
    echo "Chat cleared!";
}
catch( PDOException $error ){
    echo $error->getMessage();
}
?>