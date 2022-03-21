// Not for use. Just to understand the JSON structure.
var superDB = [
    {
        "id": "69",
        "name": "Batman",
        "powerstats": {
            "intelligence": "81",
            "strength": "40",
            "speed": "29",
            "durability": "55",
            "power": "63",
            "combat": "90"
        },
        "biography": {
            "full-name": "Terry McGinnis",
            "alter-egos": "No alter egos found.",
            "aliases": [
                "Batman II",
                "The Tomorrow Knight",
                "The second Dark Knight",
                "The Dark Knight of Tomorrow",
                "Batman Beyond"
            ],
            "place-of-birth": "Gotham City, 25th Century",
            "first-appearance": "Batman Beyond #1",
            "publisher": "DC Comics",
            "alignment": "good"
        },
        "appearance": {
            "gender": "Male",
            "race": "Human",
            "height": [
                "5'10",
                "178 cm"
            ],
            "weight": [
                "170 lb",
                "77 kg"
            ],
            "eye-color": "Blue",
            "hair-color": "Black"
        },
        "work": {
            "occupation": "-",
            "base": "21st Century Gotham City"
        },
        "connections": {
            "group-affiliation": "Batman Family, Justice League Unlimited",
            "relatives": "Bruce Wayne (biological father), Warren McGinnis (father, deceased), Mary McGinnis (mother), Matt McGinnis (brother)"
        },
        "image": {
            "url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"
        }
    },
    {
        "id": "70",
        "name": "Batman",
        "powerstats": {
            "intelligence": "100",
            "strength": "26",
            "speed": "27",
            "durability": "50",
            "power": "47",
            "combat": "100"
        },
        "biography": {
            "full-name": "Bruce Wayne",
            "alter-egos": "No alter egos found.",
            "aliases": [
                "Insider",
                "Matches Malone"
            ],
            "place-of-birth": "Crest Hill, Bristol Township; Gotham County",
            "first-appearance": "Detective Comics #27",
            "publisher": "DC Comics",
            "alignment": "good"
        },
        "appearance": {
            "gender": "Male",
            "race": "Human",
            "height": [
                "6'2",
                "188 cm"
            ],
            "weight": [
                "210 lb",
                "95 kg"
            ],
            "eye-color": "blue",
            "hair-color": "black"
        },
        "work": {
            "occupation": "Businessman",
            "base": "Batcave, Stately Wayne Manor, Gotham City; Hall of Justice, Justice League Watchtower"
        },
        "connections": {
            "group-affiliation": "Batman Family, Batman Incorporated, Justice League, Outsiders, Wayne Enterprises, Club of Heroes, formerly White Lantern Corps, Sinestro Corps",
            "relatives": "Damian Wayne (son), Dick Grayson (adopted son), Tim Drake (adopted son), Jason Todd (adopted son), Cassandra Cain (adopted ward)\nMartha Wayne (mother, deceased), Thomas Wayne (father, deceased), Alfred Pennyworth (former guardian), Roderick Kane (grandfather, deceased), Elizabeth Kane (grandmother, deceased), Nathan Kane (uncle, deceased), Simon Hurt (ancestor), Wayne Family"
        },
        "image": {
            "url": "https://www.superherodb.com/pictures2/portraits/10/100/639.jpg"
        }
    },
    {
        "id": "71",
        "name": "Batman II",
        "powerstats": {
            "intelligence": "88",
            "strength": "11",
            "speed": "33",
            "durability": "28",
            "power": "36",
            "combat": "100"
        },
        "biography": {
            "full-name": "Dick Grayson",
            "alter-egos": "Nightwing, Robin",
            "aliases": [
                "Dick Grayson"
            ],
            "place-of-birth": "-",
            "first-appearance": "-",
            "publisher": "Nightwing",
            "alignment": "good"
        },
        "appearance": {
            "gender": "Male",
            "race": "Human",
            "height": [
                "5'10",
                "178 cm"
            ],
            "weight": [
                "175 lb",
                "79 kg"
            ],
            "eye-color": "Blue",
            "hair-color": "Black"
        },
        "work": {
            "occupation": "-",
            "base": "Gotham City; formerly Bludhaven, New York City"
        },
        "connections": {
            "group-affiliation": "Justice League Of America, Batman Family",
            "relatives": "John Grayson (father, deceased), Mary Grayson (mother, deceased), Bruce Wayne / Batman (adoptive father), Damian Wayne / Robin (foster brother), Jason Todd / Red Hood (adoptive brother), Tim Drake / Red Robin (adoptive brother), Cassandra Cain / Batgirl IV (adoptive sister)"
        },
        "image": {
            "url": "https://www.superherodb.com/pictures2/portraits/10/100/1496.jpg"
        }
    }
];

var fav = JSON.parse(localStorage.getItem("favList"));
if (fav == null)
    fav = [];

const inputName = document.getElementById('inputName');
const snackbar = document.getElementById('snackbar');
const results = document.getElementById('results');

// SuperHero Name Input
inputName.onkeyup = function () {
    var name = inputName.value;

    if (name !== '') {
        fetch('https://superheroapi.com/api.php/1953802511419258/search/' + name.trim())
            .then(response => response.json())
            .then(data => {
                createCard(data)
            })
            .catch(err => console.log(err));
    }
}

function createCard(data) {
    if (data.response === 'error') {
        results.innerHTML = '<div style="margin-top:50px; color:white;">No Results Found! Please try a different name!</div>';
    }

    else {

        results.innerHTML = null;

        //Creating cards for all the results
        for (let i = 0; i < data.results.length && i < 10; i++) {

            // Creating card elements
            var card = document.createElement('div');
            var cardImage = document.createElement('img');
            var cardContainer = document.createElement('div');
            var cardText = document.createElement('div');
            var favButton = document.createElement('div');
            var detailsButton = document.createElement('div');

            card.classList.add('result-card');
            cardImage.classList.add('result-card-image');
            cardContainer.classList.add('result-card-container');
            favButton.classList.add('favButton');
            detailsButton.classList.add('detailsButton');

            //Adding Superhero names
            cardText.innerHTML = data.results[i].name;
            cardContainer.appendChild(cardText);

            //Adding display images to cards (from results)
            cardImage.src = data.results[i].image.url;
            card.appendChild(cardImage);

            // Adding Details button to all cards
            detailsButton.innerHTML = 'Know my superpowers 💪';
            cardContainer.appendChild(detailsButton);

            //If search results already in My Favourites List,
            //Show Add button else Remove button
            let cardId = data.results[i].id;
            if (fav.includes(cardId)) {
                favButton.innerHTML = "Remove from My Favourites ❌";
                favButton.classList.add('bg-red');
            } else {
                favButton.innerHTML = "Add to My Favourites 🧡";
                favButton.classList.add('bg-green');
            }
            cardContainer.appendChild(favButton);
            card.appendChild(cardContainer);

            //Linking id with favorite and details buttons to add to favorites
            //or display details respectively
            favButton.setAttribute('superheroId', data.results[i].id);
            detailsButton.setAttribute('superheroId', data.results[i].id);

            favButton.setAttribute('divType', 'fav-btn');
            detailsButton.setAttribute('divType', 'details-btn');

            //Appending all cards to Results-div
            results.appendChild(card);
        }
    }
}

results.onclick = function (event) {
    var id = event.target.getAttribute('superheroId');
    var div = event.target.getAttribute('divType');

    //Handle if Favourites button is clicked
    if (div === 'fav-btn') {
        if (id === null)
            return;
        if (fav.includes(id)) {
            var i = fav.indexOf(id);
            fav.splice(i, 1);
            event.target.innerHTML = "Add to My Favourites 🧡";
            event.target.classList.remove('bg-red');
            event.target.classList.add('bg-green');
            showSnackbar(false);
        } else {
            fav.push(id);
            event.target.innerHTML = "Remove from My Favourites ❌";
            event.target.classList.remove('bg-green');
            event.target.classList.add('bg-red');
            showSnackbar(true);
        }
        localStorage.setItem("favList", JSON.stringify(fav));
    }
    //Else if Show Details button is clicked.
    else if (div === 'details-btn') {
        if (id === null)
            return;
        window.open("details.html?id=" + id, "_self");
    }

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

// js file

window.onload = function() {
    setTimeout(
        function() {
          document.querySelector('.superhero').classList.add("vibrate");
    }, 10000);
    setTimeout(
        function() {
          document.querySelector('.superhero').classList.remove("vibrate");
          document.querySelector('.lines').style.display = "none";
    }, 200000);
}
