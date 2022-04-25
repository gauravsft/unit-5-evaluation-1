var container = document.querySelector('#container');
var searchtext = document.querySelector('#searchtext');
var display = document.querySelector('#display')

if (localStorage.getItem('pokemon') == null) {
    getdata()
    setTimeout(displayname, 1000)
} else {
    console.log('data stored alreaaady')
    displayname()
}


async function getdata() {
    var res = await fetch('https://pokeapi.co/api/v2/pokemon')
    // console.log(res)
    var data = await res.json()
    // console.log(data.results)
    //getinfo(data.results)
    var arr = []
    data.results.forEach(element => {
        arr.push(element.name)
    });
    // console.log(arr)
    localStorage.setItem('pokemon', JSON.stringify(arr))
}

function displayname() {
    var data = JSON.parse(localStorage.getItem('pokemon'))
    data.forEach(element => {
        var tr = document.createElement('tr')
        tr.innerHTML =
            `
            <td>${element}</td>
        `
        container.append(tr)
    });
}

//
function search() {
    console.log(searchtext.value)
    display.innerHTML = ''
    async function getinfo() {
        var res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchtext.value}`)
        // console.log(res)
        var data = await res.json()

        var abi = []
        var move = []
        var id = data.id
        var height = data.height
        var weight = data.weight

        data.abilities.forEach(element => {
            abi.push(element.ability.name)
        });
        data.moves.forEach(element => {
            move.push(element.move.name)
        });
       

        var div = document.createElement('div')
        var info = 
        `
            <h1>ID : ${id}</h1>
            <h1>Pokemon Name : ${searchtext.value}</h1>
            <h2>Pokemon Height : ${height}</h2>
            <h3>Pokemon Weight : ${weight}</h3>
            <h3>Pokemon Abilities : </h3>
            <p>${abi.join(',')}</p>
            <h3>Pokemon Moves : </h3>
            <p>${move.join(',')}</p>
        `
        div.innerHTML = info
        display.append(div)
    }
    getinfo()
}