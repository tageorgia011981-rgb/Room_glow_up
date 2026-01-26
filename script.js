const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');
const fanSystem = document.getElementById('fan-system');
const fileInput = document.getElementById('file-upload');

let currentLockedRoom = null;

const catalogData = {
    seating: { couches: ['couch1.png'], chairs: ['chair1.png'] },
    tables: { coffee: ['coffeetable.png'], dining: ['table2.png'] },
    storage: { shelves: ['shelf1.png'], dressers: ['dresser1.png'] },
    beds: { frames: ['bed1.png'] }
};

function openMode(mode, el) {
    fanSystem.classList.remove('active-fan');
    fanSystem.innerHTML = '';
    hideOverlays();

    if (mode === 'decor') {
        cab.classList.remove('cabinet-visible');
        if(el) {
            const rect = el.getBoundingClientRect();
            const workspaceRect = document.querySelector('.workspace').getBoundingClientRect();
            const leftPos = rect.left - workspaceRect.left + (rect.width / 2);
            fanSystem.style.left = leftPos + 'px';
            fanSystem.style.top = '-80px';
        }
        setTimeout(() => { openDecorFan(); }, 100);
    } else if (mode === 'rooms') {
        cab.classList.add('cabinet-visible');
        drawerStack.innerHTML = '';
        fanSystem.classList.remove('fan-down');
        const rooms = [
            { name: 'Living Room',  file: 'livingroom2.jpg' },
            { name: 'Bedroom',      file: 'bedroom.jpg' },
            { name: 'Dining Room',  file: 'diningroom.jpg' },
            { name: 'Upload',       file: 'upload' }
        ];
        rooms.forEach(data => {
            let clickAction = data.name === 'Upload' ? "triggerUpload()" : `selectRoom('${data.file}')`;
            let textColor = data.name === 'Upload' ? "color:#d00;" : "";
            drawerStack.innerHTML += `
                <div class="drawer-zone" onclick="${clickAction}">
                    <div class="drawer-hardware">
                        <div class="plate-style" style="${textColor}">${data.name}</div>
                        <div class="lip-pull"></div>
                    </div>
                </div>`;
        });
    }
}

function openDecorFan() {
    fanSystem.classList.add('fan-down');
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    const items = ['Lighting', 'Rugs', 'Art', 'Decor'];
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        items.forEach((item, i) => {
            const blade = document.createElement('div');
            blade.className = `swatch-blade s-${i + 1}`;
            blade.innerHTML = `<div class="fan-text" onclick="alert('Decor: ${item}')">${item}</div>`;
            fanSystem.appendChild(blade);
        });
        setTimeout(() => { fanSystem.classList.add('active-fan'); }, 50);
    }, 50);
}

function showCatalog() {
    cab.classList.remove('cabinet-visible');
    fanSystem.classList.remove('active-fan');
    document.getElementById('lookbook-overlay').style.display = 'none';
    document.getElementById('catalog-overlay').style.display = 'block';
}

function showLookBook() {
    cab.classList.remove('cabinet-visible');
    fanSystem.classList.remove('active-fan');
    document.getElementById('catalog-overlay').style.display = 'none';
    document.getElementById('lookbook-overlay').style.display = 'block';
}

function hideOverlays() {
    document.getElementById('catalog-overlay').style.display = 'none';
    document.getElementById('lookbook-overlay').style.display = 'none';
}

function selectCat(cat, el) {
    document.querySelectorAll('#cat-col .index-item').forEach(i => i.classList.remove('selected'));
    if(el) el.classList.add('selected');
    const list = document.getElementById('type-list');
    list.innerHTML = '';
    if(catalogData[cat]) {
        Object.keys(catalogData[cat]).forEach(type => {
            list.innerHTML += `<div class="index-item" onclick="selectType('${cat}', '${type}', this)">${type}</div>`;
        });
    }
}

function selectType(cat, type, el) {
    document.querySelectorAll('#type-col .index-item').forEach(i => i.classList.remove('selected'));
    if(el) el.classList.add('selected');
    const grid = document.getElementById('asset-list');
    grid.innerHTML = '';
    if(catalogData[cat] && catalogData[cat][type]) {
        catalogData[cat][type].forEach(img => {
            grid.innerHTML += `
                <div class="asset-card">
                    <img src="${img}">
                    <p>${type}</p>
                    <button class="buy-btn" onclick="addToRoom('${img}')">BUY & ADD</button>
                </div>`;
        });
    }
}

function selectRoom(src) {
    currentLockedRoom = src;
    roomImg.src = src;
    roomImg.style.display = 'block';
}

function triggerUpload() { fileInput.click(); }

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { selectRoom(e.target.result); }
        reader.readAsDataURL(file);
    }
});

function addToRoom(src) {
    hideOverlays();
    const img = document.createElement("img");
    img.src = src;
    img.className = "placed-item";
    img.style.left = "100px"; img.style.top = "100px";
    img.onmousedown = function(e) {
        let shiftX = e.clientX - img.getBoundingClientRect().left;
        let shiftY = e.clientY - img.getBoundingClientRect().top;
        function moveAt(pageX, pageY) {
            const stage = document.getElementById("stage-zone").getBoundingClientRect();
            img.style.left = (pageX - stage.left - shiftX) + 'px';
            img.style.top = (pageY - stage.top - shiftY) + 'px';
        }
        function onMouseMove(event) { moveAt(event.pageX, event.pageY); }
        document.addEventListener('mousemove', onMouseMove);
        img.onmouseup = function() { document.removeEventListener('mousemove', onMouseMove); };
    };
    img.ondragstart = () => false;
    document.getElementById("stage-zone").appendChild(img);
}

function lift(el) {
    document.querySelectorAll('.drawer-hardware').forEach(d => d.classList.remove('active-lift'));
    el.classList.add('active-lift');
}
