function searchFunction() {
    let elem = document.getElementById("upcoming-appointments");

    elem.style.display = 'none';
    elem = document.getElementById('search-results');

    elem.style.display = 'block'
}

function backToUpcoming() {
    let elem = document.getElementById("upcoming-appointments");

    elem.style.display = 'block';
    elem = document.getElementById('search-results');

    elem.style.display = 'none'
}