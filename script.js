const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');
const fanSystem = document.getElementById('fan-system'); 
const fileInput = document.getElementById('file-upload');

const iconMap = { seating: 'iconseating.png', tables: 'icontable.png', storage: 'iconstorage.png', beds: 'iconbeds.png', kitchen: 'iconkitchen.png' };

const catalogData = {
    seating: { 'couches': Array(5).fill({ img: 'couch1.png' }), 'armchairs': Array(5).fill({ img: 'chair1.png' }), 'dining chairs': Array(5).fill({ img: 'chair1.png' }), 'stools': Array(5).fill({ img: 'chair1.png' }) },
    tables: { 'coffee': Array(5).fill({ img: 'table1.png' }), 'dining': Array(5).fill({ img: 'table2.png' }), 'side': Array(5).fill({ img: 'table1.png' }), 'desks': Array(5).fill({ img: 'table2.png' }) },
    storage: { 'shelves': Array(5).fill({ img: 'shelf1.png' }), 'cabinets': Array(5).fill({ img: 'cabinet_item.png' }), 'dressers': Array(5).fill({ img: 'shelf1.png' }) },
    kitchen: { 'stools': Array(5).fill({ img: 'chair1.png' }), 'lighting': Array(5).fill({ img: 'lamp1.png' }), 'runners': Array(5).fill({ img: 'rug1.png' }), 'decor': Array(5).fill({ img: 'plant1.png' }), 'islands': Array(5).fill({ img: 'table2.png' }) }
};

const decorData = { 'Lighting': Array(5).fill({ img: 'lamp1.png' }), 'Rugs': Array(5).fill({ img: 'rug1.png' }), 'Art': Array(5).fill({ img: 'art1.png' }), 'Curtains': Array(5).fill({ img: 'curtain1.png' }), 'Plants': Array(5).fill({ img: 'plant1.png' }) };

function addToRoom(src) {
    const img = document.createElement("img"); 
    img.src = src; img.className = "placed-item";
    img.dataset.rotation = 0; img.dataset.flip = 1;
    img.ondblclick = function() { this.dataset.rotation = parseInt(this.dataset.rotation) + 45; applyX(this); };
    img.oncontextmenu = function(e) { e.preventDefault(); this.dataset.flip = this.dataset.flip == 1 ? -1 : 1; applyX(this); };
    function applyX(el) { el.style.transform = `rotate(${el.dataset.rotation}deg) scaleX(${el.dataset.flip})`; }
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

function openMode(mode, el) {
    fanSystem.classList.remove('active-fan'); fanSystem.classList.remove('fan-down'); fanSystem.innerHTML = ''; hideOverlays();
    if (mode === 'rooms' || mode === 'furniture') {
        cab.classList.add('cabinet-visible'); 
        drawerStack.innerHTML = '';
        const items = mode === 'rooms' ? ['Living Room', 'Bedroom', 'Dining Room', 'Kitchen', 'Upload'] : Object.keys(catalogData);
        items.forEach(name => {
            let action = mode === 'rooms' ? (name === 'Upload' ? "triggerUpload()" : `selectRoom('room.jpg', this)`) : `selectRoom('room.jpg', this); showSubtypes('${name}')`;
            drawerStack.innerHTML += `<div class="drawer-zone" onclick="${action}"><div class="drawer-hardware"><div class="screw s-tl"></div><div class="screw s-tr"></div><div class="screw s-bl"></div><div class="screw s-br"></div><div class="plate-style">${name}</div><div class="lip-pull"></div></div></div>`;
        });
    } else if (mode === 'decor') {
        cab.classList.remove('cabinet-visible'); openDecorFan();
    }
}

function selectRoom(src, el) {
    roomImg.src = src; fanSystem.classList.remove('active-fan'); fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    setTimeout(() => {
        const dRect = el.getBoundingClientRect();
        const wsRect = document.querySelector('.workspace').getBoundingClientRect();
        fanSystem.style.top = (dRect.top - wsRect.top + (dRect.height / 2)) + 'px';
        fanSystem.style.left = (dRect.right - wsRect.left - 30) + 'px';
        Object.keys(catalogData).slice(0, 5).forEach((cat, i) => {
            const b = document.createElement('div'); b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<img src="${iconMap[cat]}" class="fan-icon" onclick="showSubtypes('${cat}')">`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 50);
}

function showSubtypes(cat) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        Object.keys(catalogData[cat]).forEach((type, i) => {
            const b = document.createElement('div'); b.className = `swatch-blade s-${i + 1}`;
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
            const b = document.createElement('div'); b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<img src="${item.img}" class="fan-icon" onclick="addToRoom('${item.img}')">`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

function openDecorFan() {
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>'; fanSystem.classList.add('fan-down'); 
    fanSystem.style.left = "50%"; fanSystem.style.top = "180px";
    Object.keys(decorData).forEach((cat, i) => {
        const b = document.createElement('div'); b.className = `swatch-blade s-${i + 1}`;
        b.innerHTML = `<div class="fan-text" onclick="showDecorItems('${cat}')">${cat}</div>`;
        fanSystem.appendChild(b);
    });
    setTimeout(() => fanSystem.classList.add('active-fan'), 50);
}

function showDecorItems(cat) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        decorData[cat].forEach((item, i) => {
            const b = document.createElement('div'); b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<img src="${item.img}" class="fan-icon" onclick="addToRoom('${item.img}')">`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

function showLookBook() { hideOverlays(); document.getElementById('lookbook-overlay').style.display = 'block'; renderLookbook(); }
function hideOverlays() { document.querySelectorAll('.overlay-bg').forEach(o => o.style.display = 'none'); }
function resetStage() { document.querySelectorAll(".placed-item").forEach(item => item.remove()); }
function triggerUpload() { fileInput.click(); }
function renderLookbook() {
    const grid = document.getElementById('look-grid'); grid.innerHTML = '';
    for(let i = 1; i <= 8; i++) {
        const card = document.createElement('div'); card.className = 'look-card';
        card.style.transform = `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg)`;
        card.innerHTML = `<img src="insp${i}.jpg" onerror="this.src='cabinet.png'">`;
        grid.appendChild(card);
    }
}
