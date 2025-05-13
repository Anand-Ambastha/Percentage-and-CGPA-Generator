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
        'From {previousPercentage}% to {percentage}% - The glow up is real! ✨',
        'Getting {percentage}% vs Telling everyone you got {percentage}% 😎'
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
        .replace('{cgpa}', cgpa);

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
    memeContainer.style.width = '500px';
    memeContainer.style.margin = '20px auto';
    
    // Create image element
    const img = document.createElement('img');
    img.src = meme.image;
    img.style.width = '100%';
    img.style.borderRadius = '10px';
    img.style.aspectRatio = '16/9';
    img.style.objectFit = 'cover';
    
    // Create text element
    const text = document.createElement('div');
    text.textContent = meme.text;
    text.style.position = 'absolute';

    text.style.width = 'auto';
    text.style.maxWidth = '90%';
    text.style.textAlign = 'center';
    text.style.padding = '12px 16px';
    text.style.background = 'rgba(0,0,0,0.6)';
    text.style.borderRadius = '10px';
    text.style.margin = '10px';
    text.style.boxSizing = 'border-box';
    text.style.left = '50%';
    text.style.transform = 'translateX(-50%)';
    text.style.color = 'white';
    text.style.fontSize = '24px';
    text.style.fontWeight = 'bold';
    text.style.textShadow = '2px 2px 4px black';
    if (meme.style.includes('top')) {
        text.style.top = '20px';
    } else {
        text.style.bottom = '20px';
    }
    
    // Add elements to container
    memeContainer.appendChild(img);
    memeContainer.appendChild(text);
    
    return memeContainer;
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
    resultsSection.appendChild(memeContainer);
    resultsSection.appendChild(shareButtons);
}

// Function to share on different platforms
async function shareOnPlatform(platform, percentage, cgpa) {
    const meme = await generateMeme(percentage, cgpa);
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