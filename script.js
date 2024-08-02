const output = document.getElementById("output");
const startButton = document.getElementById("startButton");
let recognizing = false;
let finalTranscript = ''; // Moved outside to maintain context

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = true; // Set continuous to true for indefinite recognition

startButton.addEventListener('click', () => {
    if (recognizing) {
        recognition.stop();
        recognizing = false;
        startButton.textContent = 'Start Listening';
    } else {
        output.textContent = ''; // Clear output text when starting
        finalTranscript = ''; // Clear finalTranscript when starting
        recognition.start();
        recognizing = true;
        startButton.textContent = 'Listening...';
    }
});

recognition.addEventListener('result', (e) => {
    let interimTranscript = '';

    // Process interim and final results
    for (const result of e.results) {
        if (result.isFinal) {
            finalTranscript = result[0].transcript; // Use = to replace old text
        } else {
            interimTranscript += result[0].transcript;
        }
    }

    // Display only the final transcript
    output.textContent = finalTranscript;

    // You can use interimTranscript if you want to display live updates
    // output.textContent = interimTranscript;
});

recognition.addEventListener('end', () => {
    if (recognizing) {
        recognition.start(); // Restart the recognition
    } else {
        startButton.textContent = 'Start Listening';
    }
});

recognition.addEventListener('start', () => {
    recognizing = true;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        recognition.stop();
        recognizing = false;
        startButton.textContent = 'Start Listening';
    }
});
