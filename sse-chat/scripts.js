console.log( 'Server-Sent Events' );

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// GLOBAL VARIABLES
var latest = 0;
var url = 'ssechat.php';
var messageLog = document.getElementById( 'message-log' );

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// LOGIN SESSION CHECK
if( sessionStorage.username ){
    console.log( 'logged in - username: ' + sessionStorage.username );
    
    loggedIn();
}
else{
    document.getElementById( 'login-form' ).addEventListener( 'submit', function( event ){
        event.preventDefault();
        
        // Checks if 'username' input is empty.
        if( this.username.value ){
            console.log( 'logged in - username: ' + this.username.value );
            // Sets JavaScript session storage.
            sessionStorage.username = this.username.value;
            
            loggedIn();
        }
        else{
            alert( 'Insert username!' );
        }
    } );
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// FUNCTIONS

// Server-Sent event function
// Starts connection and handle all events
function startSSEvent( ){
    var eventSource = new EventSource( url + '?latest=' + latest );
    
    // Add handler to message event
    eventSource.addEventListener( 'message', function( event ){
        var data = JSON.parse( event.data );
        
        for( var x = data.start; x <= data.end; x++ ){
            var container = document.createElement( 'div' );
            messageLog.appendChild( container );
            container.className = 'message-container';
            
            var date = document.createElement( 'SPAN' );
            container.appendChild( date );
            date.className = 'date';
            // Convert to milliseconds
            var timestamp = new Date( Number( data[ x ].date ) * 1000 );
            
            date.textContent = timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds();
            
            var username = document.createElement( 'SPAN' );
            container.appendChild( username );
            username.className = 'username';
            username.textContent = '[ ' + data[ x ].username + ' ] ';
            
            var message = document.createElement( 'SPAN' );
            container.appendChild( message );
            message.className = 'message';
            message.textContent = data[ x ].message;
        }
        
        latest = data.end;
        
    }, false );
    
    // logs to console on open
    eventSource.onopen = function(){
        console.log( 'connection open to ' + url );
    }
    // Reconnect on error
    eventSource.onerror = function(){
        console.log( 'connection error' );
        eventSource.close();
        startSSEvent();
    }
}

// Replace login-form with chat-form
function loggedIn(){
    startSSEvent();
    
    var element = document.getElementById( 'chat-input' );
    element.innerHTML = '';
    
    var form = document.createElement( 'FORM' );
    form.id = 'chat-form';
    element.appendChild( form );
    
    var input = document.createElement( 'INPUT' );
    form.appendChild( input );
    input.name = 'message';
    input.maxLength = 250;
    input.type = 'TEXT';
    input.placeholder = 'Enter message. - Logged in as: ' + sessionStorage.username;
    input.autocomplete = 'off';
    
    var button = document.createElement( 'BUTTON' );
    form.appendChild( button );
    button.type = 'SUBMIT';
    button.textContent = 'Send';
    
    form.addEventListener( 'submit', function( event ){
        event.preventDefault();
        
        var data = {
            'username': sessionStorage.username,
            'message': this.message.value.substr( 0, 250 )
        }
        
        sendMessage( data, './post_message.php' );
        
        this.reset();
        
        input.focus();
    } );
    
    input.focus();
}

// XMLHttpRequest using guide from developer.mozilla.org
function sendMessage( data, formUrl ){
    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;
    
    // Insert all data into urlEncodedDataPairs as 'name=data' string
    for( name in data ){
        urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[ name ] ) );
    }
    
    // Parse all data from array into single string
    // application/x-www-form-urlencoded - replace %20 with +
    urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );
    
    // load and error handler
    XHR.addEventListener( 'load', function( event ){
        // Success - Maybe return returned data from request
        console.log( event.target.responseText );
    } );
    XHR.addEventListener( 'error', function( event ){
        // Error - Maybe return returned data from request
    } );
    
    // Setup request
    XHR.open( 'POST', formUrl );
    XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    // Send
    XHR.send( urlEncodedData );
}