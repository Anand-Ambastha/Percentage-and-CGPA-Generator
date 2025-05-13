# Percentage & CGPA Calculator

A web application that calculates percentage and CGPA from subject marks, with Google Sheets data storage functionality.

## Features

- Calculate percentage and CGPA based on subject marks
- Support for different education boards (CBSE, ICSE, State Board)
- Dynamic subject input fields
- Data storage in Google Sheets
- Modern and responsive UI

## Setup Instructions

1. Make sure you have Node.js installed on your system
2. Clone this repository
3. Set up Google Sheets API:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Sheets API
   - Create a service account and download the credentials JSON file
   - Rename the downloaded file to `credentials.json` and place it in the project root
   - Create a new Google Sheet and share it with the service account email
   - Copy the Spreadsheet ID from the URL (the long string between /d/ and /edit)
   - Replace `YOUR_SPREADSHEET_ID` in `server.js` with your actual Spreadsheet ID

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open `index.html` in your web browser

## Data Storage

The application automatically saves all calculations to your Google Sheet. The sheet contains the following columns:

- Timestamp
- Board
- Number of Subjects
- Subject Marks
- Percentage
- CGPA

## Technical Details

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- Data Storage: Google Sheets API
- CORS enabled for local development

## Note

Make sure to keep your `credentials.json` file secure and never commit it to version control. The Google Sheet should be shared with the service account email address for the application to work properly. 