<?php

date_default_timezone_set( 'UTC' ); 

try{
    //make a connection to MySQL database
    $connection = new PDO( 'mysql:host=localhost;dbname=ssechat;charset=utf8', 'ssechat', 'ssechat' );
    $connection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    $connection->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
    
    $query = $connection->prepare( 'INSERT INTO chat ( user, message, date ) VALUES ( ?, ?, ? )' );
    $query->execute( array( $_POST[ 'username' ], $_POST[ 'message' ], time() ) );
    
    $query = $connection->prepare( 'UPDATE size SET count = count + 1 WHERE id = 1' );
    $query->execute();
}
catch( PDOException $error ){
    echo $error->getMessage();
}
?>