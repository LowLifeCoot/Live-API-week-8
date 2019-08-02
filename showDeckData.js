var online = true;
function searchForCards() {
    onlne = true;
    makeRequest('GET', EXTERNAL_API_URL).then((response) => {
        let data = JSON.parse(JSON.stringify(response));
        let cards = data.cards
        outputSearchResults(cards);
    })
}

function showDeck() {
    onlne = false;
    makeRequest('GET', EXTERNAL_URL + '/api/deck/getUsers/' + userID).then((response) => {
        let data = JSON.parse(JSON.stringify(response));
        outputSearchResults(data);
    })
}


function emptyData() {
    const toDel = document.getElementById('MainBody');
    var child = toDel.lastElementChild;
    while (child) {
        toDel.removeChild(child)
        child = toDel.lastElementChild;
    }
}

function outputSearchResults(cards) {
    console.log(cards);
emptyData();
    const mainDiv = document.getElementById('MainBody');
    mainDiv.setAttribute('class', 'row');


    for (let card of cards) {
        var { name, manaCost, cmc, colour, foreignNames, id, imageUrl, url } = card;
        console.log(name, imageUrl, url, id);


        // //Create a Div for the card card
        if (imageUrl != null || url != null) {
            if (url != null) {
                imageUrl = url;
            }

            const newDivOne = document.createElement('div');
            newDivOne.setAttribute('style', 'width: 18rem;')
            newDivOne.classList.add('card');
            mainDiv.append(newDivOne);



            //Create the Image based upon the recived Url
            const pos = document.createElement('img');
            pos.classList.add('card-img-top');
            pos.setAttribute('id', name);
            pos.setAttribute('class', 'card')
            pos.setAttribute('style', 'width: 18rem;')
            pos.setAttribute('src', imageUrl);

            //Add a EventListner to the created Image
            pos.addEventListener("click", function () {
                console.log("Clicked!!!");

                const cardData = {};
                cardData['account_ID'] = userID;
                cardData['name'] = card.name;
                cardData['url'] = card.imageUrl;

                if (onlne) {
                    makeRequest('POST', EXTERNAL_URL + '/api/deck/add', JSON.stringify(cardData)).then((response) => {
                        console.log(response);
                        newDivOne.parentNode.removeChild(newDivOne);
                    });
                } else if (!onlne) {
                    makeRequest('DELETE', EXTERNAL_URL + '/api/deck/delete/' + card.id, JSON.stringify(cardData)).then((response) => {
                        console.log(response);
                        newDivOne.parentNode.removeChild(newDivOne);
                    });
                }
            })
            newDivOne.append(pos);
        }
    }
}
