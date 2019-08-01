const userData = {};
const data = {};
var newData = {};

function handleFormLogic(form) {
    for (let element of form.elements) {
        if (element.id) {
            userData[element.id] = element.value;
        }
    }
    console.log(userData);
}

function handleLogIn(form) {
    handleFormLogic(form);
    makeRequest('POST', BASE_URL + "/api/account/login", JSON.stringify(userData)).then(data => {
        console.log(JSON.stringify(data));
        if (JSON.stringify(data) === "{\"message\":\"Fail\"}") {
            alert("Please enter a valid name and password");
            console.log('This has failed properly');
        } else {
            newData = JSON.parse(data);
            sessionStorage.setItem('ID', newData);
            loadUserInformation();
        }
    });
    return false;
}

function handleNewUser(form) {
    handleFormLogic(form);
    var { name, password } = userData;
    if (name == "" | password == "") {
        alert("Please enter a valid name and password");
        console.log(name + "This will not send");
    } else {
        makeRequest('POST', BASE_URL + "/api/account/add", JSON.stringify(userData)).then(data => {
            if (JSON.stringify(data) === "{\"checkName\":\"Taken\"}") {
                alert("This username is taken");
                console.log('This has failed properly');
            } else {
                newData = JSON.parse(data);
                console.log(data);
                sessionStorage.setItem('ID', newData);
                loadUserInformation();
            }
        });
    }
    return false;
}

function handleUpdate(form) {

    handleFormLogic(form);
    var { name, password } = userData;
    if (name == "" | password == "") {
        alert("Please enter a valid name and password");
        console.log(name + "This will not send");
    } else {
        makeRequest('POST', BASE_URL + "/api/account/update/" + userID, JSON.stringify(userData)).then(() => {
            emptyData();
            getUserData();
        });
    }
    return false;
}

function printUserData() {
    console.log(newData);
}