"use strict";
var virtualTypes = document.getElementsByClassName('virtualType');
var dataTypes = document.getElementsByClassName('dataType');

for (let e of dataTypes) {
    let color = 'orange';
    let type = e.innerText.toLowerCase();

    switch(type) {
        case "steamid":
            e.setAttribute('data-tippy-content', 'A steam_id is a 17 digit number unique to a certain player. It is used to uniquely identify players within C².');
            break;
        case "peerid":
            e.setAttribute('data-tippy-content', 'The peerID of a user is a unique number given to players by Stormworks. These ids can be seen by using the tilde (~) key in-game.');
            break;
        case "playerid":
            e.setAttribute('data-tippy-content', 'A playerID is either the player\'s peerID or name. You can see a player\'s peer_id using the tilde (~) key in game');
            break;
        case "vehicleid":
            e.setAttribute('data-tippy-content', 'A vehicleID is a unique number given to each vehicle on spawn by Stormworks. There is no way to view these in vanilla Stormworks.');
            break;
        case "itemid":
            e.setAttribute('data-tippy-content', 'An itemID is a unique number given to each piece of equipment from Stormworks.');
            break;
        case "location":
            e.setAttribute('data-tippy-content', 'A named location that C² has added to the game.');
            break;
        case "letter":
            e.setAttribute('data-tippy-content', 'A capital letter like "A" or "B".');
            break;
        case "bool":
            e.setAttribute('data-tippy-content', 'A boolean value like "true" or "false".');
            break;
        case "number":
            e.setAttribute('data-tippy-content', 'A integer or float value like "24" or "3.14".');
            break;
        case "string":
            e.setAttribute('data-tippy-content', 'Some text like "hello" or "a".');
            break;
        default:
            console.warn(`Unrecognized type "${type}"\n${e}`);
    }

    e.setAttribute('data-type', type)
}

// tooltips for data types

tippy('[data-tippy-content]');