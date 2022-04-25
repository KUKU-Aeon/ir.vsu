
document.addEventListener('DOMContentLoaded', function (){

    const cardNameField = document.querySelector('.name');
    const professionField = document.querySelector('.profession');
    const bioField = document.querySelector('.bio');
    const dissField = document.querySelector(".dissertations");
    const langField = document.querySelector(".lang");
    const academField = document.querySelector(".acad_pos");
    const educField = document.querySelector(".education");
    const SCIField = document.querySelector(".SCI");
    const publicField = document.querySelector(".publications");
    const emailFiled = document.querySelector(".email");
    const siteField = document.querySelector(".per_site");

    //Баннер
    const cardImage = document.querySelector('#card-uploads');
    const card_banner = document.querySelector('.card_banner');

    let cardPath;

    const publishBtn = document.getElementById("2");

    cardImage.addEventListener('change', () =>{
        uploadImage(cardImage, "card_banner");
    });

    
    const uploadImage = (uploadFile, uploadType) => {
        const [file] = uploadFile.files;
        if(file && file.type.includes("image")) {
            const formdata = new FormData();
            formdata.append('image', file);

            fetch('../uploads', {
                method: 'post',
                body: formdata
            }).then(res => res.json())
                .then(data => {
                    if (uploadType == "image") {
                        addImage(data, file.name);
                    } else {
                        cardPath = `${location.origin}/${data}`;
                        console.log(cardPath);
                        card_banner.style.backgroundImage = `url("${cardPath}")`;
                    }
                })
        }else{
            alert("upload Image only");
        }
    }

    const addImage = (imagepath, alt) => {
        let curPos = professionField.selectionStart;
        let textToInsert = `\r![${alt}](${imagepath})\r`;
        professionField.value = professionField.value.slice(0, curPos) + textToInsert + professionField.value.slice(curPos);

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
                biography: bioField.value,
                language: langField.value,
                academpos: academField.value,
                dissertations: dissField.value,
                education: educField.value,
                SCI: SCIField.value,
                publications: publicField.value,
                email: emailFiled.value,
                site: siteField.value,
                cardImage: cardPath
            })
                .then(() => {
                    location.href = `/${docName}`;
                })
                .catch((err => {
                    console.error(err);
                }))
        }
    })

});