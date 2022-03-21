// Getting elements using id's
const name = document.getElementById('superhero-name');
const image = document.getElementById('superhero-img');
const fav = document.getElementById('favourite');
const snackbar = document.getElementById('snackbar');

// Getting Superhero id for details
const params = new URLSearchParams(window.location.search);
var id = params.get('id');

//Getting Favourites List from LocalStorage
var favList = JSON.parse(localStorage.getItem("favList")) === null
    ? []
    : JSON.parse(localStorage.getItem("favList"));


//Fetching Superhero details from Superhero API
fetch(`https://superheroapi.com/api.php/1953802511419258/${id}`)
    .then(res => res.json())
    .then(data => showDetails(data))
    .catch(err => console.log(err));


//Render Superhero details
function showDetails(data) {

    //Setting name
    name.innerHTML = data.name;

    //Setting display image
    image.src = data.image.url;
    image.alt = "Image not found";

    //Setting favourite
    favList.includes(id)
        ?
        fav.innerHTML = '<i id="fav-icon" class="fas fa-heart fa-4x"></i>'
        :
        fav.innerHTML = '<i id="fav-icon" class="far fa-heart fa-4x"></i>'

    //Setting Power Meters
    for (var i in data.powerstats) {
        document.getElementById(i).innerHTML = data.powerstats[i] + "%";
        //Power Meter Style Setting
        document.getElementById(i).style.width = data.powerstats[i] + "%"
    }

    //Setting Appearance props.
    for (var i in data.appearance) {
        document.getElementById(i).innerHTML = data.appearance[i];
    }

    //Setting Bio
    for (var i in data.biography) {
        document.getElementById(i).innerHTML = data.biography[i];
    }

    //Setting Work props.
    for (var i in data.work) {
        document.getElementById(i).innerHTML = data.work[i];
    }

    //Setting Connection props.
    for (var i in data.connections) {
        document.getElementById(i).innerHTML = data.connections[i];
    }
}

//Handling Add to Favourites (On Click)
fav.onclick = function () {
    //If Superhero not in Favourites, Add to FavList
    if (!favList.includes(id)) {
        favList.push(id);
        //Changing Fav-icon class
        fav.innerHTML = '<i id="fav-icon" class="fas fa-heart fa-4x"></i>';
        showSnackbar(true);

    }

    //Else remove from Favourites
    else {
        var i = favList.indexOf(id);
        favList.splice(i, 1);
        //Changing Fav-icon class
        fav.innerHTML = '<i id="fav-icon" class="far fa-heart"></i>';
        showSnackbar(false);
    }

    //Saving Favourites to localStorage
    localStorage.setItem("favList", JSON.stringify(favList));
}

//Show Snackbar on Favourites' Change
function showSnackbar(value) {

    //Adding Visibility to Snackbar
    snackbar.classList.add('visible');

    if (value) {
        snackbar.innerHTML = "Added to Favourites";
    }
    else {
        snackbar.innerHTML = "Removed from Favourites";
    }
    // Snackbar Timeout
    setTimeout(function () { snackbar.classList.remove("visible"); }, 3000);
}