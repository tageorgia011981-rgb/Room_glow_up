function toggleRooms(){
    document.getElementById('sideCabinet').classList.toggle('active');
}

function uploadRoom(imgSrc, drawerElement){
    document.getElementById('mainDisplay').classList.add('active');
    document.getElementById('roomImage').src = imgSrc;

    // Hide all other drawers' fans
    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));
    document.querySelectorAll('.sub-fan').forEach(sf => sf.classList.remove('active'));

    // Show only the current drawer fans
    drawerElement.classList.add('lit-up');
}

function openCategory(event, categoryId){
    event.stopPropagation();
    document.querySelectorAll('.sub-fan').forEach(sf=>{
        if(sf.id!==categoryId+'SubFan'){sf.classList.remove('active');}
    });
    const subFan=document.getElementById(categoryId+'SubFan');
    if(subFan) subFan.classList.toggle('active');
}

function placeFurniture(img){
    console.log("Place furniture:",img);
}
