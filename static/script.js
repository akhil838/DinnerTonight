// Enable smooth scrolling behavior for anchor links
document.querySelector('html').style.scrollBehavior = 'smooth';

let currentSection = 'hobbySection';

function switchSection(hideSection, showSection) {
    hideSection.classList.remove('active');
    hideSection.classList.add('hidden');
    showSection.classList.remove('hidden');
    showSection.classList.add('active');
}

function generateBio() {
    // Get selected hobbies, interests, and professions
    const hobbies = Array.from(document.querySelectorAll('input[name="hobby"]:checked')).map(cb => cb.value);
    const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(cb => cb.value);
    const professions = Array.from(document.querySelectorAll('input[name="profession"]:checked')).map(cb => cb.value);
    const personalities = Array.from(document.querySelectorAll('input[name="personality"]:checked')).map(cb => cb.value);
    const relationships = Array.from(document.querySelectorAll('input[name="relationship"]:checked')).map(cb => cb.value);

    // Create the payload
    const payload = { hobbies, interests, professions ,personalities ,relationships };

    // Send data to the Flask server using fetch
    fetch('https://dinnertonight-akhil838.vercel.app/generate_bio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Insert the generated bio into the page
        const bioContent = document.getElementById('bioContent');
        bioContent.innerText = data.bio; // The generated bio
        const bioTitle = document.getElementById('bioTitle');
        bioTitle.innerText = data.title; // The generated bio Title
    })
    .catch(error => {
        console.error('Error generating bio:', error);
    });
}

function updateProgress(step) {
    const items = document.querySelectorAll('.progress-item');
    items.forEach((item, index) => {
        if (index < step) {
            item.classList.add('completed');
            item.classList.remove('active');
        } else if (index == step) {
            item.classList.add('active');
            item.classList.remove('completed');
        } else {
            item.classList.remove('completed', 'active');
        }
    });
}

// Show next step
function nextStep(currentStep) {
    const currentSection = document.getElementById(`${getSectionName(currentStep)}Section`);
    const nextSection = document.getElementById(`${getSectionName(currentStep + 1)}Section`);
    
    switchSection(currentSection, nextSection);
    updateProgress(currentStep + 1);
}

// Show previous step
function previousStep(currentStep) {
    const currentSection = document.getElementById(`${getSectionName(currentStep)}Section`);
    const prevSection = document.getElementById(`${getSectionName(currentStep - 1)}Section`);
    
    switchSection(currentSection, prevSection);

    updateProgress(currentStep - 1);
}

// Get the section name based on the step
function getSectionName(step) {
    switch(step) {
        case 0: return 'hobby';
        case 1: return 'interest';
        case 2: return 'profession';
        case 3: return 'personality';
        case 4: return 'relationship';
        default: return '';
    }
}
