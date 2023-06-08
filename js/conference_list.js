document.addEventListener('DOMContentLoaded', function () {

    const conferenceSection = document.querySelector('.conference_section');

    db.collection("conferences").get().then((conferences) => {
        conferences.forEach(conference => {
            if(conference.id != decodeURI(location.pathname.split("/").pop()))
            {
                createBlog(conference);
            }
            else
            {
                conferenceSection.innerHTML +=`<h3>В этом разделе еще ничего нет. Следите за обновлениями!</h3>`
            }
        })
    })

    const createBlog = (conference) =>
    {
        const data = conference.data();
        conferenceSection.innerHTML += `<div class="blog-card" id="${conference.id}">
            <img src="${data.bannerImage}" class="blog-image">
            <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
            <p class="place">${data.place.substring(0, 100) + '...'}</p>
            <a href="../pages/conference.html" target="_blank" class="read_more">Подробнее...</a>
        </div>`
    }


   conferenceSection.addEventListener('mouseover', function () {
        let cards = document.querySelectorAll(".blog-card");
        cards.forEach(card => {
            card.addEventListener('click', function () {
                window.localStorage.setItem('conferenceId', card.id);
            })
        })
    })
});
