var virtualTypes = document.getElementsByClassName('virtualType');
var dataTypes = document.getElementsByClassName('dataType');

for (let e of virtualTypes) {
    let color = 'orange';
    let type = e.innerText.toLowerCase();

    switch(type) {
        case "steam_id":
            color = '#f6496f';
            e.setAttribute('data-tippy-content', 'A steam_id is a 17 digit number unique to a certain player. It is used to uniquely identify players within C².');
            break;
        case "peer_id":
            color = '#01b771';
            e.setAttribute('data-tippy-content', 'The peer_id of a user is a unique number given to players by Stormworks. These ids can be seen by using the tilde (~) key in-game.');
            break;
        case "playerid":
            color = '#757af4';
            e.setAttribute('data-tippy-content', 'A playerID is either the player\'s peer_id or name. You can see a player\'s peer_id using the tilde (~) key in game');
            break;
        case "vehicleid":
            color = '#d1ce3e';
            e.setAttribute('data-tippy-content', 'A vehicleID is a unique number given to each vehicle on spawn by Stormworks. There is no way to view these in vanilla Stormworks.');
            break;
        case "item_id":
            color = '#0099dd';
            e.setAttribute('data-tippy-content', 'An item_id is a unique number given to each piece of equipment from Stormworks.');
            break;
        case "location":
            color = '#c25706';
            e.setAttribute('data-tippy-content', 'A named location that C² has added to the game.');
            break;
        default:
            color = 'magenta';
    }

    e.style.color = color;
}

for (let e of dataTypes) {
    let color = '';
    let type = e.innerText.toLowerCase();

    switch(type) {
        case "bool":
            color = '#f92672';
            e.setAttribute('data-tippy-content', 'A boolean value like "true" or "false".');
            break;
        case "number":
            color = '#ae81ff';
            e.setAttribute('data-tippy-content', 'A integer or float value like "24" or "3.14".');
            break;
        case "string":
            color = '#e6db74';
            e.setAttribute('data-tippy-content', 'Some text like "hello" or "a".');
            break;
    }

    e.style.color = color;
}

// tooltips for data types

tippy('[data-tippy-content]');