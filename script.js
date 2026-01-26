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
            fanSystem.style.top = '60px'; 
        }
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
            
            // Hover Preview Logic
            if (data.name !== 'Upload') {
                drawer.onmouseenter = () => {
                    roomImg.src = data.file;
                    roomImg.style.display = 'block';
                };
                drawer.onmouseleave = () => {
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
    
    // The Big 5
    const items = ['Lighting', 'Rugs', 'Plants', 'Curtains', 'Extras']; 

    items.forEach((item, i) => {
        const blade = document.createElement('div');
        blade.className = `swatch-blade s-${i + 1}`;
        
        blade.onclick = () => {
            const catKey = item.toLowerCase();
            // Try to open the catalog for this category
            showCatalog();
            const catItems = document.querySelectorAll('#cat-col .index-item');
            catItems.forEach(el => {
                if(el.innerText.toLowerCase() === catKey) selectCat(catKey, el);
            });
        };

        blade.innerHTML = `<div class="fan-text">${item}</div>`;
        fanSystem.appendChild(blade);
    });

    setTimeout(() => {
        fanSystem.classList.add('active-fan');
    }, 100);
}
