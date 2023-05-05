
const userId = localStorage.getItem("userId");
const tutorId = document.URL.replace("http://localhost:3000/tutor/", "");


window.onload = function() {
    const elem = document.querySelector('.favorites-btn');
    const url = "http://localhost:3000/favorites/" + userId;
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // console.log('onload', response.json())
        return response.json();
      })
    .then(data => {
        if (data.favoriteTutors.includes(tutorId)) {
            elem.innerHTML = "Remove from Favorites"
        } else {
            elem.innerHTML = "Add to Favorites"
        }
    })
    .catch(error => console.error(error));
  };

let handleFavorites = function(elem) {
    if (elem.innerHTML.includes("Add")) {
        elem.innerHTML = "Remove from Favorites";

        const url = "http://localhost:3000/favorites/" + userId + "/" + tutorId;
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response.json());
        })
        .catch(error => console.error(error));
    } else {
        elem.innerHTML = "Add to Favorites";
        const url = "http://localhost:3000/favorites/" + userId + "/" + tutorId;
        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response.json());
        })
        .catch(error => console.error(error));
    }
}

let handleAptSignup = function(dateStr) {
    const aptDate = new Date(Date.parse(dateStr));
    let postData = {
        studentId: userId,
        tutorId: tutorId,
        date: aptDate,
    };

    alert("Appointment scheduled!");
    
    let url = "http://localhost:3000/api/appointment-sign-up";
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
    .catch(error => console.error(error))
}