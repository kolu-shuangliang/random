console.log( 'Server-Sent Events' );

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// GLOBAL VARIABLES
var current = 0;


document.getElementById( 'login-form' ).addEventListener( 'submit', function( event ){
    
    event.preventDefault();
    console.log( 'login' );
    
} );

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// FUNCTIONS