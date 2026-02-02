function startMuseum() { 
    // Fade out the studio
    document.getElementById('studio-main').style.opacity = '0'; 
    
    setTimeout(() => { 
        document.getElementById('studio-main').style.display = 'none';
        const act1 = document.getElementById('stage-1'); 
        act1.style.display = 'block'; 
        // Small delay to trigger the CSS transition
        setTimeout(() => act1.style.opacity = '1', 50); 
    }, 1200); 
}

function nextAct(curr, next) { 
    const currentStage = document.getElementById(curr);
    const nextStage = document.getElementById(next);

    currentStage.style.opacity = '0'; 
    
    setTimeout(() => { 
        currentStage.style.display = 'none'; 
        nextStage.style.display = 'block';
        setTimeout(() => nextStage.style.opacity = '1', 50); 
    }, 1800); 
}

// Logic for other tabs
function openRooms() { 
    console.log("Opening Room Designer..."); 
}

function openFurnitureCatalog() { 
    console.log("Opening Furniture Catalog..."); 
}

function saveProject() { 
    alert("Studio progress has been saved."); 
}
