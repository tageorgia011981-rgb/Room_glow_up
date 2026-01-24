/* --- GLOBAL VARIABLES --- */
const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');
const fanAssembly = document.getElementById('fan-assembly');

/* --- CATALOG REGISTRY --- */
const registry = {
    furniture: {
        seating: [{name: 'Sofa', img: 'couch1.png'}, {name: 'Chair', img: 'chair1.png'}],
        tables: [{name: 'Desk', img: 'table1.png'}, {name: 'Dining Table', img: 'table2.png'}],
        storage: [{name: 'Dresser', img: 'dresser1.png'}, {name: 'Cabinet', img: 'cabinet1.png'}]
    },
    decor: {
        lighting: [{name: 'Floor Lamp', img: 'lamp1.png'}, {name: 'Sconce', img: 'sconce1.png'}],
        rugs: [{name: 'Persian Rug', img: 'rug1.png'}, {name: 'Modern Mat', img: 'rug2.png'}]
    }
};

/* --- TAB CLICK HANDLER --- */
function openMode(mode) {
    // 1. Slide the cabinet OUT (Visible)
    cab.classList.add('cabinet-visible');
    
    // 2. Clear previous drawers
    drawerStack.innerHTML = '';
    
    // 3. GENERATE DRAWERS BASED ON MODE
    if (mode === 'rooms') {
        // ROOMS MODE: HOVER to change image
        ['Living Room', 'Bedroom', 'Dining Room'].forEach(r => {
            const file = r.toLowerCase().replace(' ', '') + '.jpg';
            drawerStack.innerHTML += `
                <div class="drawer-zone" onmouseover="setRoom('${file}')">
                   </div>`;
        });
    } 
    else {
        // FURNITURE/DECOR MODE: CLICK to drop Fan
        const categories = mode === 'furniture' 
            ? ['seating', 'tables', 'storage'] 
            : ['lighting', 'rugs', 'art'];
            
        categories.forEach(cat => {
            drawerStack.innerHTML += `
                <div class="drawer-zone" onclick="openFan('${cat}')"></div>`;
        });
    }
}

/* --- THE FAN LOGIC --- */
function openFan(category) {
    // Inventory definition
    const inventory = {
        seating: ['couch1.png', 'chair1.png', 'bench1.png'],
        tables: ['table1.png', 'desk1.png', 'coffee.png'],
        storage: ['shelf.png', 'dresser1.png', 'box.png'],
        lighting: ['lamp1.png', 'lamp2.png'],
        rugs: ['rug1.png', 'rug2.png'],
        art: ['paint1.png', 'paint2.png']
    };

    // Get items for the clicked category
    const items = inventory[category] || []; 
    
    // Reset Fan (Pull it up first if it's already down)
    fanAssembly.classList.remove('active-fan');
    fanAssembly.innerHTML = ''; 
    
    // Create Blades
    items.forEach((item, i) => {
        const blade = document.createElement('div');
        blade.className = 'fan-blade';
        // Fan out the blades
        blade.style.transform = `rotate(${i * 45}deg) translateX(140px)`;
        
        // Label/Image on blade
        const label = item.split('.')[0];
        blade.innerHTML = `<div class="blade-label" onclick="addToRoom('${item}')">${label}</div>`;
        
        fanAssembly.appendChild(blade);
    });

    // Drop the fan down (slight delay to allow reset)
    setTimeout(() => {
        fanAssembly.classList.add('active-fan');
    }, 50);
}

/* --- ROOM & ITEM LOGIC --- */
function setRoom(src) { 
    roomImg.src = src; 
    roomImg.style.display = 'block'; 
}

function addToRoom(src) {
    const img = document.createElement("img");
    img.src = src; 
    img.className = "placed-item";
    img.style.left = "100px"; 
    img.style.top = "100px";
    
    // Drag Logic
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
    hideCatalog(); 
    
    // Retract fan after picking item (Optional - keeps it clean)
    fanAssembly.classList.remove('active-fan');
}

/* --- VISUAL LIFT EFFECT --- */
function lift(el) { 
    document.querySelectorAll('.drawer-hardware').forEach(d => d.classList.remove('active-lift')); 
    el.classList.add('active-lift'); 
}

/* --- CATALOG OVERLAY LOGIC --- */
function showCatalog() { document.getElementById('catalog-overlay').style.display = 'block'; }
function hideCatalog() { document.getElementById('catalog-overlay').style.display = 'none'; }

function selectCat(cat, el) {
    document.querySelectorAll('#cat-col .index-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    const list = document.getElementById('type-list');
    list.innerHTML = '';
    if(registry[cat]) {
        Object.keys(registry[cat]).forEach(type => {
            list.innerHTML += `<div class="index-item" onclick="selectType('${cat}', '${type}', this)">${type}</div>`;
        });
    }
}

function selectType(cat, type, el) {
    document.querySelectorAll('#type-col .index-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    const grid = document.getElementById('asset-list');
    grid.innerHTML = '';
    if(registry[cat] && registry[cat][type]) {
        registry[cat][type].forEach(item => {
            grid.innerHTML += `
                <div class="asset-card">
                    <img src="${item.img}">
                    <p>${item.name}</p>
                    <button class="buy-btn" onclick="addToRoom('${item.img}')">ADD</button>
                </div>`;
        });
    }
}
