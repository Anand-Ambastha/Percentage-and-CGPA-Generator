// Meme templates with different styles
const memeTemplates = {
    success: [
        {
            image: 'https://i.imgur.com/example1.jpg',
            text: 'When you score {percentage}% and your parents are proud! 🎓',
            style: 'top: 20px; font-size: 24px; color: white; text-shadow: 2px 2px 4px black;'
        },
        {
            image: 'https://i.imgur.com/example2.jpg',
            text: 'Me with {cgpa} CGPA: I am inevitable! 💪',
            style: 'bottom: 20px; font-size: 28px; color: white; text-shadow: 2px 2px 4px black;'
        }
    ],
    average: [
        {
            image: 'https://i.imgur.com/example3.jpg',
            text: 'When you get {percentage}% and your friends ask how you did 😅',
            style: 'top: 20px; font-size: 24px; color: white; text-shadow: 2px 2px 4px black;'
        }
    ],
    improvement: [
        {
            image: 'https://i.imgur.com/example4.jpg',
            text: 'From {previousPercentage}% to {percentage}% - The glow up is real! ✨',
            style: 'bottom: 20px; font-size: 24px; color: white; text-shadow: 2px 2px 4px black;'
        }
    ]
};

// Function to generate meme based on results
function generateMeme(percentage, cgpa) {
    let template;
    
    // Select template based on percentage
    if (percentage >= 90) {
        template = memeTemplates.success[Math.floor(Math.random() * memeTemplates.success.length)];
    } else if (percentage >= 70) {
        template = memeTemplates.average[Math.floor(Math.random() * memeTemplates.average.length)];
    } else {
        template = memeTemplates.improvement[Math.floor(Math.random() * memeTemplates.improvement.length)];
    }

    // Replace placeholders with actual values
    let memeText = template.text
        .replace('{percentage}', percentage)
        .replace('{cgpa}', cgpa);

    return {
        image: template.image,
        text: memeText,
        style: template.style
    };
}

// Function to create and display meme
function createMeme(percentage, cgpa) {
    const meme = generateMeme(percentage, cgpa);
    
    // Create meme container
    const memeContainer = document.createElement('div');
    memeContainer.className = 'meme-container';
    memeContainer.style.position = 'relative';
    memeContainer.style.width = '500px';
    memeContainer.style.margin = '20px auto';
    
    // Create image element
    const img = document.createElement('img');
    img.src = meme.image;
    img.style.width = '100%';
    img.style.borderRadius = '10px';
    
    // Create text element
    const text = document.createElement('div');
    text.textContent = meme.text;
    text.style.position = 'absolute';
    text.style.width = '100%';
    text.style.textAlign = 'center';
    text.style.padding = '10px';
    text.style = meme.style;
    
    // Add elements to container
    memeContainer.appendChild(img);
    memeContainer.appendChild(text);
    
    return memeContainer;
}

// Function to share meme
function shareMeme(percentage, cgpa) {
    const memeContainer = createMeme(percentage, cgpa);
    
    // Create share buttons
    const shareButtons = document.createElement('div');
    shareButtons.className = 'share-buttons';
    shareButtons.style.marginTop = '10px';
    shareButtons.style.textAlign = 'center';
    
    // Add share options
    const platforms = ['WhatsApp', 'Facebook', 'Twitter', 'Email'];
    platforms.forEach(platform => {
        const button = document.createElement('button');
        button.textContent = `Share on ${platform}`;
        button.className = 'share-button';
        button.onclick = () => shareOnPlatform(platform, percentage, cgpa);
        shareButtons.appendChild(button);
    });
    
    // Add download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Meme';
    downloadButton.className = 'download-button';
    downloadButton.onclick = () => downloadMeme(memeContainer);
    shareButtons.appendChild(downloadButton);
    
    // Add to results section
    const resultsSection = document.getElementById('results');
    resultsSection.appendChild(memeContainer);
    resultsSection.appendChild(shareButtons);
}

// Function to share on different platforms
function shareOnPlatform(platform, percentage, cgpa) {
    const meme = generateMeme(percentage, cgpa);
    const shareText = `Check out my results! ${meme.text}`;
    
    switch(platform) {
        case 'WhatsApp':
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
            break;
        case 'Facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
            break;
        case 'Twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
            break;
        case 'Email':
            window.location.href = `mailto:?subject=My Results&body=${encodeURIComponent(shareText)}`;
            break;
    }
}

// Function to download meme
function downloadMeme(memeContainer) {
    // Convert meme to image and download
    html2canvas(memeContainer).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-results-meme.png';
        link.href = canvas.toDataURL();
        link.click();
    });
} 