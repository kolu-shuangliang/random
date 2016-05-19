console.log( 'Server-Sent Events' );

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// GLOBAL VARIABLES
var current = 0;

if( sessionStorage.username ){
    console.log( 'logged in - username: ' + sessionStorage.username );
    
    chatinput();
}
else{
    document.getElementById( 'login-form' ).addEventListener( 'submit', function( event ){
        event.preventDefault();
        
        // Checks if 'username' input is empty.
        if( this.username.value ){
            console.log( 'logged in - username: ' + this.username.value );
            // Sets JavaScript session storage.
            sessionStorage.username = this.username.value;
            
            chatinput();
        }
        else{
            alert( 'Insert username!' );
        }
    } );
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// FUNCTIONS

// Replace login-form with chat-form
function chatinput(){
    var element = document.getElementById( 'chat-input' );
    element.innerHTML = '';
    
    var form = document.createElement( 'FORM' );
    form.id = 'chat-form';
    element.appendChild( form );
    
    var input = document.createElement( 'INPUT' );
    form.appendChild( input );
    input.name = 'message';
    input.type = 'TEXT';
    input.placeholder = 'Logged in as: ' + sessionStorage.username + ' - Enter message.';
    input.autocomplete = 'off';
    
    var button = document.createElement( 'BUTTON' );
    form.appendChild( button );
    button.type = 'SUBMIT';
    button.textContent = 'Send';
    
    form.addEventListener( 'submit', function( event ){
        
        
        
    } );
    
    input.focus();
}