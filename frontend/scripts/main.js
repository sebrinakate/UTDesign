function handleLogout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    location.replace("http://localhost:3000/login")
}

window.onload = function() {
    if (localStorage.getItem('role')== 'tutor') {
        document.querySelector('.favorites').style.display = 'none';
    }
}

function searchFunction() {
    const query = document.querySelector('.search-input').value;

    let url = "http://localhost:3000/api/search/" + query;
    fetch(url, {
        method: 'GET',
        mode: 'cors',
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
        const container = document.querySelector('.search-cards');
        const searchHtml = renderSearchCards(data);
        console.log('searchhtml', searchHtml);
        container.innerHTML = searchHtml;
      })
    .catch(error => console.error(error))

    const upcomingAppointmentsElem = document.getElementById("upcoming-appointments");
    upcomingAppointmentsElem.style.display = 'none';

    const searchResultsElem = document.getElementById('search-results');
    searchResultsElem.style.display = 'block';
}

function renderSearchCards(data) {
    let cards = data.map(item => 
        `<div class="row">
            <div class="card col align-items-center fav-tutor">
                <div class="card-body" style="display:flex;flex-direction:column;justify-content:center">
                    <h5 class="card-title text-center">${item.name.firstName + ' ' + item.name.lastName}</h5>
                    <p class="card-text text-center">${item.subjects.join(' ')}</p>
                    <a href="../tutor/${item._id}" class="btn btn-light">Visit profile</a>
                </div>
            </div>
        </div>
        ` 
    ).join('');
    console.log(cards);
    return cards;
}

function handleAptDelete(aptId) {
    let url = "http://localhost:3000/api/appointment-delete/" + aptId;
    fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
    .catch(error => console.error(error))
    alert('Appointment Deleted!')
}

function backToUpcoming() {
    let elem = document.getElementById("upcoming-appointments");

    elem.style.display = 'block';
    elem = document.getElementById('search-results');

    elem.style.display = 'none'
}