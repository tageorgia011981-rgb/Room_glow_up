const roomImg = document.getElementById('room-display');
    const cab = document.getElementById('cab-container');
    const drawerStack = document.getElementById('drawer-anchor');
    const fanSystem = document.getElementById('fan-system'); 
    const fileInput = document.getElementById('file-upload');
    let currentLockedRoom = null; 
    let shoppingList = [];

    const iconMap = {
        'seating': 'iconseating.png', 'tables': 'icontable.png', 'storage': 'iconstorage.png', 'beds': 'iconbeds.png'
    };

    const catalogData = {
        seating: { 
            couches: [ { id: 'SF-001', img: 'couch1.png', price: 1200, link: 'https://google.com' }, { id: 'SF-002', img: 'couch2.png', price: 950, link: 'https://google.com' } ],
            chairs: [ { id: 'CH-101', img: 'chair1.png', price: 300, link: 'https://google.com' }, { id: 'CH-102', img: 'chair3.png', price: 250, link: 'https://google.com' } ]
        },
        tables: { 
            coffee: [ { id: 'TB-200', img: 'coffeetable.png', price: 450, link: 'https://google.com' } ],
            dining: [ { id: 'TB-300', img: 'table2.png', price: 800, link: 'https://google.com' } ]
        },
        storage: { 
            shelves: [ { id: 'ST-500', img: 'shelf1.png', price: 150, link: 'https://google.com' } ]
        },
        beds: {
            king: [ { id: 'BD-100', img: 'bed1.png', price: 900, link: '' } ]
        }
    };
    
    // DECOR DATA
    const decorData = {
        'Lighting': [ { id: 'LT-01', img: 'lamp1.png', price: 120, link: '' }, { id: 'LT-02', img: 'lamp2.png', price: 90, link: '' } ],
        'Rugs': [ { id: 'RG-01', img: 'rug1.png', price: 200, link: '' } ],
        'Art': [ { id: 'AR-01', img: 'art1.png', price: 500, link: '' } ],
        'Decor': [ { id: 'DC-01', img: 'plant.png', price: 40, link: '' } ]
    };

    function openMode(mode, el) {
        fanSystem.classList.remove('active-fan'); fanSystem.innerHTML = ''; hideOverlays();
        if (mode === 'decor') {
            cab.classList.remove('cabinet-visible');
            if(el) {
                const rect = el.getBoundingClientRect();
                const workspaceRect = document.querySelector('.workspace').getBoundingClientRect();
                const leftPos = (rect.left - workspaceRect.left) + (rect.width/2);
                fanSystem.style.left = leftPos + 'px'; fanSystem.style.top = '-60px'; 
            }
            setTimeout(() => { openDecorFan(); }, 100);
        } else if (mode === 'rooms') {
            cab.classList.add('cabinet-visible'); drawerStack.innerHTML = ''; fanSystem.classList.remove('fan-down');
            const rooms = [
                { name: 'Living Room',  file: 'livingroom2.jpg' }, { name: 'Bedroom', file: 'bedroom.jpg' },
                { name: 'Dining Room',  file: 'diningroom.jpg' }, { name: 'Upload', file: 'upload' }
            ];
            rooms.forEach(data => {
                let clickAction = data.name === 'Upload' ? "triggerUpload()" : `selectRoom('${data.file}', this)`;
                let textColor = data.name === 'Upload' ? "color:#d00;" : "";
                drawerStack.innerHTML += `<div class="drawer-zone" onclick="${clickAction}"><div class="drawer-hardware"><div class="plate-style" style="${textColor}">${data.name}</div><div class="lip-pull"></div></div></div>`;
            });
        }
    }

    /* --- STAGE 1: ICONS --- */
    function selectRoom(src, el) {
        currentLockedRoom = src; roomImg.src = src; roomImg.style.display = 'block'; 
        fanSystem.classList.remove('fan-down'); fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        if(el) {
            const drawerRect = el.getBoundingClientRect();
            const workspaceRect = document.querySelector('.workspace').getBoundingClientRect();
            // TUCKED IN FURTHER (-140px)
            fanSystem.style.top = (drawerRect.top - workspaceRect.top + 25) + 'px';
            fanSystem.style.left = (drawerRect.right - workspaceRect.left - 140) + 'px';
        }
        const categories = Object.keys(catalogData); 
        fanSystem.classList.remove('active-fan');
        setTimeout(() => {
            categories.forEach((cat, i) => {
                const blade = document.createElement('div');
                blade.className = `swatch-blade s-${i + 1}`;
                const icon = iconMap[cat] || 'couch1.png';
                blade.innerHTML = `<img src="${icon}" class="fan-icon" onclick="showSubtypes('${cat}')">`;
                fanSystem.appendChild(blade);
            });
            setTimeout(() => { fanSystem.classList.add('active-fan'); }, 50);
        }, 50);
    }

    /* --- STAGE 2: TEXT --- */
    function showSubtypes(category) {
        fanSystem.classList.remove('active-fan');
        const types = Object.keys(catalogData[category]);
        setTimeout(() => {
            fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
            types.forEach((type, i) => {
                const blade = document.createElement('div');
                blade.className = `swatch-blade s-${i + 1}`;
                blade.innerHTML = `<div class="fan-text" onclick="showItems('${category}', '${type}')">${type}</div>`;
                fanSystem.appendChild(blade);
            });
            setTimeout(() => { fanSystem.classList.add('active-fan'); }, 50);
        }, 600);
    }

    /* --- STAGE 3: FURNITURE --- */
    function showItems(category, type) {
        fanSystem.classList.remove('active-fan');
        const items = catalogData[category][type].slice(0, 4);
        setTimeout(() => {
            fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
            items.forEach((item, i) => {
                const blade = document.createElement('div');
                blade.className = `swatch-blade s-${i + 1}`;
                blade.innerHTML = `<img src="${item.img}" class="fan-icon" onclick="addToRoom('${item.img}')">`;
                fanSystem.appendChild(blade);
            });
            setTimeout(() => { fanSystem.classList.add('active-fan'); }, 50);
        }, 600);
    }

    /* --- DECOR FAN (FIXED DRILL DOWN) --- */
    function openDecorFan() {
        fanSystem.classList.add('fan-down'); fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        const items = Object.keys(decorData); 
        fanSystem.classList.remove('active-fan');
        setTimeout(() => {
            items.forEach((item, i) => {
                const blade = document.createElement('div');
                blade.className = `swatch-blade s-${i + 1}`;
                // Now drills down to showDecorItems
                blade.innerHTML = `<div class="fan-text" onclick="showDecorItems('${item}')">${item}</div>`;
                fanSystem.appendChild(blade);
            });
            setTimeout(() => { fanSystem.classList.add('active-fan'); }, 50);
        }, 50);
    }
    
    function showDecorItems(category) {
        fanSystem.classList.remove('active-fan');
        const items = decorData[category] || [];
        setTimeout(() => {
            fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
            items.forEach((item, i) => {
                const blade = document.createElement('div');
                blade.className = `swatch-blade s-${i + 1}`;
                blade.innerHTML = `<img src="${item.img}" class="fan-icon" onclick="addToRoom('${item.img}')">`;
                fanSystem.appendChild(blade);
            });
            setTimeout(() => { fanSystem.classList.add('active-fan'); }, 50);
        }, 600);
    }

    /* --- MANIFEST LOGIC --- */
    function addToManifest(id, price, link) {
        shoppingList.push({ id: id, price: price, link: link });
        alert("Item added to Manifest!");
        renderManifest();
    }
    function toggleManifestView() {
        const shop = document.getElementById('shop-view');
        const manifest = document.getElementById('manifest-view');
        const btn = document.querySelector('.manifest-toggle');
        if (shop.style.display === 'none') {
            shop.style.display = 'flex'; manifest.style.display = 'none'; btn.innerText = "[ View Manifest ]";
        } else {
            shop.style.display = 'none'; manifest.style.display = 'flex'; manifest.style.flexDirection = 'column'; btn.innerText = "[ Back to Shop ]"; renderManifest();
        }
    }
    function renderManifest() {
        const container = document.getElementById('manifest-list-container'); container.innerHTML = '';
        let total = 0;
        shoppingList.forEach(item => {
            total += item.price;
            container.innerHTML += `<div class="receipt-item"><span>${item.id}</span><span>$${item.price}</span></div>`;
        });
        document.getElementById('manifest-total').innerText = `Total: $${total}`;
    }

    function showCatalog() { hideOverlays(); document.getElementById('catalog-overlay').style.display = 'block'; }
    function showLookBook() { hideOverlays(); document.getElementById('lookbook-overlay').style.display = 'block'; renderLookbook(); }
    function hideOverlays() { 
        document.getElementById('catalog-overlay').style.display = 'none'; document.getElementById('lookbook-overlay').style.display = 'none';
    }
    
    function addToRoom(src) {
        hideOverlays(); 
        const img = document.createElement("img");
        img.src = src; img.className = "placed-item"; img.style.left = "200px"; img.style.top = "200px";
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
    
    function lift(el) { document.querySelectorAll('.drawer-hardware').forEach(d => d.classList.remove('active-lift')); el.classList.add('active-lift'); }
    function triggerUpload() { fileInput.click(); }
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) { selectRoom(e.target.result, null); }
            reader.readAsDataURL(file);
        }
    });

    let lookPage = 1;
    function changeLookPage(dir) { lookPage += dir; if(lookPage < 1) lookPage = 1; if(lookPage > 2) lookPage = 2; renderLookbook(); }
    function renderLookbook() {
        const grid = document.getElementById('look-grid'); grid.innerHTML = '';
        const start = (lookPage - 1) * 8 + 1; const end = start + 7;
        for(let i=start; i<=end; i++) { grid.innerHTML += `<div class="look-card"><img src="insp${i}.jpg" onerror="this.src='cabinet.png'"></div>`; }
    }
    
    function selectCat(cat, el) {
        document.querySelectorAll('#cat-col .index-item').forEach(i => i.classList.remove('selected'));
        if(el) el.classList.add('selected');
        const list = document.getElementById('type-list'); list.innerHTML = '';
        if(catalogData[cat]) {
            Object.keys(catalogData[cat]).forEach(type => {
                list.innerHTML += `<div class="index-item" onclick="selectType('${cat}', '${type}', this)">${type}</div>`;
            });
        }
    }
    function selectType(cat, type, el) {
        document.querySelectorAll('#type-col .index-item').forEach(i => i.classList.remove('selected'));
        if(el) el.classList.add('selected');
        const grid = document.getElementById('asset-list'); grid.innerHTML = '';
        if(catalogData[cat] && catalogData[cat][type]) {
            catalogData[cat][type].forEach(item => {
                grid.innerHTML += `<div class="asset-card"><span class="item-code">${item.id}</span><img src="${item.img}"><div class="item-price">$${item.price}</div><div class="btn-row"><button class="shop-btn" onclick="addToManifest('${item.id}', ${item.price}, '${item.link}')">Add List</button><button class="add-btn" onclick="addToRoom('${item.img}')">Add Room</button></div></div>`;
            });
        }
    }
    function searchCatalog(query) {
        const grid = document.getElementById('asset-list'); grid.innerHTML = ''; query = query.toLowerCase();
        Object.keys(catalogData).forEach(cat => {
            Object.keys(catalogData[cat]).forEach(type => {
                catalogData[cat][type].forEach(item => {
                    if(item.id.toLowerCase().includes(query) || type.includes(query)) {
                        grid.innerHTML += `<div class="asset-card"><span class="item-code">${item.id}</span><img src="${item.img}"><div class="item-price">$${item.price}</div><div class="btn-row"><button class="shop-btn" onclick="addToManifest('${item.id}', ${item.price}, '${item.link}')">Add List</button><button class="add-btn" onclick="addToRoom('${item.img}')">Add Room</button></div></div>`;
                    }
                });
            });
        });
    }
