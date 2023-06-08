document.addEventListener('DOMContentLoaded', function (){

    const blogTitleField = document.querySelector('.conference_title');
    const articleField = document.querySelector('.conference_content');
    const placeField = document.querySelector('.conference_place');

    //Баннер
    const bannerImage = document.querySelector('#conference-uploads');
    const banner = document.querySelector('.conference_banner');

    let bannerPath;

    const publishBtn = document.getElementById("6");
    const uploadInput = document.querySelector('#conference_image_upload');

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


    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    publishBtn.addEventListener('click', () =>{
        if(articleField.value.length && blogTitleField.value.length)
        {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let blogTitle = blogTitleField.value.split(" ").join("-");
            let id = '';
            for (let i =0; i < 4; i++)
            {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            let docName = `${blogTitle}-${id}`;
            let date = new Date();

            db.collection("conferences").doc(docName).set({
                title: blogTitleField.value,
                article: articleField.value,
                place: placeField.value,
                bannerImage: bannerPath,
                publishedAt: `${date.getDate()}.${months[date.getMonth()]}.${date.getFullYear()}`
            })
                .then(() => {
                    location.href = `../pages/news.html`;
                })
                .catch((err => {
                    console.error(err);
                }))
        }
    })

});