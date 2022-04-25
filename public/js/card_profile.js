document.addEventListener('DOMContentLoaded', () => {
    let cardId = decodeURI(location.pathname.split("/").pop());

    let docRef = db.collection("cards").doc(cardId);

    console.log(docRef)

    docRef.get().then((doc) => {
        console.log(doc.exists)
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

        titleTag.innerHTML += data.name;

        profile.innerHTML += `
        <div class="heading">
            <img src="${data.cardImage}" alt="" class="photo">
            <div class="information">
                <h1 clsas="fio">${data.name}</h1>
                <h2>Занимая должность - ученая степень</h2>
                <p class="profession">${data.profession}</p>
                <h2>E-mail</h2>
                <p class="email">${data.email}</p>
                <h2>Личный сайт</h2>
                <a href="${data.site}" class="site">${data.site}</a>
            </div>
        </div>
        <h2>Дисертации</h2>
        <p class="dissertation">${data.dissertations}</p>
        <h2>Академическая позиция</h2>
        <p class="academ_pos">${data.academpos}</p>
        <p class="SCI">${data.SCI}</p>
        <h2>Публикации</h2>
        <p class="publications">${data.publications}</p>`
    }

})