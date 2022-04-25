const cardSection = document.querySelector('.card-section');

db.collection("cards").get().then((cards) => {
    cards.forEach(card => {
        if(card.id !== decodeURI(location.pathname.split("/").pop()))
        {
            createCard(card);
        }
    })
})

const createCard = (card) =>
{
    let data = card.data();
    cardSection.innerHTML +=
        `<div class="card">
            <img class="photo" src="${data.cardImage}" />
            <div class="info">
                <h1 class="name">${data.name}</h1>
                <h2 class="profession">${data.profession}</h2>
                <div class="biography">${data.biography}</div>
                <button><a  href="/profile/${card.id}">Подробнее</a></button>
            </div>
        </div>`
}