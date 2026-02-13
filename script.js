// Get button elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
let noClickCount = 0;

// Handle "No" button click
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    noClickCount++;
    
    // Track the click
    if (window.clickTracker) {
        window.clickTracker.trackNoClick('mainPage');
    }
    
    // Move "No" button to random position
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Grow "Yes" button
    const currentScale = yesBtn.style.transform 
        ? parseFloat(yesBtn.style.transform.match(/scale\(([\d.]+)\)/)?.[1] || 1)
        : 1;
    
    const newScale = currentScale * 1.2;
    yesBtn.style.transform = `scale(${newScale})`;
    
    // If button gets too large, make it cover the screen
    if (newScale >= 20) {
        yesBtn.style.width = '100vw';
        yesBtn.style.height = '100vh';
        yesBtn.style.position = 'fixed';
        yesBtn.style.top = '0';
        yesBtn.style.left = '0';
        yesBtn.style.borderRadius = '0';
        yesBtn.style.transform = 'none';
        yesBtn.style.zIndex = '1000';
    }
});

// Handle "Yes" button click
yesBtn.addEventListener('click', function() {
    // Don't send email here - only send when reaching final page
    window.location.href = 'success.html';
});
