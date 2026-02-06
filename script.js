function roomsAction() { 
    document.getElementById('furniture-cases-container').classList.remove('glided-in');
    document.getElementById('rooms-cabinet-container').classList.add('glided-in'); 
}

function furnitureAction() {
    document.getElementById('rooms-cabinet-container').classList.remove('glided-in');
    document.getElementById('furniture-cases-container').classList.add('glided-in');
}

let currentShelf = 1;

function openCloset() { 
    document.getElementById('closet-popup').style.display = 'block'; 
}

function closeCloset() { 
    document.getElementById('closet-popup').classList.remove('closet-open');
    document.getElementById('closet-popup').style.display = 'none'; 
}

function toggleDoors() { 
    document.getElementById('closet-popup').classList.toggle('closet-open'); 
}

function nextShelf() {
    document.getElementById(`shelf-${currentShelf}`).classList.remove('active');
    currentShelf = (currentShelf % 3) + 1;
    document.getElementById(`shelf-${currentShelf}`).classList.add('active');
}

const items = [
    { src: "plant1.png", shelf: "shelf-1" }, 
    { src: "plant2.png", shelf: "shelf-1" },
    { src: "lighting.png", shelf: "shelf-2" }, 
    { src: "lighting3.png", shelf: "shelf-2" },
    { src: "lighting4.png", shelf: "shelf-3" }, 
    { src: "lighting5.png", shelf: "shelf-3" },
    { src: "decor1.png", shelf: "shelf-1" }, 
    { src: "decor2.png", shelf: "shelf-3" }
];

items.forEach(item => {
    const img = document.createElement('img');
    img.src = "Assets/" + item.src;
    img.className = "shelf-item";
    img.onclick = () => spawnItem(item.src);
    const target = document.getElementById(item.shelf);
    if(target) target.appendChild(img);
});

function spawnItem(src) {
    const img = document.createElement('img');
    img.src = "Assets/" + src;
    img.className = "placed-item";
    img.style.left = "400px"; img.style.top = "200px";
    makeDraggable(img);
    document.getElementById('theater-container').appendChild(img);
}

function makeDraggable(el) {
    let x1=0, y1=0, x2=0, y2=0;
    el.onmousedown = (e) => {
        e.preventDefault(); 
        x2 = e.clientX; 
        y2 = e.clientY;
        document.onmouseup = () => { 
            document.onmouseup = null; 
            document.onmousemove = null; 
        };
        document.onmousemove = (e) => {
            e.preventDefault(); 
            x1 = x2 - e.clientX; 
            y1 = y2 - e.clientY; 
            x2 = e.clientX; 
            y2 = e.clientY;
            el.style.top = (el.offsetTop - y1) + "px"; 
            el.style.left = (el.offsetLeft - x1) + "px";
        };
    };
}
