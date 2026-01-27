function createDividers() {
    const categories = ['SEAT', 'TABL', 'STOR', 'BEDS'];
    let html = '';
    categories.forEach((cat, i) => {
        const offset = i * 60;
        html += `
            <div id="div-card-${cat}" onclick="pullFolderToFront('${cat}')" style="
                position: absolute; bottom: 0; left: calc(15% + ${offset}px);
                width: 650px; height: 380px; background: #c2c2c2;
                border: 2px solid #8e9196; border-radius: 5px 5px 0 0;
                box-shadow: -15px 0 30px rgba(0,0,0,0.6); cursor: pointer;
                transition: 0.6s all cubic-bezier(0.19, 1, 0.22, 1); z-index: ${10 - i};
            ">
                <div style="position:absolute; top:-45px; left:20px; width:150px; height:45px; background:#c2c2c2; border:2px solid #8e9196; border-bottom:none; border-radius:10px 10px 0 0; display:flex; align-items:center; justify-content:center;">
                    <div style="background:white; width:88%; height:75%; border:1px solid black; color:black; font-family:'Courier Prime', monospace; font-weight:bold; font-size:12px; display:flex; align-items:center; justify-content:center; text-transform:uppercase; letter-spacing:1px;">
                        ${cat}
                    </div>
                </div>
                <div class="folder-content" style="opacity:0; visibility:hidden; transition:0.4s; padding:30px; display:flex; overflow-x:auto; gap:25px; align-items:center; height:100%;">
                    ${generateInventoryItems(cat)}
                </div>
            </div>
        `;
    });
    return html;
}

function generateInventoryItems(cat) {
    let items = '';
    for(let i=1; i<=6; i++) {
        items += `
            <div style="min-width:200px; height:280px; text-align:center; background:rgba(255,255,255,0.4); border:1px solid #999; padding:15px; box-shadow:inset 0 0 10px rgba(0,0,0,0.1);">
                <img src="${cat.toLowerCase()}${i}.png" style="width:160px; height:180px; object-fit:contain;" onerror="this.src='https://via.placeholder.com/160x180?text=${cat}+${i}'">
                <div style="margin-top:15px; border-top:1px solid #000; padding-top:10px;">
                    <p style="font-family:'Special Elite', cursive; font-size:11px; color:#000; font-weight:bold; letter-spacing:0.5px;">REF NO: ${cat.substring(0,3)}-${i}00</p>
                    <button style="margin-top:5px; font-family:'Courier Prime', monospace; background:black; color:white; border:none; padding:3px 10px; cursor:pointer; font-size:10px; font-weight:bold; text-transform:uppercase;">PLACE PIECE</button>
                </div>
            </div>
        `;
    }
    return items;
}
