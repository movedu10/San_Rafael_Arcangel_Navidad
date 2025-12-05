// Generar copos de nieve simples
const snowContainer = document.getElementById('snow');
const flakesCount = 50;

for(let i = 0; i < flakesCount; i++) {
    const flake = document.createElement('div');
    flake.classList.add('flake');
    flake.textContent = '❄'; // emoji copo de nieve
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    flake.style.fontSize = (Math.random() * 30 + 30) + 'px';
    flake.style.opacity = Math.random();
    flake.style.animationDelay = (Math.random() * 10) + 's';

    snowContainer.appendChild(flake);
}


