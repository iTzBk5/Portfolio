document.addEventListener("DOMContentLoaded", stars);

function stars() {
    let count = 20;
    let scene = document.querySelector('.scener');
    let i = 0;
    while (i < count) {
        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);
        let duration = Math.random() * 1+1; // Ensure duration is between 1 and 6 seconds
        let h = Math.random() * 100;

        star.style.left = x + 'px';
        star.style.width = 1 + 'px';
        star.style.height = 50 + h + 'px';
        star.style.animationDuration = duration + 's';

        scene.appendChild(star);
        i++;
    }
}
