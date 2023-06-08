document.addEventListener('DOMContentLoaded', function (){

    const vacancyTitleField = document.querySelector('.vacancy_title');
    const vacancyArticleField = document.querySelector('.vacancy_content');
    const vacancyCorporation = document.querySelector('.vacancy_corp');


    const publishBtn = document.getElementById("5");

    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    let select = document.getElementById('del_vacancy');
    let delete_btn = document.getElementById('delete_vacancy')
    let type = document.getElementById('type_of').value;

    db.collection("vacancys").get().then((vacancys) => {
        select.innerHTML += `<optgroup label="Вакансии">`
        vacancys.forEach(vacancy => {
            if(vacancy.id != decodeURI(location.pathname.split("/").pop()))
            {

                CreateSelect(vacancy);
            }

        })
    })

    db.collection("internships").get().then((vacancys) => {
        select.innerHTML += `<optgroup label="Стажировки">`
        vacancys.forEach(vacancy => {
            if(vacancy.id != decodeURI(location.pathname.split("/").pop()))
            {
                CreateSelect(vacancy);
            }
        })
    })

    const CreateSelect = (vacancy) => {
        const data = vacancy.data();
        select.innerHTML += `<option value="${vacancy.id}">${data.title}</option>`
    }

    delete_btn.addEventListener('click', function (){
        let value = select.value;
        db.collection("vacancys").doc(value).delete().then(() => {
           alert("Вакансия успешно удалена!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

        db.collection("vacancys").get().then((vacancys) => {
            vacancys.forEach(vacancy => {
                if(vacancy.id != decodeURI(location.pathname.split("/").pop()))
                {
                    CreateSelect(vacancy);
                }
            })
        })
    })


    publishBtn.addEventListener('click', () =>{
        if(vacancyArticleField.value.length && vacancyTitleField.value.length)
        {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let blogTitle = vacancyTitleField.value.split(" ").join("-");
            let id = '';
            for (let i =0; i < 4; i++)
            {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            let docName = `${blogTitle}-${id}`;
            let date = new Date();
            let type = document.getElementById('type_of').value;
            console.log(type);

            db.collection(type).doc(docName).set({
                title: vacancyTitleField.value,
                article: vacancyArticleField.value,
                corporation: vacancyCorporation.value,
                publishedAt: `${date.getDate()}.${months[date.getMonth()]}.${date.getFullYear()}`
            })
                .then(() => {
                })
                .catch((err => {
                    console.error(err);
                }))
        }
    })

});