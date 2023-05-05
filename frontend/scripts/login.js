function handleLogin(form) {
    let formData = new FormData(form);
    let postData = {}
  
    for (var pair of formData.entries()) {
        postData[pair[0]] = pair[1];
    }
  
    let url = "http://localhost:3000/api/login";
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data) {
            localStorage.setItem('userId', data.id);
            localStorage.setItem('role', data.role);
            location.replace('http://localhost:3000/home/' + data.id);
        } else {
            alert('Incorrect login information');
        }
      })
    .catch(error => console.error(error))
}

function handleSignup(form) {
    let formData = new FormData(form);
    let postData = {}

    for (var pair of formData.entries()) {
        postData[pair[0]] = pair[1];
    }
    console.log(postData);

    // password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
    const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    if (!strongPassword.test(postData.password)) {
        alert("Password is not strong enough");
        return;
    } else if (String(postData.password) !== String(postData.cpassword)) {
        alert("Passwords do not match");
        return;
    }

    alert("Thanks for signing up! Login with the information you just provided to get started.");

    let url = "http://localhost:3000/api/signup";
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(postData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response.json());
        return response.json();
      })
    .catch(error => console.error(error))
}

document.querySelector('.login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin(e.target);
});

document.querySelector('.signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleSignup(e.target);
});

//animations
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');

loginTab.addEventListener('click', () => {
    loginForm.classList.add('show', 'active');
    signupForm.classList.remove('show', 'active');
});

signupTab.addEventListener('click', () => {
    signupForm.classList.add('show', 'active');
    loginForm.classList.remove('show', 'active');
});