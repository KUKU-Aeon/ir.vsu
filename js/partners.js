document.addEventListener('DOMContentLoaded', function (){

    const PartnerTitleField = document.querySelector('.partner_title');
    const articleField = document.querySelector('.partner_content');
    const sourceField = document.querySelector('.partner_source');

    //Баннер
    const bannerImage = document.querySelector('#partner-uploads');
    const banner = document.querySelector('.partner_banner');

    let bannerPath;

    const publishBtn = document.getElementById("7");
    const uploadInput = document.querySelector('#partner_image_upload');
    let deleteBtn = document.getElementById('delete_partner');
    const select = document.getElementById('del_partner');

    bannerImage.addEventListener('change', () =>{
        uploadImage(bannerImage, "banner");
    });

    uploadInput.addEventListener('change', () => {
        uploadImage(uploadInput, "image");
    })



    const uploadImage = (uploadFile, uploadType) => {
        const [file] = uploadFile.files;
        const filetype = file.type;
        if(file && filetype.includes("image")) {
            if (uploadType == "image") {
                const uploadTask = storage.ref(`images/${file.name}`).put(file);
                uploadTask
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then(url => {

                        let curPos = articleField.selectionStart;
                        let textToInsert = `<img  src = "${url}"  class="article-image"/>`;
                        articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
                    })
            }
            else
            {
                const uploadTask = storage.ref(`images/${file.name}`).put(file);
                uploadTask
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then(url => {
                        bannerPath = url;
                        banner.style.backgroundImage = `url("${bannerPath}")`
                    })
            }
        }
        else
        {
            const uploadFile = storage.ref(`files/${file.name}`).put(file);
            uploadFile
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {

                    let curPos = articleField.selectionStart;
                    if (filetype.includes("video"))
                    {
                        let textToInsert = `<video  src = "${url}" controls></video>`
                        articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
                    }
                    else
                    {
                        let textToInsert = `<a  href = "${url}">${file.name}</a>`
                        articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
                    }

                })
        }
    }

    db.collection("f_partners").get().then((partners) => {
        partners.forEach(partner => {
            if(partner.id != decodeURI(location.pathname.split("/").pop()))
            {
                CreateSelect(partner);
            }

        })
    })

    const CreateSelect = (partner) => {
        const data = partner.data();
        select.innerHTML += `<option value="${partner.id}">${data.title}</option>`
    }

    deleteBtn.addEventListener('click', function () {
        let value = select.value;
        db.collection("f_partners").doc(value).delete().then(() => {
            alert("Партнёр успешно удален!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    });


    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    publishBtn.addEventListener('click', () =>{
        if(articleField.value.length && PartnerTitleField.value.length)
        {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let partnerTitle = PartnerTitleField.value.split(" ").join("-");
            let id = '';
            for (let i =0; i < 4; i++)
            {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            let docName = `${partnerTitle}-${id}`;
            let date = new Date();

            db.collection("f_partners").doc(docName).set({
                title: PartnerTitleField.value,
                article: articleField.value,
                source: sourceField.value,
                bannerImage: bannerPath
            })
                .then(() => {
                    location.href = `../pages/partners.html`;
                })
                .catch((err => {
                    console.error(err);
                }))
        }
    })

});