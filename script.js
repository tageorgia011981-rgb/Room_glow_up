const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');
const fanSystem = document.getElementById('fan-system'); 
const fileInput = document.getElementById('file-upload');
let shoppingList = [];

const iconMap = {
    'seating': 'iconseating.png', 'tables': 'icontable.png', 
    'storage': 'iconstorage.png', 'beds': 'iconbeds.png'
};

// --- FURNITURE DATA (4 Depts -> 4 Types -> 5 Items) ---
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

// --- DECOR DATA (Now includes Curtains) ---
const decorData = {
    'Lighting': Array(5).fill({ id: 'LT-X', img: 'lamp1.png', price: 100 }),
    'Rugs': Array(5).fill({ id: 'RG-X', img: 'rug1.png', price: 250 }),
    'Art': Array(5).fill({ id: 'AR-X', img: 'art1.png', price: 300 }),
    'Curtains': Array(5).fill({ id: 'CT-X', img: 'curtain1.png', price: 80 })
};

function openMode(mode, el) {
    fanSystem.classList.remove('active-fan'); fanSystem.innerHTML = ''; hideOverlays();
    if (mode === 'decor') {
        cab.classList.remove('cabinet-visible');
        if(el) {
            const rect = el.getBoundingClientRect();
            const workspaceRect = document.querySelector('.workspace').getBoundingClientRect();
            fanSystem.style.left = (rect.left - workspaceRect.left + (rect.width/2)) + 'px'; 
            fanSystem.style.top = '-60px'; 
        }
        setTimeout(openDecorFan, 100);
    } else if (mode === 'rooms') {
        cab.classList.add('cabinet-visible'); drawerStack.innerHTML = '';
        const rooms = [
            { name: 'Living Room', file: 'livingroom2.jpg' }, { name: 'Bedroom', file: 'bedroom.jpg' },
            { name: 'Dining Room', file: 'diningroom.jpg' }, { name: 'Upload', file: 'upload' }
        ];
        rooms.forEach(data => {
            let clickAction = data.name === 'Upload' ? "triggerUpload()" : `selectRoom('${data.file}', this)`;
            drawerStack.innerHTML += `<div class="drawer-zone" onclick="${clickAction}"><div class="drawer-hardware"><div class="plate-style">${data.name}</div><div class="lip-pull"></div></div></div>`;
        });
    }
}

function selectRoom(src, el) {
    roomImg.src = src; roomImg.style.display = 'block'; 
    fanSystem.classList.remove('fan-down'); fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    if(el) {
        const drawerRect = el.getBoundingClientRect();
        const workspaceRect = document.querySelector('.workspace').getBoundingClientRect();
        fanSystem.style.top = (drawerRect.top - workspaceRect.top + 25) + 'px';
        fanSystem.style.left = (drawerRect.right - workspaceRect.left - 140) + 'px';
    }
    const categories = Object.keys(catalogData);
    categories.forEach((cat, i) => {
        const blade = document.createElement('div');
        blade.className = `swatch-blade s-${i + 1}`;
        blade.innerHTML = `<img src="${iconMap[cat]}" class="fan-icon" onclick="showSubtypes('${cat}')">`;
        fanSystem.appendChild(blade);
    });
    setTimeout(() => fanSystem.classList.add('active-fan'), 50);
}

function showSubtypes(category) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        const types = Object.keys(catalogData[category]);
        types.forEach((type, i) => {
            const blade = document.createElement('div');
            blade.className = `swatch-blade s-${i + 1}`;
            blade.innerHTML = `<div class="fan-text" onclick="showItems('${category}', '${type}')">${type}</div>`;
            fanSystem.appendChild(blade);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

function showItems(category, type) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        const items = catalogData[category][type];
        items.forEach((item, i) => {
            const blade = document.createElement('div');
            blade.className = `swatch-blade s-${i + 1}`; 
            blade.innerHTML = `<img src="${item.img}" class="fan-icon" onclick="addToRoom('${item.img}')">`;
            fanSystem.appendChild(blade);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

function openDecorFan() {
    fanSystem.classList.add('fan-down'); fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    const items = Object.keys(decorData);
    items.forEach((item, i) => {
        const blade = document.createElement('div');
        blade.className = `swatch-blade s-${i + 1}`;
        blade.innerHTML = `<div class="fan-text" onclick="showDecorItems('${item}')">${item}</div>`;
        fanSystem.appendChild(blade);
    });
    setTimeout(() => fanSystem.classList.add('active-fan'), 50);
}

function showDecorItems(category) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        const items = decorData[category];
        items.forEach((item, i) => {
            const blade = document.createElement('div');
            blade.className = `swatch-blade s-${i + 1}`;
            blade.innerHTML = `<img src="${item.img}" class="fan-icon" onclick="addToRoom('${item.img}')">`;
            fanSystem.appendChild(blade);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

function addToRoom(src) {
    const img = document.createElement("img");
    img.src = src; img.className = "placed-item";
    img.style.left = "50%"; img.style.top = "50%";
    img.onmousedown = function(e) {
        let shiftX = e.clientX - img.getBoundingClientRect().left;
        let shiftY = e.clientY - img.getBoundingClientRect().top;
        function moveAt(pageX, pageY) {
            const stage = document.getElementById("stage-zone").getBoundingClientRect();
            img.style.left = (pageX - stage.left - shiftX) + 'px';
            img.style.top = (pageY - stage.top - shiftY) + 'px';
        }
        document.onmousemove = (ev) => moveAt(ev.pageX, ev.pageY);
        img.onmouseup = () => document.onmousemove = null;
    };
    document.getElementById("stage-zone").appendChild(img);
}

function lift(el) { 
    document.querySelectorAll('.drawer-hardware').forEach(d => d.classList.remove('active-lift')); 
    el.classList.add('active-lift'); 
}
function hideOverlays() { 
    document.getElementById('catalog-overlay').style.display = 'none'; 
    document.getElementById('lookbook-overlay').style.display = 'none'; 
}
function showCatalog() { hideOverlays(); document.getElementById('catalog-overlay').style.display = 'block'; }
function showLookBook() { hideOverlays(); document.getElementById('lookbook-overlay').style.display = 'block'; }
