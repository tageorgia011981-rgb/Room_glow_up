// Cabinet toggle
document.getElementById('roomsBtn').addEventListener('click', () => {
    const cabinet = document.getElementById('sideCabinet');
    cabinet.style.display = cabinet.style.display === 'flex' ? 'none' : 'flex';
});

// Drawer selection
document.querySelectorAll('.side-drawer').forEach(drawer => {
    drawer.addEventListener('click', () => {
        // highlight selected drawer
        document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('active'));
        drawer.classList.add('active');

        // update main room image
        const roomImg = document.getElementById('roomImage');
        roomImg.src = drawer.dataset.room;

        // hide all sub-fans initially
        document.querySelectorAll('.sub-fan').forEach(sf => sf.classList.remove('active'));
    });
});

// Fan icon click
document.querySelectorAll('.fan-item').forEach(fan => {
    fan.addEventListener('click', (e) => {
        e.stopPropagation();
        const category = fan.dataset.category;
        const subFan = document.getElementById(category + 'SubFan');

        // close all sub-fans except this one
        document.querySelectorAll('.sub-fan').forEach(sf => {
            if(sf !== subFan) sf.classList.remove('active');
        });

        subFan.classList.toggle('active');
    });
});

// Furniture item click → preview
document.querySelectorAll('.furniture-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const roomImg = document.getElementById('roomImage');
        roomImg.src = item.src;
    });
});
