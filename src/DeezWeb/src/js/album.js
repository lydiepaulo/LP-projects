'use strict';
const searchParams = location.search;
const urlSearchParams = new URLSearchParams(searchParams);
const albumId = urlSearchParams.get('id');
let albumCnt = document.querySelector('#album-cnt');

window.fetch(`https://api.deezer.com/album/${albumId}`) //on récupère les infos de l'API grâce à search-bar & dw-select
.then(response => response.json())
.then(result => {
    //on crée le html
    albumCnt.innerHTML = `
        <div>
            <img src="${result.cover_xl}" alt="Album cover">
        </div>
        <div>
            <span>Album</span>
            <h2>${result.title}</h2>
            <span>Artist •</span> <a id="album-artist" href="artist.html?id=${result.artist.id}">${result.artist.name}</a>
            <a href="https://www.deezer.com/fr/artist/${result.artist.id}" id="search-button" target="_blank">Voir sur Deezer</a>
        </div>
    `;

    //boucle pour récupérer chaque track de l'album
    for (let i = 0, trackList = result.tracks.data; i < result.nb_tracks ; i++) {
        addTrack(trackList[i]);
    }

});

//FONCTION : récupérer chaque track de l'album
function addTrack(myTrackList) {
    let durationToHms = secondsToHms(myTrackList.duration);
    let newTrack = document.createElement('div');

    newTrack.innerHTML = `
            <span><a href="track.html?id=${myTrackList.id}">${myTrackList.title}</a></span>
            <span>${durationToHms}</span>
        `;
    document.querySelector('#track-list').appendChild(newTrack); //on crée les liens vers les chansons
}