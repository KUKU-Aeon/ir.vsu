document.addEventListener('DOMContentLoaded', () => {

    let cardId = window.localStorage.getItem("cardId");

    let docRef = db.collection("cards").doc(cardId);


    docRef.get().then((doc) => {
        if(doc.exists)
        {
            setupCard(doc.data());
        }
        else
        {
            location.replace("/");
        }
    })

    const setupCard = (data) => {

        const titleTag = document.querySelector('title');

        const profile = document.querySelector(".profile");
        let publications = CreateElement(data.publications);
        let courses = CreateElement(data.courses);
        let SCI = CreateElement(data.SCI)

        titleTag.innerHTML += data.name;
        console.log()
        profile.innerHTML += `
        <div class="heading">
            <img src="${data.cardImage}" alt="" class="photo">
            <div class="information">
                <h1 class="fio">${data.name}</h1>
                <h2>Занимая должность - ученая степень</h2>
                <p class="profession">${data.profession}</p>
                <h2>E-mail</h2>
                <p class="email">${data.email}</p>
                <h2>Личный сайт</h2>
                <a href="${data.site}" class="site">${data.site}</a>
            </div>
        </div>
        <h2>Публикации</h2>
        <ol class="dissertation">${publications}</ol>
        <h2>Сфера научных интересов</h2>
        <ul class="SCI">${SCI}</ul>
        <h2>Преподаваемые курсы</h2>
        <ul class="publications">${courses}</ul>`
    }

    function CreateElement(element)
    {
        let result = "";
        let reg = new RegExp("[;\n]")
        let array = element.split(reg);
         console.log(array)
        array.forEach(elem => {
            result += `<li>${elem}</li>`;
        })

        return result
    }

})



