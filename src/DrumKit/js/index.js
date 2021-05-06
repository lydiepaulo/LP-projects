function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}`);
    if(!audio) return; //we stop the function to return
    audio.currentTime = 0; //rewind to te start each time we press the key
    audio.play(); //we play the sound if there is one
    key.classList.add('playing'); //same as : key.addClass('playing')
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return; //skip the type of transition if it's not transform
    this.classList.remove('playing');
    console.log(this);
};

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);