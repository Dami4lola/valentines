// Get button elements
const yesBtn2 = document.getElementById('yesBtn2');
const noBtn2 = document.getElementById('noBtn2');
let noClickCount2 = 0;
const maxNoClicks = 5;

// Handle "No" button click
noBtn2.addEventListener('click', function(e) {
    e.preventDefault();
    noClickCount2++;
    
    // Track the click
    if (window.clickTracker) {
        window.clickTracker.trackNoClick('successPage');
    }
    
    // If "No" clicked 3 times, go to breakfast page
    if (noClickCount2 >= maxNoClicks) {
        // Don't send email here - will be sent when breakfast.html loads
        window.location.href = 'breakfast.html';
        return;
    }
    
    // Move "No" button to random position
    const maxX = window.innerWidth - noBtn2.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn2.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn2.style.position = 'fixed';
    noBtn2.style.left = randomX + 'px';
    noBtn2.style.top = randomY + 'px';
});

// Handle "Yes" button click
yesBtn2.addEventListener('click', function() {
    // Don't send email here - will be sent when plans.html loads
    window.location.href = 'plans.html';
});
