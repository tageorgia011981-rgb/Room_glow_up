// Toggle cabinet visibility
function toggleRooms() {
    document.getElementById('sideCabinet').classList.toggle('active');
}

// Upload room image & activate drawer
function uploadRoom(imgSrc, drawerElement){
    document.getElementById('mainDisplay').classList.add('active');
    document.getElementById('roomImage').src = imgSrc;

    // Remove lit-up from all drawers
    document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('lit-up'));

    // Remove glow from all icons
    document.querySelectorAll('.icon-box').forEach(i => i.classList.remove('active'));

    // Activate clicked drawer
    drawerElement.classList.add('lit-up');
}

// Activate glow on icon click
function activateIcon(event){
    event.stopPropagation(); // prevent drawer click
    const icon = event.currentTarget.querySelector('.icon-box');

    // Remove active from siblings
    event.currentTarget.parentElement.querySelectorAll('.icon-box').forEach(i=>i.classList.remove('active'));

    icon.classList.add('active');
}

// Open sub-categories if needed (e.g., Bedroom beds)
function openCategory(event, categoryId){
    event.stopPropagation();
    const subFan = document.getElementById(categoryId + 'SubFan');
    if(subFan) subFan.classList.toggle('active');
}
