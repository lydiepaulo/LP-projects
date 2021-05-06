/* FONCTION : convertir les durées (secondes) en minutes et secondes */

function secondsToHms(duration) {
    duration = Number(duration);

    let min = Math.floor(duration % 3600 / 60);
    let sec = Math.floor(duration % 3600 % 60);

    return ('0' + min).slice(-2) + ":" + ('0' + sec).slice(-2);
}


/* FONCTION : like/dislike au clic */

function heartOnClick(id, $button) {
    let track_List = localStorage.getItem('tracksIds');

    //s'il n'y en a pas on crée un tableau | s'il y en a, on transforme la string en tableau
    track_List = track_List ? JSON.parse(track_List) : [];

    //on vérifie si l'id est déjà dans le tableau. si oui on l'enlève | sinon on l'ajoute
    if (track_List.includes(id)) {
        //déjà présent : on retire + vide le cœur au clic
        track_List.splice(track_List.indexOf(id), 1);
        $button.style.cssText = "font-weight: 400";
    }
    else {
        //pas encore là : on push l'id + remplit le cœur au clic
        track_List.push(id);
        $button.style.cssText = "font-weight: 900; color: #e3502b";
    }

    localStorage.setItem('tracksIds', JSON.stringify(track_List)); //on enregistre dans localstorage
}