function openSubFan(category) {
    const subFan = document.getElementById('sub-fan');
    subFan.innerHTML = '';
    
    // 6 blades, each with 2 items
    for (let i = 0; i < 6; i++) {
        const blade = document.createElement('div');
        blade.className = 'fan-item dual-item-blade';
        
        let itemA, itemB;

        if (category === 'seating' && i === 0) {
            // Your 2 specific seating uploads on the first blade
            itemA = 'seating.png';
            itemB = 'seating2.png';
        } else if (category === 'beds' && i === 0) {
            // Your bed upload
            itemA = 'bed.png';
            itemB = 'placeholder.png'; // Placeholder for the second spot
        } else {
            // General naming for future uploads (e.g., tables_1.png)
            itemA = `${category}_${(i * 2) + 1}.png`;
            itemB = `${category}_${(i * 2) + 2}.png`;
        }

        blade.innerHTML = `
            <div class="mini-thumb" draggable="true" ondragstart="startDrag(event, '${itemA}')">
                <img src="${itemA}" width="35" onerror="this.src='placeholder.png'">
            </div>
            <div class="mini-thumb" draggable="true" ondragstart="startDrag(event, '${itemB}')">
                <img src="${itemB}" width="35" onerror="this.src='placeholder.png'">
            </div>
        `;
        subFan.appendChild(blade);
    }
    subFan.classList.add('open');
}
