const BASE_URL = 'http://localhost:8080/JavaEE-MTGAPI-ScootWSmith';
const EXTERNAL_API_URL = 'https://api.magicthegathering.io/v1/cards';
const EXTERNAL_URL = 'http://35.197.204.90:8081/JavaEE-MTGAPI-ScootWSmith';

//User Data
const userID = sessionStorage.getItem('ID');

function loadHome() {
    sessionStorage.clear();
    window.location = 'LogIn.html';
}

function loadSearchDatabase() {
    window.location = 'SearchDatabase.html';
}

function loadUserInformation() {
    window.location = 'UserInfo.html';
}

function loadDeckList() {
    window.location = 'DeckList.html';
}