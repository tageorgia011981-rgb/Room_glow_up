const fan = document.getElementById('fan-system');
const roomImg = document.getElementById('room-display');

// FORCE HIDE ON LOAD
fan.style.opacity = "0";
fan.style.visibility = "hidden";

// Updated Room Counts based on your latest images
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
    
    // Configured for 3 living rooms and 2 of everything else
    const maxRooms = { living: 3, dining: 2, kitchen: 2, bedroom: 2 };
    
    // Cycle logic: resets back to 1 after hitting the max
    cycles[cat] = (cycles[cat] % maxRooms[cat]) + 1;
    
    const labelMap = { living: 'Living Room', dining: 'Dining Room', kitchen: 'Kitchen', bedroom: 'Bedroom' };
    document.getElementById(`${cat}-label`).innerText = `${labelMap[cat]} ${cycles[cat]}`;
    
    // Handles naming conventions: livingroom.jpg, livingroom2.jpg, livingroom3.jpg
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
        { id: 7, top: '50%', left: '30%', rot: '-8' }, { id: 8, top: '45%', left
