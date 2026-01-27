const fan = document.getElementById('fan-system');
const roomImg = document.getElementById('room-display');

// FORCE HIDE ON LOAD
fan.style.opacity = "0";
fan.style.visibility = "hidden";

// Updated Room Counts: Living(3), Dining(2), Kitchen(2), Bedroom(2)
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
    const maxRooms = { living: 3, dining: 2, kitchen: 2, bedroom: 2 };
    cycles[cat] = (cycles[cat] % maxRooms[cat]) + 1;
    
    const labelMap = { living: 'Living Room', dining: 'Dining Room', kitchen: 'Kitchen', bedroom: 'Bedroom' };
    document.getElementById(`${cat}-label`).innerText = `${labelMap[cat]} ${cycles[cat]}`;
    
    let fileName = (cat === 'bedroom' ? 'bedroom' : cat === 'kitchen' ? 'kitchen' : cat + 'room');
    fileName += (cycles[cat] === 1 ? '' : cycles[cat]) + '.jpg';
    
    roomImg.src = fileName;
    roomImg.style.display = 'block';
    openCabinetFurnitureFan(el);
}

function stageCycle() {
    const btn = document.querySelector(`.drawer-hardware[onclick*="${currentCategory}"]`);
    if(btn) cycleRoom(currentCategory, btn);
}

// --- CABINET FURNITURE FANS ---
function openCabinetFurnitureFan(el) {
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

// --- TOP NAV: CATALOG (BUYING LINKS) ---
function openCatalogFan(el) {
    const rect = el.getBoundingClientRect();
    const wRect = document.querySelector('.workspace').getBoundingClientRect();
    fan.style.left = (rect.left + rect.width / 2) + 'px';
    fan.style.top = (rect.bottom - wRect.top + 10) + 'px';
    fan.innerHTML = '<div class="pivot-bolt" onclick="this.parentElement.classList.remove(\'fan-visible\')"></div>';
    
    const shops = [
        { name: 'CHIC', url: 'https://www.google.com' },
        { name: 'VOGUE', url: 'https://www.vogue.com/living' },
        { name: 'MODERN', url: 'https://www.archdigest.com/' }
    ];

    shops.forEach((shop, i) => {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i+1}`;
        b.innerHTML = `<div class="fan-text-stacked">${stackText(shop.name)}</div>`;
        b.onclick = () => window.open(shop.url, '_blank'); 
        fan.appendChild(b);
    });
    fan.className = 'fan-system fan-visible active-fan fan-3';
}

// --- TOP NAV: INSPIRATION SCRAPBOOK ---
function openInspirationBook() {
    const book = document.createElement('div');
    book.id = "inspiration-overlay";
    book.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15,16,17,0.98); z-index:9000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(12px); overflow:hidden;";
    
    let polaroidsHTML = '';
    const inspData = [
        { id: 1, top: '5%', left: '3%', rot: '-6' }, { id: 2, top: '15%', left: '22%', rot: '4' },
        { id: 3, top: '2%', left: '45%', rot: '-2' }, { id: 4, top: '10%', left: '68%', rot: '8' },
        { id: 5, top: '40%', left: '80%', rot: '-5' }, { id: 6, top: '55%', left: '55%', rot: '3' },
        { id: 7, top: '50%', left: '30%', rot: '-8' }, { id: 8, top: '45%', left: '5%', rot: '6' },
        { id: 9, top: '70%', left: '12%', rot: '-3' }, { id: 10, top: '75%', left: '40%', rot: '5' },
        { id: 11, top: '65%', left: '72%', rot: '-7' }, { id: 12, top: '25%', left: '85%', rot: '2' },
        { id: 13, top: '30%', left: '15%', rot: '-4' }, { id: 14, top: '80%', left: '60%', rot: '1' }
    ];

    inspData.forEach(img => {
        polaroidsHTML += `
            <div style="position:absolute; top:${img.top}; left:${img.left}; transform:rotate(${img.rot}deg); background:white; padding:10px 10px 30px 10px; box-shadow:8px 12px 25px rgba(0,0,0,0.6); width:180px; transition: 0.3s; cursor:pointer;" onmouseover="this.style.zIndex=10000; this.style.transform='scale(1.1) rotate(0deg)';" onmouseout="this.style.zIndex=''; this.style.transform='rotate(${img.rot}deg)';">
                <img src="insp${img.id}.jpg" style="width:100%; height:140px; object-fit:cover;" onerror="this.src='https://via.placeholder.com/200x160?text=Insp+${img.id}'">
                <p style="font-family:'Caveat'; color:#222; font-size:16px; margin-top:8px; text-align:center;">Insp Piece ${img.id}</p>
            </div>
        `;
    });

    book.innerHTML = `
        <div style="position:relative; width:98%; height:95vh; background:#2c2e30; border:2px solid #8e9196; box-shadow:inset 0 0 100px #000; padding:20px; overflow:hidden;">
            <div onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:20px; right:30px; font-family:'Special Elite'; color:silver; cursor:pointer; font-size:24px; z-index:11000; background:rgba(0,0,0,0.5); padding:5px 15px; border:1px solid silver;">[ CLOSE X ]</div>
            <div style="text-align:center; position:relative; z-index:10005;">
                <h2 style="font-family:'Limelight'; font-size:55px; color:white;">THE LOOK BOOK</h2>
            </div>
            <div id="scrapbook-canvas" style="position:relative; width:100%; height:100%;">
                ${polaroidsHTML}
            </div>
        </div>
    `;
    document.body.appendChild(book);
}

// --- DECOR & INVENTORY ---
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
        if(n === 'CURTAINS') b.onclick = (e) => { e.stopPropagation(); openCurtainInventory(); };
        if(n === 'EXTRAS') b.onclick = (e) => { e.stopPropagation(); openExtrasSubFan(); };
        fan.appendChild(b);
    });
    fan.className = 'fan-system fan-visible active-fan fan-5';
}

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
}

function openCurtainInventory() {
    fan.innerHTML = '<div class="pivot-bolt" onclick="openDecorFan(document.querySelector(\'.drawer-hardware[onclick*=\\\'openDecorFan\\\']\'))"></div>';
    for(let i=1; i<=5; i++) {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i}`;
        b.innerHTML = `<img src="curtain${i}.png" class="blade-img" onerror="this.parentElement.innerHTML='<div class=fan-text-stacked>C<br>U<br>R<br>T<br>${i}</div>'">`;
        fan.appendChild(b);
    }
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
