const fan = document.getElementById('fan-system');
const roomImg = document.getElementById('room-display');

// FORCE HIDE ON LOAD
fan.style.opacity = "0";
fan.style.visibility = "hidden";

// Cycle Tracking for Rooms
let cycles = { living: 1, dining: 1, kitchen: 1, bedroom: 1 };
let currentCategory = 'bedroom'; 

// --- CABINET LOGIC ---
function toggleCabinet() { 
    document.getElementById('cab').classList.toggle('cabinet-visible'); 
    document.getElementById('main-stage').classList.toggle('stage-slid'); 
}

function stackText(s) { return s.split('').join('<br>'); }

function cycleRoom(cat, el) {
    currentCategory = cat;
    cycles[cat] = cycles[cat] === 1 ? 2 : 1;
    
    const labelMap = { living: 'Living Room', dining: 'Dining Room', kitchen: 'Kitchen', bedroom: 'Bedroom' };
    document.getElementById(`${cat}-label`).innerText = `${labelMap[cat]} ${cycles[cat]}`;
    
    let fileName = (cat === 'bedroom' ? 'bedroom' : cat === 'kitchen' ? 'kitchen' : cat + 'room');
    fileName += (cycles[cat] === 1 ? '' : '2') + '.jpg';
    
    roomImg.src = fileName;
    roomImg.style.display = 'block';
    openFurnitureFan(el);
}

function stageCycle() {
    const btn = document.querySelector(`.drawer-hardware[onclick*="${currentCategory}"]`);
    if(btn) cycleRoom(currentCategory, btn);
}

// --- FAN POSITIONING ---
function openFurnitureFan(el) {
    const rect = el.getBoundingClientRect();
    const wRect = document.querySelector('.workspace').getBoundingClientRect();
    fan.style.left = (rect.right - wRect.left + 50) + 'px';
    fan.style.top = (rect.top - wRect.top + rect.height / 2) + 'px';
    fan.innerHTML = '<div class="pivot-bolt" onclick="this.parentElement.classList.remove(\'fan-visible\')"></div>';
    
    ['SEAT','TABL','STOR','BEDS'].forEach((n, i) => {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i+1}`;
        b.innerHTML = `<div class="fan-text-stacked">${stackText(n)}</div>`;
        fan.appendChild(b);
    });
    fan.className = 'fan-system fan-visible active-fan fan-4';
}

function openDecorFan(el) {
    const rect = el.getBoundingClientRect();
    const wRect = document.querySelector('.workspace').getBoundingClientRect();
    fan.style.left = (rect.left + rect.width / 2) + 'px';
    fan.style.top = (rect.bottom - wRect.top + 10) + 'px';
    fan.innerHTML = '<div class="pivot-bolt" onclick="this.parentElement.classList.remove(\'fan-visible\')"></div>';
    
    ['PLANTS','RUGS','LIGHTS','EXTRAS','CURTAINS'].forEach((n, i) => {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i+1}`;
        b.innerHTML = `<div class="fan-text-stacked">${stackText(n)}</div>`;
        if(n === 'PLANTS') b.onclick = (e) => { e.stopPropagation(); openPlantInventory(); };
        if(n === 'RUGS') b.onclick = (e) => { e.stopPropagation(); openRugInventory(); };
        if(n === 'CURTAINS') b.onclick = (e) => { e.stopPropagation(); openCurtainInventory(); };
        if(n === 'EXTRAS') b.onclick = (e) => { e.stopPropagation(); openExtrasSubFan(); };
        fan.appendChild(b);
    });
    fan.className = 'fan-system fan-visible active-fan fan-5';
}

// --- SUB-FANS & INVENTORY ---
function openExtrasSubFan() {
    fan.innerHTML = '<div class="pivot-bolt" onclick="openDecorFan(document.querySelector(\'.drawer-hardware[onclick*=\\\'openDecorFan\\\']\'))"></div>';
    ['PILLOW','VASES','ART'].forEach((n, i) => {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i+1}`;
        b.innerHTML = `<div class="fan-text-stacked">${stackText(n)}</div>`;
        if(n === 'PILLOW') b.onclick = (e) => { e.stopPropagation(); openPillowInventory(); };
        fan.appendChild(b);
    });
    fan.className = 'fan-system fan-visible active-fan fan-3';
}

function openPlantInventory() {
    fan.innerHTML = '<div class="pivot-bolt" onclick="openDecorFan(document.querySelector(\'.drawer-hardware[onclick*=\\\'openDecorFan\\\']\'))"></div>';
    for(let i=1; i<=5; i++) {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i}`;
        b.innerHTML = `<img src="plant${i}.png" class="blade-img" onerror="this.parentElement.innerHTML='<div class=fan-text-stacked>P<br>L<br>A<br>N<br>T<br>${i}</div>'">`;
        fan.appendChild(b);
    }
    fan.className = 'fan-system fan-visible active-fan fan-5';
}

function openRugInventory() {
    fan.innerHTML = '<div class="pivot-bolt" onclick="openDecorFan(document.querySelector(\'.drawer-hardware[onclick*=\\\'openDecorFan\\\']\'))"></div>';
    for(let i=1; i<=6; i++) {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i}`;
        b.innerHTML = `<img src="rug${i}.png" class="blade-img" onerror="this.parentElement.innerHTML='<div class=fan-text-stacked>R<br>U<br>G<br>${i}</div>'">`;
        fan.appendChild(b);
    }
    fan.className = 'fan-system fan-visible active-fan fan-6';
}

function openCurtainInventory() {
    fan.innerHTML = '<div class="pivot-bolt" onclick="openDecorFan(document.querySelector(\'.drawer-hardware[onclick*=\\\'openDecorFan\\\']\'))"></div>';
    for(let i=1; i<=5; i++) {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i}`;
        b.innerHTML = `<img src="curtain${i}.png" class="blade-img" onerror="this.parentElement.innerHTML='<div class=fan-text-stacked>C<br>U<br>R<br>T<br>${i}</div>'">`;
        fan.appendChild(b);
    }
    fan.className = 'fan-system fan-visible active-fan fan-5';
}

function openPillowInventory() {
    fan.innerHTML = '<div class="pivot-bolt" onclick="openExtrasSubFan()"></div>';
    for(let i=1; i<=4; i++) {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i}`;
        b.innerHTML = `<img src="pillow${i}.png" class="blade-img" onerror="this.parentElement.innerHTML='<div class=fan-text-stacked>P<br>I<br>L<br>O<br>W<br>${i}</div>'">`;
        fan.appendChild(b);
    }
    fan.className = 'fan-system fan-visible active-fan fan-4';
}
