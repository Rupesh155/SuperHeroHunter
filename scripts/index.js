
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
