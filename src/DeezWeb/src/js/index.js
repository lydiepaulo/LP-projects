'use strict';
let searchBar = document.querySelector('#search-bar'); //pour la recherche, on récupère la valeur de l'input search-bar
let searchMode = document.querySelector('#dw-select'); //pour la recherche, on récupère le mode de tri sélectionné par l'user dans dw-select
let cardsList = document.querySelector("#cards-list"); //post recherche, on crée nos éléments dans cards-list
let resH2 = document.querySelector("#searchBlock h2:last-child"); //on remplit le h2 selon les résultats
let searchError = document.querySelector('#search-error'); //gestion des erreurs de recherche

//lancement de la recherche !
document.querySelector("#search-button")
    .addEventListener("click", () => {
        if (searchBar.value) {
            window.fetch(`https://api.deezer.com/search?q=${searchBar.value}&order=${searchMode.value}`) //on récupère les infos de l'API grâce à search-bar & dw-select
                .then(response => response.json())
                .then(result => {
                    const resultData = result.data;
                    const resDataLength = resultData.length; //variable du nombre de résultats à add au h2

                    //si recherche sans résultat ou mauvaise recherche
                    noResult(resDataLength);

                    cardsList.innerHTML = ''; //le bloc se vide avant chaque recherche
                    searchError.innerHTML = ''; //h2 error se vide avant la recherche

                    for (let i = 0; i < resDataLength; i++) {
                        cardCreation(resultData[i]);
                    }
                })
            /* .catch(err => {
            window.alert("La recherche n'a pas abouti !"); //gestion des erreurs
            }); */
        }
        else {
            searchError.innerHTML = `<h2>Aucun résultat</h2>`; //gestion de l'erreur "recherche vide"
            cardsList.innerHTML = '';
            resH2.innerHTML = '';
        }
    });

//FONCTION : si recherche sans résultat ou mauvaise recherche
function noResult(resDataLength) {
    if (resDataLength == 0) {
        resH2.innerHTML = `Aucun résultat`;
    }
    else {
        //afficher nombre de résultats
        if (resDataLength < 2) {
            resH2.innerHTML = `${resDataLength} Résultat`;
        }
        else {
            resH2.innerHTML = `${resDataLength} Résultats`;
        }
    }
}

function cardCreation(track) {
    let newCard = document.createElement("div");
    let newCardLinks = document.createElement("div");
    let newFigure = document.createElement("figure");
    let newFigureCover = document.createElement("img");
    newFigureCover.setAttribute("src", track.album.cover_big);
    newFigureCover.setAttribute("alt", "Couverture d'album");
    let newFigCaption = document.createElement("figcaption");

    cardsList.appendChild(newCard); //on crée la nouvelle card dans #cards-list
    newCard.appendChild(newCardLinks); //on crée div parent des liens dans la card
    newCard.appendChild(newFigure); //on crée figure dans la card
    newFigure.appendChild(newFigureCover); //on ajoute l'image de l'album dans figure
    newFigure.appendChild(newFigCaption); //on ajoute figcaption dans figure

    let trackId = track.id;

    //bouton qui renvoie à la page de la track
    newCardLinks.innerHTML += `
                        <a href="pages/track.html?id=${trackId}"></a>
                    `;

    //bouton favori
    const $favoriteTrack = document.createElement('button');

    //on gère les chansons déjà likées (rouges puis vides)
    favTracks(trackId, $favoriteTrack);

    //event au clic : like/dislike (vides puis rouges)
    $favoriteTrack.addEventListener("click", () => {
        heartOnClick(trackId, $favoriteTrack);
    });

    newFigure.appendChild($favoriteTrack);

    let durationToHms = secondsToHms(track.duration); //on passe duration en heures/minutes/secondes

    newFigCaption.innerHTML += `
                        <h3>${track.title_short}</h3>
                        <span><a href="pages/artist.html?id=${track.artist.id}">${track.artist.name}</a> / <a href="pages/album.html?id=${track.album.id}">${track.album.title}</a></span>
                        <span>${durationToHms}</span>
                    `;
}

//FONCTION : on gère les chansons déjà likées 
function favTracks(trackId, $favoriteTrack) {
    let trackList = localStorage.getItem('tracksIds');
    trackList = trackList ? JSON.parse(trackList) : [];

    if (trackList.includes(trackId)) {
        $favoriteTrack.style.cssText = "font-weight: 900; color: #e3502b"; //on remplit les cœurs au clic
    }
    else {
        $favoriteTrack.style.cssText = "font-weight: 400";
    }
}
