const scoreboard = document.querySelector('.score');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('.button');
let lastHole;
let timeup = false;
let score = 0;


// make a randomtTime func to get random amount of time between min and max
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
}

// get the holes poping up
function peep() {
    const time = randomTime(400, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeup) peep();
    }, time);

}

function startGame() {
    scoreboard.textContent = 0;
    peep()
    score = 0;
    timeup = false;
    setTimeout(() => {
        timeup = true;
        // show the sccuess modal
        if (score > 0) {
            Swal.fire(
                'Awesome!',
                'You Did Great!',
                'success'
            )
            // show the error modal
        } else if (score === 0) {
            Swal.fire({
                icon: 'Error',
                title: 'Oops...You lose!',
                text: 'Start over again',
            })
        }
    }, 20000);

}


function clickingHole(e) {
    if (!e.isTrusted) return // cheater
    score++;
    this.parentNode.classList.remove('up');
    scoreboard.textContent = score;

}



button.addEventListener('click', startGame);
moles.forEach(mole => mole.addEventListener('click', clickingHole));
