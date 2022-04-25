
document.addEventListener('DOMContentLoaded', function (){

    const blogTitleField = document.querySelector('.title');
    const articleField = document.querySelector('.m_content');

    //Баннер
    const bannerImage = document.querySelector('#banner-uploads');
    const banner = document.querySelector('.banner');

    let bannerPath;

    const publishBtn = document.getElementById("1");
    const uploadInput = document.querySelector('#image_upload');

    bannerImage.addEventListener('change', () =>{
       uploadImage(bannerImage, "banner");
    });

    uploadInput.addEventListener('change', () => {
        uploadImage(uploadInput, "image");
    })


    const uploadImage = (uploadFile, uploadType) => {
        const [file] = uploadFile.files;
        console.log(file);
        const filetype = file.type;
        console.log(filetype);
        if(file && filetype.includes("image")) {
            const formdata = new FormData();
            formdata.append('image', file);
            console.log(formdata);
            fetch('/uploads', {
                method: 'post',
                body: formdata
            }).then(res => res.json())
                .then(data => {
                    if (uploadType == "image") {
                        addImage(data, file.name);
                    } else {
                        bannerPath = `${location.origin}/${data}`;
                        console.log(bannerPath);
                        banner.style.backgroundImage = `url("${bannerPath}")`;
                    }
                })
        }else{
            const formdata = new FormData();
            formdata.append("application", file);
            fetch('/uploads/files/', {
                method: 'post',
                body: formdata
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    addFile(data, file.name);
                });
        }
    }

    const addImage = (imagepath, alt) => {
        let curPos = articleField.selectionStart;
        let textToInsert = `\r![${alt}](${imagepath})\r`;
        articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);

    }

    const addFile = (filepath, alt) =>
    {
        let curPos = articleField.selectionStart;
        let textToInsert = `\r![${alt}](${filepath})\r`;
        articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
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

            db.collection("blogs").doc(docName).set({
                title: blogTitleField.value,
                article: articleField.value,
                bannerImage: bannerPath,
                publishedAt: `${date.getDate()}.${months[date.getMonth()]}.${date.getFullYear()}`
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