document.addEventListener('DOMContentLoaded', function () {

    const timetableSection = document.querySelector('.timetable-section');

    db.collection("timetable").get().then((timetable) => {
        timetable.forEach(timetables => {
            if(timetables.id != decodeURI(location.pathname.split("/").pop()))
            {
                createSource(timetables);
            }
        })
    })

    const createSource = (timetables) =>
    {
        const data = timetables.data();
        timetableSection.innerHTML += `<li><a href="${data.source}">${data.name}</a></li>`
    }
});
