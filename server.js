const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json', // You'll need to create this file
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '1M_o_IcZSt4MFknpAP4xDvw43xCRqjJ1kNv5o0zVRYec';

// Function to initialize sheet headers
async function initializeSheet() {
    try {
        const headers = [
            ['Timestamp', 'Location', 'Class', 'Stream', 'Board', 'Number of Subjects', 'Subject Marks', 'Percentage', 'CGPA']
        ];

        await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A1:I1',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: headers
            }
        });
    } catch (error) {
        console.error('Error initializing sheet:', error);
    }
}

// Function to save data to Google Sheets
async function saveToGoogleSheets(data) {
    try {
        // Prepare the row data
        const rowData = [
            new Date().toLocaleString(),
            data.location,
            data.class,
            data.stream || 'N/A',
            data.board,
            data.numSubjects,
            data.marks.join(', '),
            data.percentage,
            data.cgpa
        ];

        // Append the row to the sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:I',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [rowData]
            }
        });

        return true;
    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        throw error;
    }
}

// API endpoint to save data
app.post('/save-data', async (req, res) => {
    try {
        await saveToGoogleSheets(req.body);
        res.json({ success: true, message: 'Data saved successfully to Google Sheets' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving data to Google Sheets' });
    }
});

// Initialize sheet headers when server starts
initializeSheet().then(() => {
    console.log('Sheet headers initialized');
}).catch(error => {
    console.error('Error initializing sheet headers:', error);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 