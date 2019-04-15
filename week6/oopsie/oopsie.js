// Todo:

// create a proper Player construction with
// state:
//   fallbackIndex = 0 // place to fall back on oopsie
//   progressIndex = 0 // place having been proceeding to
// and functions:
//   proceed(stride) // proceed so many places
//   fallback()      // "oopsie": go back to last start (fallback position)
//   turn()          // cash in your win, update fallback position for next turn
//

function Player (name, color) {
    let fallbackIndex = 0;
    let progressIndex = 0;

    const proceed = stride => {
        progressIndex += stride;
    };

    const fallback = () => {
        progressIndex = fallbackIndex;
    };

    const turn = () => {
        fallbackIndex = progressIndex;
    };

    const getFallbackIndex = () => fallbackIndex;
    const getProgressIndex = () => progressIndex;
    const getName = () => name;
    const getColor = () => color;

    return {
        proceed, fallback, turn, getFallbackIndex, getProgressIndex, getName, getColor
    }
}


function start() {
    const fields = document.getElementById('fields');

    for (let i = 0; i < 100; i++) {
        let field = document.createElement("DIV");
        field.setAttribute("ID", "FIELD-"+i);
        field.innerText = " ";
        fields.appendChild(field);
    }
    display();
}

function dice() {
    let stride = Math.round(1 + Math.random() * 5);
    document.getElementById('dice').innerText = ""+ stride;
    if (stride === 3) {
        players[currentPlayer].fallback();
    } else {
        players[currentPlayer].proceed(stride);
    }
    display();
}

function turn() {
    players[currentPlayer].turn();
    if (currentPlayer + 1 === players.length) {
        currentPlayer = 0;
    } else {
        currentPlayer++;
    }

    display();
}

function display() {
    for (let i = 0; i < 100; i++) {
        let field = document.getElementById("FIELD-"+i);
        field.setAttribute("CLASS", "field");
    }

    players.forEach(player => {
        let fallbackfield = document.getElementById("FIELD-"+ player.getFallbackIndex());
        fallbackfield.setAttribute("CLASS", "field fallback " + player.getColor());
        let progressfield = document.getElementById("FIELD-"+ player.getProgressIndex());
        progressfield.setAttribute("CLASS", "field progress " + player.getColor());
    });

    document.getElementById('currentPlayer').innerText = players[currentPlayer].getName()
}

const players = [
    Player("One", "blue"),
    Player("Two", "red"),
    Player("Three", "green"),
    Player("Four", "yellow"),
];

let currentPlayer = 0;
