const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');
const fanSystem = document.getElementById('fan-system'); 
const fileInput = document.getElementById('file-upload');
let shoppingList = [];

// --- ASSET CONFIGURATION ---
const iconMap = { 
    'seating': 'iconseating.png', 
    'tables': 'icontable.png', 
    'storage': 'iconstorage.png', 
    'beds': 'iconbeds.png' 
};

const catalogData = {
    seating: { 
        'couches': Array(5).fill({ id: 'SF-X', img: 'couch1.png', price: 1200 }),
        'chairs': Array(5).fill({ id: 'CH-X', img: 'chair1.png', price: 300 }),
        'benches': Array(5).fill({ id: 'BN-X', img: 'couch1.png', price: 400 }),
        'stools': Array(5).fill({ id: 'SL-X', img: 'chair1.png', price: 150 })
    },
    tables: { 
        'coffee': Array(5).fill({ id: 'TB-X', img: 'table1.png', price: 450 }),
        'dining': Array(5).fill({ id: 'DT-X', img: 'table2.png', price: 800 }),
        'side': Array(5).fill({ id: 'ST-X', img: 'table1.png', price: 200 }),
        'desks': Array(5).fill({ id: 'DK-X', img: 'table2.png', price: 600 })
    },
    storage: { 
        'shelves': Array(5).fill({ id: 'SH-X', img: 'shelf1.png', price: 150 }),
        'cabinets': Array(5).fill({ id: 'CB-X', img: 'cabinet_item.png', price: 500 }),
        'dressers': Array(5).fill({ id: 'DR-X', img: 'shelf1.png', price: 700 }),
        'hooks': Array(5).fill({ id: 'HK-X', img: 'hook.png', price: 20 })
    },
    beds: { 
        'king': Array(5).fill({ id: 'BD-K', img: 'bed1.png', price: 1200 }),
        'queen': Array(5).fill({ id: 'BD-Q', img: 'bed1.png', price: 1000 }),
        'twin': Array(5).fill({ id: 'BD-T', img: 'bed1.png', price: 600 }),
        'frames': Array(5).fill({ id: 'BD-F', img: 'bed1.png', price: 400 })
    }
};

const decorData = {
    'Lighting': Array(5).fill({ id: 'LT-X', img: 'lamp1.png', price: 100 }),
    'Rugs': Array(5).fill({ id: 'RG-X', img: 'rug1.png', price: 250 }),
    'Art': Array(5).fill({ id: 'AR-X', img: 'art1.png', price: 300 }),
    'Curtains': Array(5).fill({ id: 'CT-X', img: 'curtain1.png', price: 80 }),
    'Plants': Array(5).fill({ id: 'PL-X', img: 'plant1.png', price: 50 })
};

// --- NAVIGATION & MODES ---
function openMode(mode, el) {
    fanSystem.classList.remove('active-fan'); 
    fanSystem.innerHTML = ''; 
    hideOverlays();
    if (mode === 'decor') {
        cab.classList.remove('cabinet-visible');
        if(el) {
            const rect = el.getBoundingClientRect();
            const wsRect = document.querySelector('.workspace').getBoundingClientRect();
            fanSystem.style.left = (rect.left - wsRect.left + (rect.width/2)) + 'px'; 
            fanSystem.style.top = '-60px'; 
        }
        setTimeout(openDecorFan, 100);
    } else if (mode === 'rooms') {
        cab.classList.add('cabinet-visible'); 
        drawerStack.innerHTML = '';
        ['Living Room', 'Bedroom', 'Dining Room', 'Upload'].forEach(name => {
            let action = name === 'Upload' ? "triggerUpload()" : `selectRoom('room.jpg', this)`;
            drawerStack.innerHTML += `<div class="drawer-zone" onclick="${action}"><div class="drawer-hardware"><div class="plate-style">${name}</div><div class="lip-pull"></div></div></div>`;
        });
    }
}

// --- FAN LOGIC (FURNITURE) ---
function selectRoom(src, el) {
    roomImg.src = src; roomImg.style.display = 'block'; 
    fanSystem.classList.remove('fan-down'); 
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    if(el) {
        const dRect = el.getBoundingClientRect();
        const wsRect = document.querySelector('.workspace').getBoundingClientRect();
        fanSystem.style.top = (dRect.top - wsRect.top + (dRect.height / 2)) + 'px';
        fanSystem.style.left = (dRect.right - wsRect.left - 40) + 'px';
    }
    Object.keys(catalogData).forEach((cat, i) => {
        const b = document.createElement('div'); 
        b.className = `swatch-blade s-${i + 1}`;
        b.innerHTML = `<img src="${iconMap[cat]}" class="fan-icon" onclick="showSubtypes('${cat}')">`;
        fanSystem.appendChild(b);
    });
    setTimeout(() => fanSystem.classList.add('active-fan'), 50);
}

function showSubtypes(cat) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        Object.keys(catalogData[cat]).forEach((type, i) => {
            const b = document.createElement('div'); 
            b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<div class="fan-text" onclick="showItems('${cat}', '${type}')">${type}</div>`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

function showItems(cat, type) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        catalogData[cat][type].forEach((item, i) => {
            const b = document.createElement('div'); 
            b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<img src="${item.img}" class="fan-icon" onclick="addToRoom('${item.img}')">`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

// --- FAN LOGIC (DECOR) ---
function openDecorFan() {
    fanSystem.classList.add('fan-down'); 
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    Object.keys(decorData).forEach((cat, i) => {
        const b = document.createElement('div'); 
        b.className = `swatch-blade s-${i + 1}`;
        b.innerHTML = `<div class="fan-text" onclick="showDecorItems('${cat}')">${cat}</div>`;
        fanSystem.appendChild(b);
    });
    setTimeout(() => fanSystem.classList.add('active-fan'), 50);
}

function showDecorItems(cat) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        const items = decorData[cat]; 
        items.forEach((item, i) => {
            const b = document.createElement('div'); 
            b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<img src="${item.img}" class="fan-icon" onclick="addToRoom('${item.img}')">`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

// --- DRAG AND DROP & RESET ---
function addToRoom(src) {
    const img = document.createElement("img"); 
    img.src = src; 
    img.className = "placed-item";
    img.style.left = "400px"; 
    img.style.top = "300px";

    // SPECIAL RUG LOGIC: Rugs sit under furniture
    if (src.toLowerCase().includes('rug')) {
        img.style.zIndex = "500"; 
        img.style.width = "400px"; 
    } else {
        img.style.zIndex = "1000"; 
    }

    img.onmousedown = function(e) {
        let sx = e.clientX - img.getBoundingClientRect().left;
        let sy = e.clientY - img.getBoundingClientRect().top;
        document.onmousemove = (ev) => {
            const st = document.getElementById("stage-zone").getBoundingClientRect();
            img.style.left = (ev.pageX - st.left - sx) + 'px';
            img.style.top = (ev.pageY - st.top - sy) + 'px';
        };
        img.onmouseup = () => document.onmousemove = null;
    };
    document.getElementById("stage-zone").appendChild(img);
}

function resetStage() {
    const stage = document.getElementById("stage-zone");
    const items = stage.querySelectorAll(".placed-item");
    items.forEach(item => item.remove());
}

// --- UI HELPERS ---
function renderLookbook() {
    const grid = document.getElementById('look-grid');
    grid.innerHTML = '';
    for(let i = 1; i <= 8; i++) {
        grid.innerHTML += `<div class="look-card"><img src="insp${i}.jpg" onerror="this.src='cabinet.png'"></div>`;
    }
}

function lift(el) { 
    document.querySelectorAll('.drawer-hardware').forEach(d => d.classList.remove('active-lift')); 
    el.classList.add('active-lift'); 
}

function hideOverlays() { 
    document.querySelectorAll('.overlay-bg').forEach(o => o.style.display = 'none'); 
}

function showCatalog() { 
    hideOverlays(); 
    document.getElementById('catalog-overlay').style.display = 'block'; 
}

function showLookBook() { 
    hideOverlays(); 
    document.getElementById('lookbook-overlay').style.display = 'block'; 
    renderLookbook(); 
}

function triggerUpload() { fileInput.click(); }
