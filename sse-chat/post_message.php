<?php

date_default_timezone_set( 'UTC' ); 

try{
    //make a connection to MySQL database
    $connection = new PDO( 'mysql:host=localhost;dbname=ssechat;charset=utf8', 'ssechat', 'ssechat' );
    $connection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    $connection->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
    
    $username = $_POST[ 'username' ];
    if( $username > 25 ){
        $username = substr( $username, 0, 25 );
    }
    
    $message = $_POST[ 'message' ];
    if( $message > 255 ){
        $message = substr( $message, 0, 255 );
    }
    
    $query = $connection->prepare( 'INSERT INTO chat ( user, message, date ) VALUES ( ?, ?, ? )' );
    $query->execute( array( $username, $message, time() ) );
    
    $query = $connection->prepare( 'UPDATE size SET count = count + 1 WHERE id = 1' );
    $query->execute();
}
catch( PDOException $error ){
    echo $error->getMessage();
}
?>