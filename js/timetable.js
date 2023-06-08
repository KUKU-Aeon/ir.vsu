document.addEventListener('DOMContentLoaded', function (){

    let textField = document.querySelectorAll('.timetable');

    const publishBtn = document.getElementById("4");
    const ClearBtn = document.getElementById('clear');

    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    ClearBtn.addEventListener('click', Clear)

    publishBtn.addEventListener('click', () =>{

        textField.forEach(field => {
            if(field.value.length)
            {
                let letters = 'abcdefghijklmnopqrstuvwxyz';
                let timetableTitle = field.placeholder.split(" ").join("-");
                let id = '';
                for (let i =0; i < 4; i++)
                {
                    id += letters[Math.floor(Math.random() * letters.length)];
                }
                let docName = `${timetableTitle}-${id}`;
                let date = new Date();

                db.collection("timetable").doc(docName).set({
                    name: field.placeholder,
                    source: field.value,
                })
                    .then(() => {
                        location.href = "../pages/education.html"
                    })
                    .catch((err => {
                        console.error(err);
                    }))
            }
        })
    })

    function Clear(){
        db.collection("timetable").get().then((timetable) => {
            timetable.forEach(timetables => {
                console.log(timetables.id)
                db.collection("timetable").doc(timetables.id).delete().then(() => {
                    alert("Расписание успешно удалено, можете опубликовать новое расписание")
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            })
        })
    }

});