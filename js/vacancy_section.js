document.addEventListener('DOMContentLoaded', function () {

    const vacancy = document.querySelector('.vacancy');


        db.collection("vacancys").get().then((vacancys) => {
            let type = "vacancys";
            vacancy.innerHTML += "<h2>Вакансии</h2>";
            vacancy.innerHTML += `<div class="vacancy-section" id="vacancys"></div>`
            vacancys.forEach(vacancy => {
                if(vacancy.id != decodeURI(location.pathname.split("/").pop()))
                {
                    createBlog(vacancy, type);
                }
            })
        })

    db.collection("internships").get().then((vacancys) => {
        let type = "internships";
        vacancy.innerHTML +="<h2>Стажировки</h2>"
        vacancy.innerHTML += `<div class="vacancy-section" id="internships"></div>`
        vacancys.forEach(vacancy => {
            if(vacancy.id != decodeURI(location.pathname.split("/").pop()))
            {
                createBlog(vacancy, type);
            }
        })
        vacancy.innerHTML += `</div>`
    })

    const createBlog = (vacancy, type) =>
    {
        const data = vacancy.data();
        const vacancySection = document.getElementById(type)
        vacancySection.innerHTML += `<div class="blog-card" id="${vacancy.id}">
            <img  class="red_mark" src="../img/red_mark.png" alt="">
            <div class="vacancy-info">
            <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
            <p>${data.article.substring(0, 100) + '...'}</p>
            <p>${data.corporation.substring(0, 100) + '...'}</p>
            <a href="../pages/vacancy.html" target="_blank" class="read_more">Подробнее...</a>
            </div>
        </div>`
    }


    vacancy.addEventListener('mouseover', function () {
        let cards = document.querySelectorAll(".blog-card");
        cards.forEach(card => {
            card.addEventListener('click', function () {
                window.localStorage.setItem('vacancyId', card.id);
            })
        })
    })
});
