# Percentage and CGPA Calculator

A web application that calculates percentage and CGPA from marks, with features like data storage in Google Sheets, location detection, and meme generation.

## Features

- Calculate percentage and CGPA from marks
- Support for different education boards (CBSE, ICSE, State Boards)
- Data storage in Google Sheets
- Automatic location detection
- Meme generation with Giphy integration
- Responsive design
- Share results on social media

## Project Structure

```
├── public/                 # Public assets and frontend files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   ├── script.js          # Main JavaScript file
│   ├── memeGenerator.js   # Meme generation functionality
├── server.js              # Node.js server
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Public Directory Contents

### index.html
- Main HTML structure
- Form for marks input
- Results display section
- Meme display area

### styles.css
- Modern and responsive design
- Custom styling for form elements
- Meme container styling
- Share buttons styling

### script.js
- Main application logic
- Percentage and CGPA calculations
- Form handling
- Google Sheets integration
- Share functionality

### memeGenerator.js
- Giphy API integration
- Meme text generation
- Responsive meme container
- Dynamic text styling
- Share and download functionality

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Google Sheets API credentials:
   ```
   GOOGLE_SHEETS_PRIVATE_KEY=your_private_key
   GOOGLE_SHEETS_CLIENT_EMAIL=your_client_email
   GOOGLE_SHEETS_SHEET_ID=your_sheet_id
   GIPHY_API_KEY=your_giphy_api_key
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in your browser

## Dependencies

- Node.js
- Express.js
- Google Sheets API
- Giphy API
- HTML2Canvas (for meme download)

## Contributing

Feel free to submit issues and enhancement requests!

## Developer
-ANAND AMBASTHA (AKA Anand Kumar)

## License

This project is licensed under the MIT License. 
