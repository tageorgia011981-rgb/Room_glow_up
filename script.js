const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const drawerStack = document.getElementById('drawer-anchor');
const fanSystem = document.getElementById('fan-system'); 
const previewBox = document.getElementById('hover-preview');
const previewImg = document.getElementById('preview-img');
const previewLabel = document.getElementById('preview-label');

const catalogData = {
    seating: { 'Couches': [{ img: 'couch1.png' }], 'Chairs': [{ img: 'chair1.png' }] },
    tables: { 'Dining': [{ img: 'table1.png' }] }
};

const decorData = { 
    'RUGS': [{ img: 'rug1.png' }, { img: 'rug2.png' }, { img: 'rug3.png' }, { img: 'rug4.png' }, { img: 'rug5.png' }, { img: 'rug6.png' }],
    'PLANTS': [{ img: 'plant1.png' }],
    'CURTAINS': [{ img: 'curtain1.png' }],
    'MISC': [{ img: 'candle1.png' }, { img: 'frame1.png' }]
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
                    <div class="plate-style"><span class="label-text">${name}</span></div>
                    <div class="lip-pull"></div>
                </div>
            </div>`;
    });
}

function openDecorFan(el) {
    fanSystem.classList.remove('active-fan');
    fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
    
    setTimeout(() => {
        const dRect = el.getBoundingClientRect();
        fanSystem.style.top = dRect.bottom + 'px';
        fanSystem.style.left = dRect.left + 'px';

        Object.keys(decorData).forEach((cat, i) => {
            const b = document.createElement('div');
            b.className = `swatch-blade s-${i + 1}`;
            b.innerHTML = `<div class="fan-text" onclick="showDecorItems('${cat}')">${cat}</div>`;
            fanSystem.appendChild(b);
        });
        fanSystem.classList.add('active-fan');
    }, 100);
}

function showDecorItems(cat) {
    fanSystem.classList.remove('active-fan');
    setTimeout(() => {
        fanSystem.innerHTML = '<div class="pivot-bolt"></div>';
        decorData[cat].forEach((item, i) => {
            const b = document.createElement('div');
            b.className = `swatch-blade s-${i + 1}`;
            const imgEl = document.createElement('img');
            imgEl.src = item.img;
            imgEl.className = "fan-img-fill";

            imgEl.onmouseenter = () => {
                previewBox.style.display = 'block';
                previewImg.src = item.img;
                previewLabel.innerText = `${cat} Selection #${i+1}`;
            };
            imgEl.onmousemove = (e) => {
                previewBox.style.left = (e.clientX + 20) + 'px';
                previewBox.style.top = (e.clientY - 120) + 'px';
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
    wrapper.style.left = "50%"; wrapper.style.top = "50%";
    
    const img = document.createElement("img");
    img.src = src;
    img.style.width = src.includes('rug') ? "400px" : "200px";
    img.style.zIndex = src.includes('rug') ? "1" : "10";

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
