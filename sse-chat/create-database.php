<?php
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// Create tables for ssechat
// chat table stores messages
// size table stores size of message log.

try{
    //make a connection to MySQL database
    $connection = new PDO( 'mysql:host=localhost;dbname=ssechat;charset=utf8', 'ssechat', 'ssechat' );
    $connection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    $connection->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
    
    $query = "
		CREATE TABLE IF NOT EXISTS chat(
			id INT( 10 ) AUTO_INCREMENT PRIMARY KEY,
			user VARCHAR( 50 ),
			message VARCHAR( 255 ),
			date DATE);";
	$connection->exec( $query );
	
	echo "chat Table created!\n";
    
    $query = "CREATE TABLE IF NOT EXISTS size( count INT( 10 ) );";
	$connection->exec( $query );
	
	echo "size Table created!\n";
    
}
catch( PDOException $error ){
    echo $error->getMessage();
}

?>