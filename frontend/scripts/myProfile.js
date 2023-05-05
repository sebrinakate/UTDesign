function handleTutorSignup(form) {
    let formData = new FormData(form);
    let postData = {}
  
    for (var pair of formData.entries()) {
        postData[pair[0]] = pair[1];
    }
    postData.userId = localStorage.getItem('userId');
    postData.availability = {
        days: postData.days.split(", "),
        hours: postData.hours.split(", ")
    };
    postData.subjectsArray = postData.subjects.split(', ');

    alert("You will be redirected to the login page, enter your info again to acccess your tutor account.")
  
    let url = "http://localhost:3000/api/tutor-signup";
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
        location.replace('http://localhost:3000/login');
        return response.json();
      })
    .catch(error => console.error(error))
}

document.querySelector('.tutor-signup').addEventListener('submit', (e) => {
    e.preventDefault();
    handleTutorSignup(e.target);
});