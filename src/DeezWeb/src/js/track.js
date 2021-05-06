'use strict';
const searchParams = location.search;
const urlSearchParams = new URLSearchParams(searchParams);
const trackId = urlSearchParams.get('id');
const track = document.querySelector('#track');
const trackCnt = document.querySelector('#track-ctn');

window.fetch(`https://api.deezer.com/track/${trackId}`) //on récupère les infos de l'API grâce à search-bar & dw-select
    .then(response => response.json())
    .then(result => {
        const trackCover = result.artist.picture_xl;
        track.style.cssText = `background-image: linear-gradient(to bottom, #151515, transparent), url('${trackCover}');`;

        const trackInfos = document.createElement('div'); //on crée une nouvelle div pour le contenu
        const durationToHms = secondsToHms(result.duration); //variable durée en minutes et secondes
        const trackRelease = dateFormatter(result.release_date); //date en jj/mm/aaaa

        //on ajoute le HTML et les variables
        trackCnt.appendChild(trackInfos);
        trackInfos.innerHTML = `
            <img src="${result.album.cover_big}" alt="Couverture d'album">

            <figure>
                <audio controls src="${result.preview}">
                Your browser does not support the <code>audio</code> element.
                </audio>
            </figure>

            <h2>${result.title}</h2>
            <div id="trackLike">
                <a href="artist.html?id=${result.artist.id}">${result.artist.name}</a> • <span>${durationToHms}</span>
            </div>
            <p>sortie le ${trackRelease}</p>

            <a href="${result.link}" id="search-button" target="_blank">Voir sur Deezer</a>
        `;

        //on s'occupe du bouton favori
        const $favoriteTrack = document.createElement('button');
        tracksInFavs($favoriteTrack);

    });

//FONCTION : on vérifie si certaines musiques sont en fav ou non
function tracksInFavs($favoriteTrack) {
    let trackList = localStorage.getItem('tracksIds');
    trackList = trackList ? JSON.parse(trackList) : [];

    if (trackList.includes(trackId)) {
        $favoriteTrack.style.cssText = "font-weight: 900; color: #e3502b"; //on remplit les cœurs au clic
    }
    else {
        $favoriteTrack.style.cssText = "font-weight: 400"; //on remplit les cœurs au clic
    }

    //on fait un event au clic pour mettre des musiques en fav
    $favoriteTrack.addEventListener("click", () => {
        heartOnClick(trackId, $favoriteTrack);
    });

    let trackLike = document.querySelector('#trackLike');
    trackLike.appendChild($favoriteTrack);
}

//FONCTION FORMAT DATE
function dateFormatter(myDate) {
    let chunks = myDate.split('-');
    let formattedDate = chunks[2] + '/' + chunks[1] + '/' + chunks[0];
    return formattedDate;
}