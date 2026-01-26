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
    // Reset any active fans first
    fanSystem.classList.remove('active-fan');
    fanSystem.innerHTML = ''; 
    hideOverlays();

    if (mode === 'decor') {
        cab.classList.remove('cabinet-visible');
        if(el) {
            // Anchor the fan directly under the Decor tab
            const rect = el.getBoundingClientRect();
            const workspaceRect = document.querySelector('.workspace').getBoundingClientRect();
            const leftPos = rect.left - workspaceRect.left + (rect.width / 2);
            
            fanSystem.style.left = leftPos + 'px';
            fanSystem.style.top = '60px'; // Positions it just under the nav hardware
        }
        // Small delay to let the DOM settle before fanning out
        setTimeout(openDecorFan, 50);

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
            const drawer = document.createElement('div');
            drawer.className = 'drawer-zone';
            
            // --- INSTANT PREVIEW & GLOW ---
            if (data.name !== 'Upload') {
                drawer.onmouseenter = () => {
                    roomImg.src = data.file;
                    roomImg.style.display = 'block';
                };
                drawer.onmouseleave = () => {
                    // Reverts to the clicked room, or hides if none selected
                    if (currentLockedRoom) {
                        roomImg.src = currentLockedRoom;
                    } else {
                        roomImg.style.display = 'none';
                    }
                };
            }

            drawer.onclick = () => { 
                if(data.name === 'Upload') {
                    triggerUpload();
                } else {
                    selectRoom(data.file); 
                    // Add active lift state
                    document.querySelectorAll('.drawer-hardware').forEach(d => d.classList.remove('active-lift'));
                    drawer.querySelector('.drawer-hardware').classList.add('active-lift');
                }
            };

            drawer.innerHTML = `
                <div class="drawer-hardware">
                    <div class="plate-style" ${data.name === 'Upload' ? 'style="color:#d00;"' : ''}>
                        ${data.name}
                    </div>
                    <div class="lip-pull"></div>
                </div>`;
            
            drawerStack.appendChild(drawer);
        });
    }
}

function openDecorFan() {
    fanSystem.classList.add('fan-down');
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    const items = ['Lighting', 'Rugs', 'Art', 'Decor']; 

    items.forEach((item, i) => {
        const blade = document.createElement('div');
        blade.className = `swatch-blade s-${i + 1}`;
        blade.innerHTML = `<div class="fan-text" onclick="alert('${item} clicked!')">${item}</div>`;
        fanSystem.appendChild(blade);
    });

    // The "Kickstart": ensures the browser animates the rotation
    setTimeout(() => {
        fanSystem.classList.add('active-fan');
    }, 100);
}

/* --- THE REST OF YOUR UTILITIES (Kept exactly as they were) --- */

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

// Reuse your existing lift function for the top nav
function lift(el) {
    document.querySelectorAll('.drawer-hardware').forEach(d => d.classList.remove('active-lift'));
    el.classList.add('active-lift');
}
