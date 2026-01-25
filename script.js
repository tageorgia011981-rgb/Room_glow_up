function openDecorFan() {
    fanSystem.classList.remove('active-fan'); 
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>'; // Added pivot bolt
    fanSystem.classList.add('fan-down'); 

    Object.keys(decorData).forEach((cat, i) => {
        const b = document.createElement('div'); 
        b.className = `swatch-blade s-${i + 1}`;
        b.innerHTML = `<div class="fan-text" onclick="showDecorItems('${cat}')">${cat}</div>`;
        fanSystem.appendChild(b);
    });

    setTimeout(() => fanSystem.classList.add('active-fan'), 50);
}

function renderLookbook() {
    const grid = document.getElementById('look-grid');
    grid.innerHTML = '';
    // This loops through 8 inspiration slots
    for(let i = 1; i <= 8; i++) {
        const card = document.createElement('div');
        card.className = 'look-card';
        // Random rotation for the "magazine/photo" vibe
        const randomRot = (Math.random() * 4 - 2).toFixed(1);
        card.style.transform = `rotate(${randomRot}deg)`;
        card.innerHTML = `<img src="insp${i}.jpg" onerror="this.src='cabinet.png'">`;
        grid.appendChild(card);
    }
}
