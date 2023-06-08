
document.addEventListener('DOMContentLoaded', function () {

    const cardNameField = document.querySelector('.name');
    const professionField = document.querySelector('.profession');
    const SCIField = document.querySelector(".SCI");
    const publicField = document.querySelector(".conferences");
    const coursesField = document.querySelector(".courses");
    const emailFiled = document.querySelector(".email");
    const siteField = document.querySelector(".per_site");

    //Баннер
    const cardImage = document.querySelector('#card-uploads');
    const card_banner = document.querySelector('.card_banner');
    const select = document.getElementById('del_card');
    const delete_btn = document.getElementById('delete_card');

    let cardPath;

    const publishBtn = document.getElementById("2");

    cardImage.addEventListener('change', () => {
        uploadImage(cardImage);
    });

    db.collection("cards").get().then((vacancys) => {
        vacancys.forEach(vacancy => {
            if(vacancy.id != decodeURI(location.pathname.split("/").pop()))
            {
                CreateSelect(vacancy);
            }

        })
    })

    const CreateSelect = (vacancy) => {
        const data = vacancy.data();
        select.innerHTML += `<option value="${vacancy.id}">${data.name}</option>`
    }

    delete_btn.addEventListener('click', function () {
        let value = select.value;
        db.collection("cards").doc(value).delete().then(() => {
            alert("Карта успешно удалена!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    });

    const uploadImage = (uploadFile) => {
        const [file] = uploadFile.files;
        if (file && file.type.includes("image")) {
            const uploadTask = storage.ref(`images/${file.name}`).put(file);
            uploadTask
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    cardPath = `${url}`;
                    card_banner.style.backgroundImage = `url("${cardPath}")`;
                })

        }
        else
        {
            alert("upload Image only");
        }
}


    publishBtn.addEventListener('click', () =>{
        if(professionField.value.length && cardNameField.value.length)
        {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let cardTitle = cardNameField.value.split(" ").join("-");
            let id = '';
            for (let i =0; i < 4; i++)
            {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            let docName = `${cardTitle}-${id}`;

            db.collection("cards").doc(docName).set({
                name: cardNameField.value,
                profession: professionField.value,
                SCI: SCIField.value,
                publications: publicField.value,
                courses: coursesField.value,
                email: emailFiled.value,
                site: siteField.value,
                cardImage: cardPath
            })
                .then(() => {
                   alert("Добавлено")
                })
                .catch((err => {
                    console.error(err);
                }))
        }
    })

});