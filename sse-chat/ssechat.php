<?php
// Limits scripts runtime to 10min
set_time_limit( 10 * 60 );
// Sets header info
header( 'Content-Type: text/event-stream' );
header( 'Cache-Control: no-cache' );

// SQL connection
$connection = new PDO( 'mysql:host=localhost;dbname=ssechat;charset=utf8', 'ssechat', 'ssechat' );
$connection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
$connection->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );

// Get latest value from client
    // This is latest message client have
$latest = intval( $_GET[ 'latest' ] );

while( 1 ){
    try{
        // Checks latest message id in SQL server and sets it as end variable
        $query = $connection->prepare( 'SELECT count FROM size WHERE id=1' );
		$query->execute();
		$end = $query->fetchAll( PDO::FETCH_ASSOC );
        $end = $end[ 0 ][ 'count' ];
        // Checks if SQL end is higher than clients latest. It means more messages to send
		if( $latest < $end ){
            // id starts from 1 and latest starts from 0
			$latest += 1;
			
			$query = $connection->prepare( 'SELECT * FROM chat WHERE id >= ? ORDER BY id ASC' );
			$query->execute( array( $latest ) );
			$messages = $query->fetchAll( PDO::FETCH_ASSOC );
			
            // Manually parse json data for now.
                // start is latest from client
                // end is latest from sql
			echo "event: message\n";
			echo "data: {";
				echo '"start": "'. $latest .'",';
				for($x = 0; $x < count($messages); $x++ ){
					echo '"'.$latest++.'": {';
						echo '"username": "'. $messages[ $x ][ 'user' ] .'",';
						echo '"message": "'. $messages[ $x ][ 'message' ] .'",';
						echo '"date": "'. $messages[ $x ][ 'date' ] .'"';
					echo '},';
				}
				echo '"end": "'. $end .'"';
			echo "}\n\n";
			
            // Sets latest
			$latest = $end;
		}
    }
    catch(PDOException $error){
		echo $error->getMessage();
	}
    
    // flush caches and waits 1 sec
	if(ob_get_level() > 0){
		ob_end_flush();
	}
	flush();
	sleep( 1 );
}

?>