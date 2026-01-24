const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');

const registry = {
    furniture: {
        seating: [{name: 'Sofa', img: 'couch1.png', sku: 'F-101'}, {name: 'Chair', img: 'chair1.png', sku: 'F-102'}],
        tables: [{name: 'Desk', img: 'table1.png', sku: 'T-201'}],
        storage: [{name: 'Dresser', img: 'dresser1.png', sku: 'S-301'}]
    },
    decor: {
        lighting: [{name: 'Lamp', img: 'lamp1.png', sku: 'L-401'}],
        rugs: [{name: 'Rug', img: 'rug1.png', sku: 'R-501'}]
    }
};

function openMode(mode) {
    cab.classList.add('cabinet-visible');
    drawerStack.innerHTML = '';
    if (mode === 'rooms') {
        ['Living Room', 'Bedroom', 'Dining Room'].forEach(r => {
            const fileName = r.toLowerCase().replace(' ', '') + '.jpg';
            drawerStack.innerHTML += `<div class="index-item" onclick="setRoom('${fileName}')">${r}</div>`;
        });
    }
}

function showCatalog() { document.getElementById('catalog-overlay').style.display = 'block'; }
function hideCatalog() { document.getElementById('catalog-overlay').style.display = 'none'; }

function selectCat(cat, el) {
    document.querySelectorAll('#cat-col .index-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    const list = document.getElementById('type-list');
    list.innerHTML = '';
    Object.keys(registry[cat]).forEach(type => {
        list.innerHTML += `<div class="index-item" onclick="selectType('${cat}', '${type}', this)">${type}</div>`;
    });
}

function selectType(cat, type, el) {
    document.querySelectorAll('#type-col .index-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    const grid = document.getElementById('asset-list');
    grid.innerHTML = '';
    registry[cat][type].forEach(item => {
        grid.innerHTML += `
            <div class="asset-card">
                <img src="${item.img}">
                <p>${item.name}</p>
                <button class="buy-btn" onclick="addToRoom('${item.img}')">ADD</button>
            </div>`;
    });
}

function setRoom(src) { roomImg.src = src; roomImg.style.display = 'block'; }

function addToRoom(src) {
    const img = document.createElement("img");
    img.src = src; img.className = "placed-item";
    img.style.left = "50px"; img.style.top = "50px";
    img.onmousedown = function(e) {
        let shiftX = e.clientX - img.getBoundingClientRect().left;
        let shiftY = e.clientY - img.getBoundingClientRect().top;
        function moveAt(pageX, pageY) {
            const rect = document.getElementById("stage-zone").getBoundingClientRect();
            img.style.left = (pageX - rect.left - shiftX) + 'px';
            img.style.top = (pageY - rect.top - shiftY) + 'px';
        }
        document.addEventListener('mousemove', onMouseMove);
        function onMouseMove(event) { moveAt(event.pageX, event.pageY); }
        img.onmouseup = function() { document.removeEventListener('mousemove', onMouseMove); };
    };
    img.ondragstart = () => false;
    document.getElementById("stage-zone").appendChild(img);
    hideCatalog();
}

function lift(el) { 
    document.querySelectorAll('.vintage-tabs .drawer-hardware').forEach(d => d.classList.remove('active-lift')); 
    el.classList.add('active-lift'); 
}
