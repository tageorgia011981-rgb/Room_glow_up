// --- 1. GLOBAL ELEMENTS ---
const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');
const fanSystem = document.getElementById('fan-system'); 
const previewBox = document.getElementById('hover-preview');
const previewImg = document.getElementById('preview-img');
const previewLabel = document.getElementById('preview-label');

// --- 2. THE INVENTORY ---
const catalogData = {
    seating: { 'couches': [{ img: 'couch1.png' }], 'armchairs': [{ img: 'chair1.png' }] },
    tables: { 'dining': [{ img: 'table1.png' }] },
    storage: { 'cabinets': [{ img: 'cab1.png' }] }
};

const decorData = { 
    'LIGHTING': [{ img: 'lamp1.png' }], 
    'RUGS': [
        { img: 'rug1.png' }, { img: 'rug2.png' }, { img: 'rug3.png' }, 
        { img: 'rug4.png' }, { img: 'rug5.png' }, { img: 'rug6.png' }
    ],
    'ART': [{ img: 'art1.png' }],
    'PLANTS': [{ img: 'plant1.png' }]
};

// --- 3. CABINET / FURNITURE LOGIC ---
function openMode(mode, el) {
    cab.classList.add('cabinet-visible');
    drawerStack.innerHTML = '';
    const items = mode === 'rooms' ? ['Living Room', 'Bedroom', 'Kitchen'] : Object.keys(catalogData);
    
    items.forEach(name => {
        let action = mode === 'rooms' ? `selectRoom('room.jpg', this)` : `selectRoom('room.jpg', this); showSubtypes('${name}')`;
        drawerStack.innerHTML += `
            <div class="drawer-zone" onclick="${action}">
                <div class="drawer-hardware">
                    <div class="plate-style">${name}</div>
                </div>
            </div>`;
    });
}

function selectRoom(src, el) {
    roomImg.src = src;
    fanSystem.classList.remove('active-fan');
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    
    setTimeout(() => {
        const dRect = el.getBoundingClientRect();
        const wsRect = document.querySelector('.workspace').getBoundingClientRect();
        fanSystem.style.top = (dRect.top - wsRect.top + 50) + 'px';
        fanSystem.style.left = (dRect.right - wsRect.left - 30) + 'px';
        fanSystem.style.transform = "none"; // Reset from center

        Object.keys(catalogData).forEach((cat, i) => {
            const b = document.createElement('div');
            b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<div class="fan-text" onclick="showSubtypes('${cat}')">${cat}</div>`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 100);
}

function showSubtypes(cat) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        Object.keys(catalogData[cat]).forEach((type, i) => {
            const b = document.createElement('div');
            b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<div class="fan-text" onclick="showItems('${cat}', '${type}', 'furniture')">${type}</div>`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

// --- 4. DECOR FAN LOGIC (CENTERED) ---
function openDecorFan() {
    fanSystem.classList.remove('active-fan');
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    
    // Position in center of stage
    fanSystem.style.top = "50%";
    fanSystem.style.left = "50%";
    fanSystem.style.transform = "translate(-50%, -50%)";

    Object.keys(decorData).forEach((cat, i) => {
        const b = document.createElement('div');
        b.className = `swatch-blade s-${i + 1}`;
        b.innerHTML = `<div class="fan-text" onclick="showItems('${cat}', null, 'decor')">${cat}</div>`;
        fanSystem.appendChild(b);
    });
    
    setTimeout(() => fanSystem.classList.add('active-fan'), 50);
}

// --- 5. UNIVERSAL ITEM DISPLAY & HOVER ---
function showItems(cat, type, source) {
    fanSystem.classList.remove('active-fan');
    const dataSet = (source === 'decor') ? decorData[cat] : catalogData[cat][type];

    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        dataSet.forEach((item, i) => {
            const b = document.createElement('div');
            b.className = `swatch-blade s-${i + 1}`;
            
            const imgEl = document.createElement('img');
            imgEl.src = item.img;
            imgEl.className = "fan-img-fill";

            // Picture Box Trigger
            imgEl.onmouseenter = (e) => {
                previewBox.style.display = 'block';
                previewImg.src = item.img;
                previewLabel.innerText = `${cat} #${i + 1}`;
            };
            imgEl.onmousemove = (e) => {
                previewBox.style.left = (e.clientX + 25) + 'px';
                previewBox.style.top = (e.clientY - 150) + 'px';
            };
            imgEl.onmouseleave = () => previewBox.style.display = 'none';
            imgEl.onclick = () => addToRoom(item.img);

            b.appendChild(imgEl);
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 400);
}

// --- 6. ADD TO ROOM ---
function addToRoom(src) {
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.left = "50%"; wrapper.style.top = "50%";
    wrapper.style.cursor = "grab";
    
    const img = document.createElement("img");
    img.src = src;
    img.style.width = src.includes('rug') ? "450px" : "250px"; 
    
    // Layering: Rugs go to the back
    wrapper.style.zIndex = src.includes('rug') ? "5" : "100";

    wrapper.onmousedown = (e) => {
        let sx = e.clientX - wrapper.getBoundingClientRect().left;
        let sy = e.clientY - wrapper.getBoundingClientRect().top;
        document.onmousemove = (ev) => {
            const st = document.getElementById("stage-zone").getBoundingClientRect();
            wrapper.style.left = (ev.pageX - st.left - sx) + 'px';
            wrapper.style.top = (ev.pageY - st.top - sy) + 'px';
        };
        document.onmouseup = () => document.onmousemove = null;
    };

    wrapper.appendChild(img);
    document.getElementById("stage-zone").appendChild(wrapper);
}
