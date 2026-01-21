function toggle(type, el) {
  // 1. Remove glow from all tabs and drawers
  document.querySelectorAll('.library-pull, .inner-btn').forEach(b => b.classList.remove('active-glow'));
  
  // 2. Light up the clicked tab
  el.classList.add('active-glow');
  
  // 3. Slide the cabinet into view
  const cabinetShell = document.getElementById('cabinet-shell');
  const cabContent = document.getElementById('cab-content');
  cabinetShell.classList.add('show');

  // 4. Fill the cabinet with the correct drawers
  if (type === 'rooms') {
    cabContent.innerHTML = `
      <div class="inner-btn drw-1" onclick="changeRoom('livingroom.jpg', this)">
        <div class="plate-style">Living Room</div>
        <div class="pull-lip"></div>
      </div>
      <div class="inner-btn drw-2" onclick="changeRoom('bedroom.jpg', this)">
        <div class="plate-style">Bedroom</div>
        <div class="pull-lip"></div>
      </div>
      <div class="inner-btn drw-3" onclick="changeRoom('diningroom.jpg', this)">
        <div class="plate-style">Dining Room</div>
        <div class="pull-lip"></div>
      </div>
      <div class="inner-btn drw-4" onclick="triggerUpload(this)">
        <div class="plate-style">Upload</div>
        <div class="pull-lip"></div>
      </div>
    `;
  } else {
    // Keeps cabinet empty for Furniture, Decor, and Inspiration for now
    cabContent.innerHTML = ''; 
  }
}

function changeRoom(src, el) {
  // Clear glow from other drawers and light up this one
  document.querySelectorAll('.inner-btn').forEach(b => b.classList.remove('active-glow'));
  if(el) el.classList.add('active-glow');
  
  const img = document.getElementById('main-room');
  
  // Fade out old image
  img.style.opacity = '0';
  
  // Wait for fade, then swap source and fade back in
  setTimeout(() => {
    img.src = src;
    img.onload = function() {
      img.style.opacity = '1';
    };
  }, 300);
}

function triggerUpload(el) {
  // Create a hidden file picker
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = event => {
      // Load the uploaded file into the stage
      changeRoom(event.target.result, el);
    };
    
    reader.readAsDataURL(file);
  };
  
  input.click();
}/* --- SYSTEM SETUP --- */

