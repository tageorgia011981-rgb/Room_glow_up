function renderArchiveTier(tier, parent = null) {
    const box = document.getElementById('archive-box');
    let html = `<div onclick="document.getElementById('archive-box').style.bottom='-550px'" style="position:absolute; top:20px; right:30px; color:#8e9196; cursor:pointer; font-family:'Special Elite'; z-index:2000;">[ CLOSE ARCHIVE ]</div>`;
    
    let items = [];
    if (tier === 1) items = Object.keys(archiveData);
    else if (tier === 2) items = archiveData[parent];
    else if (tier === 3) items = [1,2,3,4,5];

    html += `<div style="display:flex; width:100%; height:100%; align-items:flex-end; padding-left:50px; position:relative;">`;

    items.forEach((item, i) => {
        const labelName = (tier === 3) ? `REF: ${parent.substring(0,3)}-${item}` : item;
        const clickAction = (tier === 1) ? 
            (archiveData[item] === 'DIRECT' ? `renderArchiveTier(3, '${item}')` : `renderArchiveTier(2, '${item}')`) :
            (tier === 2 ? `renderArchiveTier(3, '${item}')` : `alert('Placing ${parent} ${item}')`);

        html += `
            <div class="archive-folder-wrapper" style="z-index:${i}; position:relative; margin-left: -60px;">
                <div class="folder-label" onclick="${clickAction}" style="cursor:pointer;">
                    <div class="label-text">${labelName}</div>
