document.addEventListener('DOMContentLoaded', function (){
    const pagination = document.querySelector('.pagination_element');
    const pag_nav = document.getElementById('pagination_nav');

    let elCount = 0;
    const maxCount = 6;
    let currentNode = 1;

    pagination.innerHTML += `<div class="card-section active" id="${currentNode}"></div>`
    pag_nav.innerHTML += `<li>${currentNode}</li>`

    db.collection("cards").get().then((cards) => {
        cards.forEach(card => {
                if (elCount < maxCount)
                {
                    createCard(card);
                    elCount++;
                }
                else
                {
                    elCount = 1;
                    currentNode++;
                    pagination.innerHTML += `<div class="card-section" id="${currentNode}"></div>`;
                    pag_nav.innerHTML += `<li>${currentNode}</li>`
                    createCard(card);
                }
        })
    })

    const createCard = (card) =>
    {
        let cardSection = document.getElementById(`${currentNode}`)
        let data = card.data();
        cardSection.innerHTML +=
            `<div class="card" id="${card.id}">
            <img class="photo" src="${data.cardImage}" />
            <div class="info">
                <h1 class="name">${data.name}</h1>
                <h2 class="profession">${data.profession}</h2>
                <button><a  href="../pages/profile.html" target="_blank">Подробнее</a></button>
            </div>
        </div>`


        pagination.addEventListener('mouseover', function () {
            let cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                card.addEventListener('click', function () {
                    window.localStorage.setItem('cardId', card.id);
                })
            })
        })
    }

    window.addEventListener('load', function (){
        let photo = document.querySelectorAll('.photo');
        let card_element = document.querySelector('.card');
        photo.forEach(photos => {
            photos.style.width = `${card_element.clientWidth}px`;
        })
    })
})