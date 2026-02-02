function startMuseum() { 
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

function openRooms() { console.log("Rooms logic active"); }
function openFurnitureCatalog() { console.log("Catalog logic active"); }
function saveProject() { alert("Saved!"); }
