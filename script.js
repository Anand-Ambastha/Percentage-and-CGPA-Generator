document.addEventListener('DOMContentLoaded', () => {
    const subjectsInput = document.getElementById('subjects');
    const marksContainer = document.getElementById('marks-container');
    const calculateBtn = document.getElementById('calculate');
    const percentageResult = document.getElementById('percentage');
    const cgpaResult = document.getElementById('cgpa');
    const boardSelect = document.getElementById('board');
    const locationInput = document.getElementById('location');
    const classSelect = document.getElementById('class');
    const streamGroup = document.getElementById('stream-group');
    const streamSelect = document.getElementById('stream');

    let userLocation = '';

    // Function to get user's location using IP
    async function getUserLocation() {
        try {
            const response = await axios.get('https://ipapi.co/json/');
            const { region, country_name } = response.data;
            userLocation = `${region}, ${country_name}`;
            locationInput.value = userLocation;
        } catch (error) {
            console.error('Error getting location:', error);
            locationInput.value = 'Location not available';
            userLocation = 'Location not available';
        }
    }

    // Function to handle class selection
    function handleClassChange() {
        const selectedClass = parseInt(classSelect.value);
        if (selectedClass === 11 || selectedClass === 12) {
            streamGroup.style.display = 'block';
        } else {
            streamGroup.style.display = 'none';
            streamSelect.value = '';
        }
    }

    // Function to create subject input fields
    function createSubjectInputs() {
        const numSubjects = parseInt(subjectsInput.value);
        marksContainer.innerHTML = '';

        for (let i = 1; i <= numSubjects; i++) {
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'subject-input';
            subjectDiv.innerHTML = `
                <label for="subject${i}">Subject ${i} Marks:</label>
                <input type="number" id="subject${i}" class="form-control" min="0" max="100" placeholder="Enter marks (0-100)">
            `;
            marksContainer.appendChild(subjectDiv);
        }
    }

    // Function to save data to server
    async function saveData(data) {
        try {
            const response = await fetch('http://localhost:3000/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    location: userLocation
                })
            });
            const result = await response.json();
            if (result.success) {
                console.log('Data saved successfully');
            } else {
                console.error('Error saving data:', result.message);
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Function to calculate percentage and CGPA
    async function calculateResults() {
        // Validate class selection
        if (!classSelect.value) {
            alert('Please select your class');
            return;
        }

        const numSubjects = parseInt(subjectsInput.value);
        let totalMarks = 0;
        let validInputs = true;
        let marks = [];

        // Calculate total marks
        for (let i = 1; i <= numSubjects; i++) {
            const subjectMarks = parseFloat(document.getElementById(`subject${i}`).value);
            if (isNaN(subjectMarks) || subjectMarks < 0 || subjectMarks > 100) {
                validInputs = false;
                break;
            }
            marks.push(subjectMarks);
            totalMarks += subjectMarks;
        }

        if (!validInputs) {
            alert('Please enter valid marks (0-100) for all subjects');
            return;
        }

        // Calculate percentage
        const percentage = (totalMarks / (numSubjects * 100)) * 100;
        
        // Calculate CGPA based on board
        let cgpa;
        const board = boardSelect.value;
        
        switch(board) {
            case 'cbse':
                cgpa = percentage / 9.5;
                break;
            case 'icse':
                cgpa = percentage / 10;
                break;
            case 'state':
                cgpa = percentage / 10;
                break;
            default:
                cgpa = percentage / 10;
        }

        // Display results
        percentageResult.textContent = `Percentage: ${percentage.toFixed(2)}%`;
        cgpaResult.textContent = `CGPA: ${cgpa.toFixed(2)}`;

        // Generate and display meme
        shareMeme(percentage.toFixed(2), cgpa.toFixed(2));

        // Save data to server
        await saveData({
            class: classSelect.value,
            stream: streamSelect.value,
            board: board,
            numSubjects: numSubjects,
            marks: marks,
            percentage: percentage.toFixed(2),
            cgpa: cgpa.toFixed(2)
        });
    }

    // Event listeners
    subjectsInput.addEventListener('change', createSubjectInputs);
    calculateBtn.addEventListener('click', calculateResults);
    boardSelect.addEventListener('change', () => {
        if (percentageResult.textContent !== '--') {
            calculateResults();
        }
    });
    classSelect.addEventListener('change', handleClassChange);

    // Initialize
    createSubjectInputs();
    getUserLocation();
}); 