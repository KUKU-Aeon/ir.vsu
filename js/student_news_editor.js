
document.addEventListener('DOMContentLoaded', function (){

    const stTitleField = document.querySelector('.st_title');
    const stArticleField = document.querySelector('.st_m_content');
    const inputField = document.getElementById('file-upload');

    const publishBtn = document.getElementById("3");



    inputField.addEventListener('change', () =>{
        uploadFiles(inputField);
    });

    const uploadFiles = (uploadFile) => {
        const [file] = uploadFile.files;
        const filetype = file.type;
        console.log(file.type);
        if (filetype.includes("image"))
        {
            const uploadTask = storage.ref(`images/${file.name}`).put(file);
            uploadTask
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {

                    let curPos = stArticleField.selectionStart;
                    let textToInsert = `<img  src = "${url}"  class="article-image"/>`;
                    stArticleField.value = stTitleField.value.slice(0, curPos) + textToInsert + stArticleField.value.slice(curPos);
                });
        }
        else
        {
        const uploadFile = storage.ref(`files/${file.name}`).put(file);
        uploadFile
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {

                let curPos = stArticleField.selectionStart;
                if (filetype.includes("video"))
                {
                    let textToInsert = `<video  src = "${url}" controls></video>`
                    stArticleField.value = stArticleField.value.slice(0, curPos) + textToInsert + stArticleField.value.slice(curPos);
                }
                else
                {
                    let textToInsert = `<a  href = "${url}">${file.name}</a>`
                    stArticleField.value = stArticleField.value.slice(0, curPos) + textToInsert + stArticleField.value.slice(curPos);
                }
            })
    }
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
                    location.href = `../pages/education.html`;
                })
                .catch((err => {
                    console.error(err);
                }))
        }
    })

});