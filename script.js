const roomImg = document.getElementById('room-display');

// 1. YOUR DATA STRUCTURE
const archiveData = {
    'SEATING': ['COUCH', 'CHAIR', 'BENCH', 'STOOL'],
    'TABLES': ['COFFEE', 'END', 'DINING'],
    'STORAGE': ['DRESSERS', 'NIGHTSTANDS', 'CABINET', 'BUFFETT'],
    'BEDS': 'DIRECT' 
};

let cycles = { living: 1, dining: 1, kitchen: 1, bedroom: 1 };
let currentCategory = 'bedroom'; 

// 2. CABINET & ROOM CYCLING (ORIGINAL)
function toggleCabinet() { 
    document.getElementById('cab').classList.toggle('cabinet-visible'); 
    document.getElementById('main-stage').classList.toggle('stage-slid'); 
}

function cycleRoom(cat) {
    currentCategory = cat;
    const maxRooms = { living: 3, dining: 2, kitchen: 2, bedroom: 2 };
    cycles[cat] = (cycles[cat] % maxRooms[cat]) + 1;
    const labelMap = { living: 'Living Room', dining: 'Dining Room', kitchen: 'Kitchen', bedroom: 'Bedroom' };
    document.getElementById(`${cat}-label`).innerText = `${labelMap[cat]} ${cycles[cat]}`;
    
    let fileName = (cat === 'bedroom' ? 'bedroom' : cat === 'kitchen' ? 'kitchen' : cat + 'room');
    fileName += (cycles[cat] === 1 ? '' : cycles[cat]) + '.jpg';
    roomImg.src = fileName;
    roomImg.style.display = 'block';
}

// 3. TRIGGER ARCHIVE ON IMAGE CLICK
function stageCycle() {
    if (roomImg.style.display === 'block') openArchiveBox();
}

// 4. THE MECHANICAL ARCHIVE BOX
function openArchiveBox() {
    let box = document.getElementById('archive-box');
    if (!box) {
        box = document.createElement('div');
        box.id = "archive-box";
        box.style = `position:fixed; bottom:-550px; left:50%; transform:translateX(-50%); width:1000px; height:480px; background:#1a1a1a; border:4px solid #8e9196; border-bottom:none; box-shadow:0 -25px 60px rgba(0,0,0,0.9); z-index:9999; transition:bottom 0.6s cubic-bezier(0.19, 1, 0.22, 1); padding:70px 30px 20px 30px; overflow:hidden;`;
        document.body.appendChild(box);
    }
    renderArchiveTier(1); 
    setTimeout(() => { box.style.bottom = "0px"; }, 10);
}

function renderArchiveTier(tier, parent = null) {
    const box = document.getElementById('archive-box');
    let content = `<div onclick="document.getElementById('archive-box').style.bottom='-550px'" style="position:absolute; top:20px; right:30px; color:#8e9196; cursor:pointer; font-family:'Special Elite'; font-size:18px; z-index:10001;">[ CLOSE ARCHIVE ]</div>`;
    
    if (tier === 1) { // MAIN LABELS
        content += `<div style="display:flex; justify-content:center; gap:10px; position:absolute; bottom:0; width:94%;">
            ${Object.keys(archiveData).map(cat => `
                <div class="archive-tab" onclick="${archiveData[cat] === 'DIRECT' ? `renderArchiveTier(3, '${cat}')` : `renderArchiveTier(2, '${cat}')`}" style="width:220px; height:350px; background:#8e9196; border:2px solid #000; border-radius:10px 10px 0 0; cursor:pointer; position:relative; transition:0.3s;">
                    <div style="position:absolute; top:15px; left:50%; transform:translateX(-50%); background:white; width:85%; height:40px; border:1px solid #000; display:flex; align-items:center; justify-content:center; font-family:'Courier Prime'; font-weight:bold; color:black;">${cat}</div>
                </div>`).join('')}</div>`;
    } 
    else if (tier === 2) { // SUB-LABELS
        content += `<div onclick="renderArchiveTier(1)" style="color:white; font-family:'Special Elite'; cursor:pointer; position:absolute; top:20px; left:30px;">← BACK</div>
                    <div style="display:flex; justify-content:center; gap:10px; position:absolute; bottom:0; width:94%;">
            ${archiveData[parent].map(sub => `
                <div class="archive-tab" onclick="renderArchiveTier(3, '${sub}')" style="width:200px; height:350px; background:#6b6d70; border:2px solid #000; border-radius:10px 10px 0 0; cursor:pointer; position:relative; transition:0.3s;">
                    <div style="position:absolute; top:15px; left:50%; transform:translateX(-50%); background:white; width:85%; height:40px; border:1px solid #000; display:flex; align-items:center; justify-content:center; font-family:'Courier Prime'; font-weight:bold; color:black;">${sub}</div>
                </div>`).join('')}</div>`;
    }
    else if (tier === 3) { // PREVIEW BOXES
        content += `<div onclick="renderArchiveTier(1)" style="color:white; font-family:'Special Elite'; cursor:pointer; position:absolute; top:20px; left:30px;">← RESET</div>
                    <div style="display:flex; overflow-x:auto; gap:20px; padding:40px 10px; height:100%; align-items:flex-end;">
            ${[1,2,3,4,5].map(i => `
                <div class="archive-item-folder" style="min-width:240px; height:360px; background:#c2c2c2; border:2px solid #000; border-radius:10px 10px 0 0; position:relative; flex-shrink:0;">
                    <div style="position:absolute; top:-35px; left:10px; width:130px; height:35px; background:#c2c2c2; border:2px solid #000; border-bottom:none; border-radius:8px 8px 0 0; display:flex; align-items:center; justify-content:center;">
                        <div style="background:white; width:90%; height:70%; border:1px solid #000; font-family:'Courier Prime'; font-size:10px; color:black; font-weight:bold; text-align:center; display:flex; align-items:center; justify-content:center;">REF: ${parent.substring(0,3)}-${i}</div>
                    </div>
                    <div style="padding:15px; text-align:center;">
                        <div style="width:100%; height:200px; background:rgba(255,255,255,0.4); border:1px dashed #666; display:flex; align-items:center; justify-content:center;">
                            <img src="${parent.toLowerCase().replace('s','')}${i}.png" style="max-width:90%; max-height:90%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/150?text=${parent}+${i}'">
                        </div>
                        <button style="margin-top:25px; font-family:'Courier Prime'; background:black; color:white; border:none; padding:10px; cursor:pointer; width:100%; font-weight:bold;">PLACE PIECE</button>
                    </div>
                </div>`).join('')}</div>`;
    }
    box.innerHTML = content;
}

// 5. LOOK BOOK (KEEPING THIS SEPARATE AS A SIMPLE POPUP)
function openInspirationBook() {
    const book = document.createElement('div');
    book.id = "inspiration-overlay";
    book.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15,16,17,0.98); z-index:11000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(12px);";
    // (Scrapbook inner HTML logic remains same)
    book.innerHTML = `<div style="position:relative; width:98%; height:95vh; background:#2c2e30; border:2px solid #8e9196; padding:20px; overflow:hidden;">
        <div onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:20px; right:30px; font-family:'Special Elite'; color:silver; cursor:pointer; font-size:24px; border:1px solid silver; padding:5px 15px;">[ CLOSE X ]</div>
        <h2 style="font-family:'Limelight'; font-size:55px; color:white; text-align:center;">THE LOOK BOOK</h2>
        <div style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center; padding-top:40px;">(Inspiration Images Here)</div>
    </div>`;
    document.body.appendChild(book);
}
