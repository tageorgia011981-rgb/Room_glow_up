const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');
const fanSystem = document.getElementById('fan-system'); 
const previewBox = document.getElementById('hover-preview');
const previewImg = document.getElementById('preview-img');
const previewLabel = document.getElementById('preview-label');

const catalogData = {
    seating: { 'couches': [{ img: 'couch1.png' }], 'armchairs': [{ img: 'chair1.png' }] },
    tables: { 'dining': [{ img: 'table1.png' }] },
    rugs: { 
        'area rugs': [
            { img: 'rug1.png' }, { img: 'rug2.png' }, { img: 'rug3.png' },
            { img: 'rug4.png' }, { img: 'rug5.png' }, { img: 'rug6.png' }
        ]
    }
};

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
            const b = document.createElement('div');
            b.className = `swatch-blade s-${i + 1}`;
            
            const imgEl = document.createElement('img');
            imgEl.src = item.img;
            imgEl.className = "fan-img-fill";

            imgEl.onmouseenter = (e) => {
                previewBox.style.display = 'block';
                previewImg.src = item.img;
                previewLabel.innerText = `${type} #${i+1}`;
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

function addToRoom(src) {
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.left = "100px"; wrapper.style.top = "100px";
    
    const img = document.createElement("img");
    img.src = src;
    img.style.width = "250px"; 
    
    // DRAG LOGIC
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
