
document.addEventListener('DOMContentLoaded', function (){

    const stTitleField = document.querySelector('.st_title');
    const stArticleField = document.querySelector('.st_m_content');
    const inputField = document.getElementById('file-upload');

    const publishBtn = document.getElementById("3");



    inputField.addEventListener('change', () =>{
        uploadFiles(inputField, "file");
    });

    const uploadFiles = (uploadFile) => {
        const [file] = uploadFile.files;
        const filetype = file.type;
        if(file && filetype.includes("image")) {
            const formdata = new FormData();
            formdata.append('image', file);
            fetch('/uploads', {
                method: 'post',
                body: formdata
            }).then(res => res.json())
                .then(data => {addImage(data, file.name);})
        }else{
            const formdata = new FormData();
            formdata.append("application", file);
            fetch('/uploads/files/', {
                method: 'post',
                body: formdata
            }).then(res => res.json())
                .then(data => {
                    addFile(data, file.name);
                });
        }
    }

    const addImage = (imagepath, alt) => {
        let curPos = stArticleField.selectionStart;
        let textToInsert = `\r![${alt}](${imagepath})\r`;
        stArticleField.value = stTitleField.value.slice(0, curPos) + textToInsert + stArticleField.value.slice(curPos);

    }

    const addFile = (filepath, alt) =>
    {
        let curPos = stArticleField.selectionStart;
        let textToInsert = `<a href="${filepath}" download>\r${alt}\r</a>`;
        console.log(textToInsert);
        stArticleField.value = stArticleField.value.slice(0, curPos) + textToInsert + stArticleField.value.slice(curPos);
    }

    publishBtn.addEventListener('click', () =>{
        if(stArticleField.value.length && stTitleField.value.length)
        {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let cardTitle = stTitleField.value.split(" ").join("-");
            let id = '';
            for (let i =0; i < 4; i++)
            {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            let docName = `${cardTitle}-${id}`;



            db.collection("students").doc(docName).set({
                title: stTitleField.value,
                article: stArticleField.value,
            })
                .then(() => {
                    location.hstorageRef = `/${docName}`;
                })
                .catch((err => {
                    console.error(err);
                }))
        }
    })

});