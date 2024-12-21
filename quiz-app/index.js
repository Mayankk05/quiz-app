function startQuiz(quizType) {
    alert(`Starting ${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz!`);
    
    // Redirecting to the corresponding quiz page based on the selected type
    window.location.href = `${quizType}-quiz.html`; // Assumes pages are named quiz-java.html, quiz-python.html, etc.
}
// Get elements
const startNowBtn = document.getElementById('start-now-btn');
const authModal = document.getElementById('auth-modal');
const loginForm = document.getElementById('login-form');
const body = document.querySelector('body');


 // Check if the user has clicked "Go Back" from result.html
 if (localStorage.getItem('allowScroll') === 'true') {
    body.classList.remove('no-scroll'); // Enable scrolling
    localStorage.removeItem('allowScroll'); // Clear the flag
}

// Show login modal when clicking "Start Now"
startNowBtn.addEventListener('click', () => {
    authModal.style.display = 'flex';  // Show modal
    body.classList.add('no-scroll');   // Disable scrolling on the landing page
});

// Handle Login form submission
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get input values
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Get the login button for UI updates
    const loginButton = document.querySelector('#login-form button');
    loginButton.textContent = 'Logging in...'; // Indicate loading
    loginButton.disabled = true; // Disable the button to prevent multiple clicks

    try {
        // Send login request to the backend
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }) // Send user credentials
        });

        // Parse the response (assuming the response is plain text)
        const result = await response.text();

        if (response.ok) {
            alert(result); // Display success message

            // Hide login modal and enable scrolling again
            authModal.style.display = 'none';
            body.classList.remove('no-scroll'); // Enable scrolling

            // Redirect to the landing page or quiz section
             window.location.href = '#quiz-packages'; // Redirect to the landing page (can be adjusted)
        } else {
            alert(result); // Display error message (e.g., "Invalid username or password")
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while logging in. Please try again.');
    } finally {
        loginButton.textContent = 'Login'; // Reset button text
        loginButton.disabled = false; // Re-enable the button
    }
});



// Switch between Login and Register forms
document.getElementById('switch-link').addEventListener('click', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const modalTitle = document.getElementById('modal-title');

    // Switch to Register form
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    modalTitle.textContent = 'Register';

    // Update switch text to login
    document.getElementById('switch-text').style.display = 'none';
    document.getElementById('switch-to-login-text').style.display = 'block';
});

// Switch from Register form to Login form
document.getElementById('switch-to-login-link').addEventListener('click', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const modalTitle = document.getElementById('modal-title');

    // Switch to Login form
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    modalTitle.textContent = 'Login';

    // Update switch text to register
    document.getElementById('switch-text').style.display = 'block';
    document.getElementById('switch-to-login-text').style.display = 'none';
});
