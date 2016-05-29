var PersonalNavbar = function(){
    // Toggle display to none/inline when users press collapser links inside navbar
    var collapser = document.getElementsByClassName( 'collapser' );
    var nested = document.getElementsByClassName( 'navbar-nested' );
    var selected = null;
    for( var x = 0; x < collapser.length; x++ ){
        collapser[ x ].addEventListener( 'click', function( event ){
            event.preventDefault();
            event.stopPropagation();
            var el = this.parentElement.getElementsByClassName( 'navbar-nested' )[ 0 ];
            if( el.style.display === 'inline' ){
                el.style.display = 'none';
            }
            else{
                // Hide all other displayed navbar elements.
                // There should be only 0 or 1 displayed navbar-nested,
                // so breaks away after hiding first one.
                for( var x = 0; x < collapser.length; x++ ){
                    if( nested[ x ].style.display === 'inline' ){
                        nested[ x ].style.display = 'none';
                        break;
                    }
                }
                el.style.display = 'inline';
            }
            // Removes selected class from previous element and adds it to this.
            if ( selected != null ){
                selected.className = selected.className.replace( /\bselected\b/, '' );
            }
            this.className += ' selected';
            selected = this;
        }, false );
    }
    // Close displayed navbar-nested if user clicks on any elements
    // other than navbar-nested collapser
    document.addEventListener( 'click', function( event ){
        for( var x = 0; x < collapser.length; x++ ){
            if( nested[ x ].style.display === 'inline' ){
                nested[ x ].style.display = 'none';
                break;
            }
        }
    }, false );
    
}
PersonalNavbar();
