const roomImg = document.getElementById('room-display');
const cab = document.getElementById('cab-container');
const stage = document.getElementById('stage-zone');
const drawerStack = document.getElementById('drawer-anchor');

const archiveData = {
    'SEATING': ['COUCH', 'CHAIR', 'BENCH', 'STOOL'],
    'TABLES': ['COFFEE', 'END', 'DINING'],
    'STORAGE': ['DRESSERS', 'NIGHTSTANDS', 'CABINET', 'BUFFETT'],
    'BEDS': 'DIRECT'
};

function openMode(mode) {
    cab.classList.remove('cabinet-visible');
    stage.classList.remove('stage-slid');
    const box = document.getElementById('archive-box');
    if(box) box.style.bottom = '-650px';

    if (mode === 'rooms') {
        cab.classList.add('cabinet-visible');
        stage.classList.add('stage-slid');
        drawerStack.innerHTML = '';
        const rooms = [
            { name: 'Living Room', file: 'livingroom2.jpg' }, 
            { name: 'Bedroom', file: 'bedroom.jpg' },
            { name: 'Dining Room', file: 'diningroom.jpg' }
        ];
        rooms.forEach(data => {
            drawerStack.innerHTML += `
                <div class="drawer-zone" onclick="selectRoom('${data.file}')">
                    <div class="drawer-hardware">
                        <div class="plate-style">${data.name}</div>
                    </div>
                </div>`;
        });
    }
}

function selectRoom(src) { 
    roomImg.src = src; 
    roomImg.style.display = 'block'; 
    // AUTO-OPEN ARCHIVE ON ROOM SELECT
    setTimeout(openArchiveBox, 500); 
}

function openArchiveBox() {
    if (roomImg.style.display !== 'block') return;
    let box = document.getElementById('archive-box');
    if (!box) { 
        box = document.createElement('div'); 
        box.id = "archive-box"; 
        document.body.appendChild(box); 
    }
    renderArchiveTier(1);
    setTimeout(() => { box.style.bottom = "0px"; }, 10);
}

function renderArchiveTier(tier, parent = null) {
    const box = document.getElementById('archive-box');
    let items = (tier === 1) ? Object.keys(archiveData) : (tier === 2) ? archiveData[parent] : [1, 2, 3, 4, 5];
    let html = `<div onclick="document.getElementById('archive-box').style.bottom='-650px'" style="position:absolute; top:20px; right:40px; color:#8e9196; cursor:pointer; font-weight:bold;">[ CLOSE ]</div>`;
    
    html += `<div style="display:flex; width:100%; height:100%; align-items:flex-end; padding-left:40px;">`;
    items.forEach((item, i) => {
        const labelName = (tier === 3) ? `REF: ${parent.substring(0,3)}-${item}` : item;
        const clickAction = (tier === 1) ? (archiveData[item] === 'DIRECT' ? `renderArchiveTier(3, '${item}')` : `renderArchiveTier(2, '${item}')`) : (tier === 2 ? `renderArchiveTier(3, '${item}')` : `alert('Placed')`);
        html += `<div class="archive-folder-wrapper" style="z-index:${i};">
            <div class="folder-label" onclick="${clickAction}"><div class="label-text">${labelName}</div></div>
            <div class="folder-body">${tier === 3 ? `<div style="width:100%; height:180px; background:rgba(255,255,255,0.1); border:1px dashed #000; margin-top:50px;"></div><button style="width:100%; margin-top:20px; height:45px; background:black; color:white; border:1px solid #8e9196; cursor:pointer; font-family:'Special Elite';">PLACE PIECE</button>` : ''}</div>
        </div>`;
    });
    box.innerHTML = html;
}
