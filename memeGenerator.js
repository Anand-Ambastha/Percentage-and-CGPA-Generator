// Giphy API configuration

const GIPHY_API_KEY = 'NZInA6192fGJwQMk62VvCIzPb8sjDRun'; // Replace this with your API key from Giphy
const GIPHY_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';

// Meme text templates
const memeTexts = {
    success: [
        'When you score {percentage}% and your parents are proud! 🎓',
        'Me with {cgpa} CGPA: I am inevitable! 💪',
        'When you get {percentage}% and everyone asks for your study tips! 🎯'
    ],
    average: [
        'When you get {percentage}% and your friends ask how you did 😅',
        '{percentage}%? This is fine... Everything is fine... 🔥'
    ],
    improvement: [
        'Getting {percentage}% and feeling like a boss! 💪',
        'When you score {percentage}% and prove everyone wrong! 🎯',
        '{percentage}% and still going strong! 💫'
    ]
};

// Search terms for different categories
const searchTerms = {
    success: [
        'success kid',
        'winning',
        'achievement',
        'proud moment',
        'excellent',
        'perfect score',
        'top student',
        'genius'
    ],
    average: [
        'confused math lady',
        'thinking',
        'okay',
        'this is fine',
        'average student',
        'meh',
        'whatever',
        'shrug'
    ],
    improvement: [
        'improvement',
        'progress',
        'better',
        'growth',
        'upgrade',
        'level up',
        'transformation',
        'glow up'
    ]
};

// Function to get random meme background from Giphy
async function getRandomMemeBackground(category) {
    try {
        const searchTerm = searchTerms[category][Math.floor(Math.random() * searchTerms[category].length)];
        console.log(`Fetching meme for category: ${category}, search term: ${searchTerm}`);
        
        const response = await fetch(`${GIPHY_ENDPOINT}?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=10&rating=g`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`Giphy API error: ${data.message || 'Unknown error'}`);
        }
        
        if (data.data && data.data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.data.length);
            const selectedGif = data.data[randomIndex];
            console.log('Successfully fetched meme:', selectedGif.title);
            return selectedGif.images.original.url;
        } else {
            console.log('No memes found for search term:', searchTerm);
            return 'https://i.imgur.com/8tMuXaP.jpg'; // Fallback image
        }
    } catch (error) {
        console.error('Error fetching meme background:', error);
        return 'https://i.imgur.com/8tMuXaP.jpg'; // Fallback image
    }
}

// Function to generate meme based on results
async function generateMeme(percentage, cgpa) {
    let category;
    let template;
    
    // Select category based on percentage
    if (percentage >= 90) {
        category = 'success';
    } else if (percentage >= 70) {
        category = 'average';
    } else {
        category = 'improvement';
    }

    // Get random text template
    const textTemplate = memeTexts[category][Math.floor(Math.random() * memeTexts[category].length)];
    
    // Get random background
    const backgroundUrl = await getRandomMemeBackground(category);
    
    // Replace placeholders with actual values
    let memeText = textTemplate
        .replace('{percentage}', percentage)
        .replace('{cgpa}', cgpa)
        .replace('{previousPercentage}', Math.floor(percentage * 0.7)); // For improvement memes, show 70% of current score as previous

    return {
        image: backgroundUrl || 'https://i.imgur.com/8tMuXaP.jpg', // Fallback image
        text: memeText,
        style: 'bottom: 20px; font-size: 24px; color: white; text-shadow: 2px 2px 4px black;'
    };
}

// Function to create and display meme
async function createMeme(percentage, cgpa) {
    const meme = await generateMeme(percentage, cgpa);
    
    // Create meme container
    const memeContainer = document.createElement('div');
    memeContainer.className = 'meme-container';
    memeContainer.style.position = 'relative';
    memeContainer.style.margin = '20px auto';
    memeContainer.style.display = 'flex';
    memeContainer.style.flexDirection = 'column';
    memeContainer.style.gap = '15px';
    memeContainer.style.maxWidth = '800px'; // Maximum width for very large images
    
    // Create image element
    const img = document.createElement('img');
    img.src = meme.image;
    img.style.width = '100%';
    img.style.borderRadius = '10px';
    img.style.objectFit = 'contain'; // Changed to contain to maintain aspect ratio
    img.style.maxHeight = '500px'; // Maximum height for very tall images
    
    // Create text element
    const text = document.createElement('div');
    text.textContent = meme.text;
    text.style.width = '100%';
    text.style.textAlign = 'center';
    text.style.padding = '15px 20px';
    text.style.background = 'rgba(0, 0, 0, 0.9)';
    text.style.borderRadius = '15px';
    text.style.color = '#ffffff';
    text.style.fontSize = 'clamp(18px, 2vw, 26px)'; // Responsive font size
    text.style.fontWeight = '800';
    text.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.8)';
    text.style.border = '3px solid rgba(255, 255, 255, 0.9)';
    text.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
    text.style.wordWrap = 'break-word'; // Ensure long text wraps properly
    
    // Add elements to container
    memeContainer.appendChild(img);
    memeContainer.appendChild(text);

    // Wait for image to load to adjust container
    img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        if (aspectRatio > 1) {
            // Landscape image
            memeContainer.style.width = 'min(800px, 90vw)';
        } else {
            // Portrait image
            memeContainer.style.width = 'min(500px, 90vw)';
        }
    };
    
    return memeContainer;
}

// Function to generate multiple memes
async function generateMultipleMemes(percentage, cgpa, count = 3) {
    const resultsSection = document.getElementById('results');
    const memeSection = document.getElementById('meme-section');
    
    // Clear previous memes
    memeSection.innerHTML = '';
    
    // Generate specified number of memes
    for (let i = 0; i < count; i++) {
        const memeContainer = await createMeme(percentage, cgpa);
        memeSection.appendChild(memeContainer);
        
        // Add share buttons for each meme
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
        
        memeSection.appendChild(shareButtons);
    }
    
    // Add a small delay before reloading to ensure all memes are displayed
    setTimeout(() => {
        window.location.reload();
    }, 5000); // Reload after 5 seconds
}

// Function to share meme
async function shareMeme(percentage, cgpa) {
    const memeContainer = await createMeme(percentage, cgpa);
    
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
    const memeSection = document.getElementById('meme-section');
    memeSection.innerHTML = ''; // Clear previous memes
    memeSection.appendChild(memeContainer);
    memeSection.appendChild(shareButtons);
}

// Function to share on different platforms
async function shareOnPlatform(platform, percentage, cgpa) {
    const memeContainer = await createMeme(percentage, cgpa);
    
    // Convert meme to image
    html2canvas(memeContainer).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
        const shareText = `Check out my results!`;
        
        switch(platform) {
            case 'WhatsApp':
                // For WhatsApp, we'll share the text and the image URL
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
                break;
            case 'Facebook':
                // For Facebook, we'll share the image directly
                const formData = new FormData();
                fetch(imageData)
                    .then(res => res.blob())
                    .then(blob => {
                        formData.append('image', blob, 'meme.png');
                        // Note: Facebook sharing with image requires server-side implementation
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
                    });
                break;
            case 'Twitter':
                // For Twitter, we'll share the text and the image URL
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
                break;
            case 'Email':
                // For email, we'll create a download link and attach the image
                const link = document.createElement('a');
                link.href = imageData;
                link.download = 'my-results-meme.png';
                link.click();
                window.location.href = `mailto:?subject=My Results&body=${encodeURIComponent(shareText)}`;
                break;
        }
    });
}

// Function to download meme
function downloadMeme(memeContainer) {
    // Convert meme to image and download
    html2canvas(memeContainer, {
        scale: 2, // Higher quality
        useCORS: true, // Enable cross-origin image loading
        backgroundColor: null // Transparent background
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'my-results-meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
} 