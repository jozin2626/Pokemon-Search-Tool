var pokeName = document.getElementById('name');
var image = document.getElementById('image');
var pokeType = document.getElementById('type');
var moves = document.getElementById('abilities');
var height = document.getElementById('height');
var weight = document.getElementById('weight');

function getInfo() {
    reset();
    let name = document.getElementById('search').value;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            recordStr = this.responseText;
            localStorage.setItem('pokemon', recordStr);
            let record = JSON.parse(recordStr);
            updateInfo(record);
        }

        if (xhttp.status == 404) {
            window.alert('Invalid search');
            return;
        }
    }
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + name, true);
    xhttp.send();
};

function updateInfo(record) {
    pokeName.innerHTML += record.name;
    image.src = record.sprites.front_default;
    for (var i = 0; i < record.types.length; i++) {
        pokeType.innerHTML += record.types[i].type.name + '<br>';
    }
    for (var i = 0; i < record.abilities.length; i++) {
        moves.innerHTML += record.abilities[i].ability.name + '<br>';
    }
    height.innerHTML += (record.height / 10.0) + ' meters';
    weight.innerHTML += (record.weight / 10.0) + ' kilograms';
}

function reset() {
    pokeName.innerHTML = '';
    image.src = '';
    pokeType.innerHTML = '';
    moves.innerHTML = '';
    weight.innerHTML = '';
    height.innerHTML = '';
}

if (localStorage.getItem('pokemon')) {
    let pokemon = JSON.parse(localStorage.getItem('pokemon'));
    updateInfo(pokemon);
}