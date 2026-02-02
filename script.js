const myArt = {
    hands: ['pnkbathroom.jpg', 'wellnesswinkliving.jpg', 'kitchenpurp.jpg'],
    ornate: ['textures&vibes1.jpg', 'colors&vibes.jpg', 'texture&vibes3.jpg'],
    lookbook: ['insp9.jpg', 'insp11.jpg', 'insp16.jpg', 'insp17.jpg', 'insp18.jpg'],
    molding: ['textures&vibes1.jpg', 'textures&vibes.jpg', 'textures&vibes2.jpg']
};

function populateGallery() {
    const h = document.querySelectorAll('#gallery-view img');
    myArt.hands.forEach((src, i) => { if(h[i]) h[i].src = src; });
    
    const o = document.querySelectorAll('#ornate-view img');
    myArt.ornate.forEach((src, i) => { if(o[i]) o[i].src = src; });
    
    const lb = document.querySelectorAll('#lookbook-view img');
    myArt.lookbook.forEach((src, i) => { if(lb[i]) { lb[i].src = src; lb[i].style.objectFit = 'cover'; } });
    
    const m = document.querySelectorAll('#final-exhibit img');
    myArt.molding.forEach((src, i) => { if(m[i]) m[i].src = src; });
}

function startMuseum() { 
    populateGallery();
    document.getElementById('studio-main').style.opacity = '0'; 
    setTimeout(() => { 
        document.getElementById('studio-main').style.display = 'none';
        const act1 = document.getElementById('stage-1'); 
        act1.style.display = 'block'; 
        setTimeout(() => act1.style.opacity = '1', 50); 
    }, 1200); 
}

function nextAct(curr, next) { 
    document.getElementById(curr).style.opacity = '0'; 
    setTimeout(() => { 
        document.getElementById(curr).style.display = 'none'; 
        const nextStage = document.getElementById(next);
        nextStage.style.display = 'block';
        setTimeout(() => nextStage.style.opacity = '1', 50); 
    }, 1800); 
}

// Placeholders for other tabs
function openRooms() { console.log("Rooms clicked"); }
function openFurnitureCatalog() { console.log("Catalog clicked"); }
function saveProject() { alert("Saved!"); }
