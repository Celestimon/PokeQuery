$(document).ready(function() {
    $.getJSON('data/abilities.json', function(data) {
        $(".inputAbility").autocomplete({source: data});
    })


    function split( val ) {
        return val.split( /,\s*/ );
    }
    function extractLast( term ) {
        return split( term ).pop();
    }

    $.getJSON('data/moves.json', function(data) {
        $( ".inputMoves" )
            // don't navigate away from the field on tab when selecting an item
            .bind( "keydown", function( event ) {
                if ( event.keyCode === $.ui.keyCode.TAB &&
                    $( this ).autocomplete( "instance" ).menu.active ) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 0,
                source: function( request, response ) {
                    // delegate back to autocomplete, but extract the last term
                    response( $.ui.autocomplete.filter(
                       data, extractLast( request.term ) ) );
                },
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                select: function( event, ui ) {
                    var terms = split( this.value );
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );
                    // add placeholder to get the comma-and-space at the end
                    terms.push( "" );
                    this.value = terms.join( ", " );
                    return false;
                }
            });
    });

    var types = [
        "Fire",
        "Water",
        "Grass",
        "Normal",
        "Electric",
        "Rock",
        "Ground",
        "Flying",
        "Bug",
        "Psychic",
        "Fighting",
        "Dark",
        "Fairy",
        "Ghost",
        "Steel",
        "Dragon",
        "Poison",
        "Ice"
    ];

    $(".inputType").autocomplete({source: types});
    $(".inputResists").autocomplete({source: types});
    $(".radioType").click(function(){
        $(".inputType").prop("disabled", "");
        $(".inputResists").prop("disabled", "disabled");
    });
    $(".radioResists").click(function() {
        $(".inputResists").prop("disabled", "");
        $(".inputType").prop("disabled", "disabled");
    });


});