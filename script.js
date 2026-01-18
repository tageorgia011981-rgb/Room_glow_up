/* ===== ROOM GLOW UP: MASTER LOGIC ===== */

// Toggle the main Room Cabinet
function toggleRooms() {
const panel = document.getElementById('sideCabinet');
const btn = document.getElementById('rooms-trigger');

if (panel) {
panel.classList.toggle('active');
}
if (btn) {
btn.classList.toggle('lit-up');
}
}

// Upload Room Image and Deploy Furniture Fan
function uploadRoom(imageSrc, element) {
const img = document.getElementById('roomImage');
const placeholder = document.getElementById('placeholderText');
const fan = document.getElementById('furnitureFan');

if (!img) return;

// 1. Reset Glow on drawers
document.querySelectorAll('.side-drawer').forEach(drawer => {
drawer.classList.remove('lit-up');
});
element.classList.add('lit-up');

// 2. Close fan if it's already open (to re-trigger the animation)
if (fan) {
fan.classList.remove('fan-active');
}

// 3. Transition the Room Image
img.style.opacity = '0';

setTimeout(() => {
if (placeholder) placeholder.style.display = 'none';
img.src = imageSrc;

img.onload = function() {
img.style.opacity = '1';
img.classList.add('show');

// 4. Trigger the Furniture Fan out of the top drawer
if (fan) {
setTimeout(() => {
fan.classList.add('fan-active');
}, 200);
}
};
}, 400);
}

// placeholder for the Furniture Category clicks
function openCategory(category) {
console.log("Opening category: " + category);
// We will build the furniture lists here next
}