const studentSection = document.querySelector('.student-section');

db.collection("students").get().then((message) => {
    message.forEach(message => {
        if(message.id !== decodeURI(location.pathname.split("/").pop()))
        {
            createMessage(message);
        }
    })
})



const createMessage = (message) =>
{
    let data = message.data();
    studentSection.innerHTML +=
        `<div class="message">
                <h1 class="a_title">${data.title}</h1>
                <p class="a_message">${data.article}</p>
            </div>
        </div>`
}