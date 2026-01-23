<script>
// --- GLOBAL STATE ---
const state = {
    selectedRoom: null,
    placedItems: [],
    categories: {
        seating: ['sofa_modern.png', 'armchair_velvet.png', 'dining_chair_set.png'],
        storage: ['storage_shelf.png', 'storage_grnshelf.png', 'storage_dresser_drkbrn.png'],
        beds: ['king_bed_frame.png', 'twin_guest_bed.png'],
        tables: ['dining_table_oak.png', 'coffee_table_glass.png'],
        rugs: ['rug_persian.png', 'rug_modern_grey.png'],
        lamps: ['floor_lamp_brass.png', 'desk_lamp_vintage.png']
    }
};

const workspace = document.getElementById('main-workspace');
const cabContent = document.getElementById('cab-content');
const mainRoom = document.getElementById('main-room');
const fan = document.getElementById('global-fan');
const subFan = document.getElementById('sub-fan');
const decorFan = document.getElementById('decor-fan');
const dropZone = document.getElementById('drop-zone');
const tooltip = document.getElementById('shop-tooltip');

// --- NAVIGATION & FANS ---
function handleRoomsClick() {
    workspace.classList.add('active-glide');
    cabContent.innerHTML = `
        <div class="drawer-tab drw-1" onclick="selectRoom('livingroom.jpg', this)"><div class="plate-style">Living Room</div></div>
        <div class="drawer-tab drw-2" onclick="selectRoom('bedroom.jpg', this)"><div class="plate-style">Bedroom</div></div>
        <div class="drawer-tab drw-3" onclick="selectRoom('diningroom.jpg', this)"><div class="plate-style">Dining Room</div></div>
        <div class="drawer-tab drw-upload" onclick="triggerUpload()"><div class="plate-style">Upload Your Room</div></div>
    `;
}

function selectRoom(src, el) {
    if(src) mainRoom.src = src;
    mainRoom.style.display = 'block';
    document.querySelectorAll('.drawer-tab').forEach(d => d.classList.remove('opened'));
    el.classList.add('opened');
    
    fan.classList.remove('active', 'sub-active');
    subFan.classList.remove('active');
    
    const rect = el.getBoundingClientRect();
    const anchorRect = document.getElementById('cab-anchor').getBoundingClientRect();
    fan.style.top = (rect.top - anchorRect.top + (rect.height / 2) - 150) + 'px';
    fan.style.left = (rect.right - anchorRect.left - 45) + 'px';
    setTimeout(() => { fan.classList.add('active'); }, 50);
}

function toggleDecorFan() { decorFan.classList.toggle('active'); }

function openSubFan(cat) {
    fan.classList.add('sub-active');
    subFan.classList.remove('active');
    subFan.style.top = fan.style.top;
    subFan.style.left = (parseInt(fan.style.left) + 60) + 'px'; 

    const blades = document.querySelectorAll('.sub-blade');
    const items = state.categories[cat] || [];
    
    blades.forEach((b, i) => {
        if(items[i]) {
            // Mapping purchase links based on filename (example logic)
            const storeUrl = `https://yourstore.com/products/${items[i].split('.')[0]}`;
            b.innerHTML = `<img src="${items[i]}" class="furn-item-img" draggable="true" 
                           ondragstart="drag(event)" data-link="${storeUrl}" data-name="${items[i]}">`;
        } else {
            b.innerHTML = ""; // Clear unused blades
        }
    });
    setTimeout(() => { subFan.classList.add('active'); }, 50);
}

// --- DRAG & DROP + SHOPPING ---
function drag(ev) { 
    ev.dataTransfer.setData("text", ev.target.src); 
    ev.dataTransfer.setData("link", ev.target.dataset.link);
    ev.dataTransfer.setData("name", ev.target.dataset.name);
}

dropZone.ondragover = (ev) => ev.preventDefault();
dropZone.ondrop = (ev) => {
    ev.preventDefault();
    const src = ev.dataTransfer.getData("text");
    const link = ev.dataTransfer.getData("link");
    const name = ev.dataTransfer.getData("name");
    const rect = dropZone.getBoundingClientRect();
    
    const item = document.createElement("img");
    item.src = src;
    item.className = "placed-furniture";
    item.style.left = (ev.clientX - rect.left - 50) + "px";
    item.style.top = (ev.clientY - rect.top - 50) + "px";
    
    // Clicking item opens the shop tooltip
    item.onclick = (e) => {
        e.stopPropagation();
        tooltip.style.display = 'block';
        tooltip.style.left = item.style.left;
        tooltip.style.top = (parseInt(item.style.top) - 60) + "px";
        document.getElementById('item-name').innerText = name.replace('.png', '').replace(/_/g, ' ');
        document.getElementById('buy-link').href = link;
    };

    item.onmousedown = (e) => startMove(e, item);
    dropZone.appendChild(item);
};

function startMove(e, el) {
    let sX = e.clientX - el.getBoundingClientRect().left;
    let sY = e.clientY - el.getBoundingClientRect().top;
    function move(ev) {
        let rect = dropZone.getBoundingClientRect();
        el.style.left = (ev.pageX - rect.left - sX) + 'px';
        el.style.top = (ev.pageY - rect.top - sY) + 'px';
    }
    document.addEventListener('mousemove', move);
    el.onmouseup = () => document.removeEventListener('mousemove', move);
}

// --- SAVE SYSTEM ---
function toggleSavePanel() { document.getElementById('save-panel').classList.toggle('open'); }

function saveCurrentDesign() {
    const items = Array.from(document.querySelectorAll('.placed-furniture')).map(el => ({
        src: el.src, x: el.style.left, y: el.style.top
    }));
    const designName = "Design " + new Date().toLocaleTimeString();
    localStorage.setItem(designName, JSON.stringify({room: mainRoom.src, items}));
    renderSavedList();
}

function renderSavedList() {
    const list = document.getElementById('saved-list');
    list.innerHTML = "";
    Object.keys(localStorage).forEach(key => {
        const btn = document.createElement('button');
        btn.innerText = key;
        btn.onclick = () => loadDesign(key);
        list.appendChild(btn);
    });
}

function loadDesign(key) {
    const data = JSON.parse(localStorage.getItem(key));
    mainRoom.src = data.room;
    mainRoom.style.display = 'block';
    document.querySelectorAll('.placed-furniture').forEach(n => n.remove());
    data.items.forEach(d => {
        const img = document.createElement('img');
        img.src = d.src; img.className = "placed-furniture";
        img.style.left = d.x; img.style.top = d.y;
        img.onmousedown = (e) => startMove(e, img);
        dropZone.appendChild(img);
    });
}

// Close tooltip when clicking stage
dropZone.onclick = () => tooltip.style.display = 'none';
renderSavedList();
</script>
