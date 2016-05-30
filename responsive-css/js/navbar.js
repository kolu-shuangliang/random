var PersonalNavbar = function(){
    // Toggle display to none/inline when users press collapser links inside navbar
    var collapser = document.getElementsByClassName( 'collapser' );
    var nested = document.getElementsByClassName( 'navbar-nested' );
    var ulList = document.getElementsByClassName( 'nav-links' );
    var collapsed = false;
    var mobile_view = false;
    // Check if styles are already in mobile view
    if( document.documentElement.clientWidth < 768 ){
        mobile_view = true;
    }
    // Adds events listener that collapsed nested links to dropdown links in navbar.
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
        }, false );
    }
    
    // Click event for "hamburger" that's only visible on lower widths.
    // Display navbar links depending on if it's currently collapsed or not.
    document.getElementById( 'navbar-collapser' ).addEventListener( 'click', function( event ){
        event.preventDefault();
        event.stopPropagation();
        for( var x = 0; x < ulList.length; x++ ){
            if( collapsed ){
                ulList[ x ].style.display = 'none';
                collapsed =  false;
            }
            else{
                ulList[ x ].style.display = 'inline';
                collapsed = true;
            }
        }
    }, false);
    // Changes display.style for navbar links on entering and existing mobile views.
    // Use eventlistener for window resize
    // Css don't seems to override JavaScript changes. So this seems to be easiest way.
    // Use mobile_view so actions are only performed once after entering/existing.
    window.addEventListener( 'resize', function( event ){
        if( document.documentElement.clientWidth > 768 && mobile_view === true ){
            for( var x = 0; x < ulList.length; x++ ){
                ulList[ x ].style.display = 'inline';
            }
            mobile_view = false;
        }
        else if( document.documentElement.clientWidth < 768 && mobile_view === false ){
            for( var x = 0; x < ulList.length; x++ ){
                ulList[ x ].style.display = 'none';
                collapsed = false;
            }
            mobile_view = true;
        }
    } );
    
    // Close displayed navbar-nested if user clicks on any elements
    // other than navbar-nested collapser
    document.addEventListener( 'click', function( event ){
        for( var x = 0; x < collapser.length; x++ ){
            if( nested[ x ].style.display === 'inline' ){
                nested[ x ].style.display = 'none';
                break;
            }
        }
        if( collapsed ){
            eventFire( document.getElementById( 'navbar-collapser' ), 'click' );
        }
    }, false );
    
    function eventFire( element, eventType ){
        if ( element.fireEvent ) {
            element.fireEvent( 'on' + eventType );
        }
        else {
            var eventObject = document.createEvent( 'Events' );
            eventObject.initEvent( eventType, true, false );
            element.dispatchEvent( eventObject );
        }
    }
}
PersonalNavbar();

// Removes selected class from previous element and adds it to this.
/*
if ( selected != null ){
    selected.className = selected.className.replace( /\bselected\b/, '' );
}
this.className += ' selected';
selected = this;
*/