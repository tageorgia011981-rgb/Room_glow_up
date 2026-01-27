const roomImg = document.getElementById('room-display');

const archiveData = {
    'SEATING': ['COUCH', 'CHAIR', 'BENCH', 'STOOL'],
    'TABLES': ['COFFEE', 'END', 'DINING'],
    'STORAGE': ['DRESSERS', 'NIGHTSTANDS', 'CABINET', 'BUFFETT'],
    'BEDS': 'DIRECT'
};

let cycles = { living: 1, dining: 1, kitchen: 1, bedroom: 1 };

function toggleCabinet() {
    document.getElementById('cab').classList.toggle('cabinet-visible');
    document.getElementById('main-stage').classList.toggle('stage-slid');
}

function cycleRoom(cat) {
    const maxRooms = { living: 3, dining: 2, kitchen: 2, bedroom: 2 };
    cycles[cat] = (cycles[cat] % maxRooms[cat]) + 1;
    const labelMap = { living: 'Living Room', dining: 'Dining Room', kitchen: 'Kitchen', bedroom: 'Bedroom' };
    document.getElementById(`${cat}-label`).innerText = `${labelMap[cat]} ${cycles[cat]}`;
    
    let fileName = (cat === 'bedroom' ? 'bedroom' : cat === 'kitchen' ? 'kitchen' : cat + 'room');
    fileName += (cycles[cat] === 1 ? '' : cycles[cat]) + '.jpg';
    roomImg.src = fileName;
    roomImg.style.display = 'block';
}

function stageCycle() {
    if (roomImg.style.display === 'block') openArchiveBox();
}

function openArchiveBox() {
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
    let items = (tier === 1) ? Object.keys(archiveData) : 
                (tier === 2) ? archiveData[parent] : [1, 2, 3, 4, 5];

    let html = `<div onclick="document.getElementById('archive-box').style.bottom='-550px'" style="position:absolute; top:20px; right:30px; color:#8e9196; cursor:pointer; font-family:'Special Elite'; font-size:18px;">[ CLOSE ]</div>`;
    if (tier > 1) html += `<div onclick="renderArchiveTier(1)" style="position:absolute; top:20px; left:30px; color:white; cursor:pointer;">← BACK</div>`;

    items.forEach((item, i) => {
        const labelName = (tier === 3) ? `REF: ${parent.substring(0,3)}-${item}` : item;
        const clickAction = (tier === 1) ? 
            (archiveData[item] === 'DIRECT' ? `renderArchiveTier(3, '${item}')` : `renderArchiveTier(2, '${item}')`) :
            (tier === 2 ? `renderArchiveTier(3, '${item}')` : `console.log('Placed ${parent} ${item}')`);

        html += `
            <div class="archive-folder-wrapper" style="z-index:${i};">
                <div class="folder-label" onclick="${clickAction}"><div class="label-text">${labelName}</div></div>
                <div class="folder-body">
                    ${tier === 3 ? `
                        <div class="preview-box">
                            <img src="${parent.toLowerCase().replace('s','')}${item}.png" style="max-width:80%; max-height:80%;" onerror="this.src='https://via.placeholder.com/150?text=${parent}+${item}'">
                        </div>
                        <button class="place-btn">PLACE PIECE</button>
                    ` : ''}
                </div>
            </div>`;
    });
    box.innerHTML = html;
}

function openInspirationBook() {
    // Basic Look Book overlay logic
    alert('Look Book Opening...');
}
