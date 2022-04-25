
document.addEventListener('DOMContentLoaded', function (){

    const bachelor = document.querySelector('.bachelor');
    const magestry = document.querySelector('.magestry');
    const inputField = document.getElementById('timetable-upload');

    const publishBtn = document.getElementById("4");



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

    const addFile = (filepath, alt) =>
    {
        let curPos = alt.selectionStart;
        let textToInsert = `<a href="${filepath}" download>\r${alt}\r</a>`;
        alt.value = alt.value.slice(0, curPos) + textToInsert + alt.value.slice(curPos);
        console.log(alt.value);
    }

    publishBtn.addEventListener('click', () => {
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let id = '';
        for (let i = 0; i < 4; i++)
        {
            id += letters[Math.floor(Math.random() * letters.length)];
        }
        let docName = `${id}`;
        console.log(docName);


        db.collection("timetable").doc(docName).set({
            title: fileTitle.value,
        })
            .then(() => {
                location.hstorageRef = `/${docName}`;
            })
            .catch((err => {
                console.error(err);
            }))
    });

});