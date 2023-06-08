document.addEventListener("DOMContentLoaded", function (){
    window.addEventListener("load", function (){
        let nav = document.getElementById('pagination_nav');
        let current = nav.childNodes[0];
        current.classList.add('active');

        nav.addEventListener('click', function (event){
            let current = document.querySelector('li.active');
            current.classList.remove('active');
            current = event.target;
            current.classList.add('active');
            let active_section_1 = document?.querySelector('.blog-section.active');
            let active_section_2 = document?.querySelector('.card-section.active');
            let active_section = active_section_1 == null ? active_section_2 : active_section_1 ;
            console.log(active_section)
            let value = event.target.innerHTML;
            let section = document.getElementById(`${value}`);
            active_section.classList.remove('active');
            section.classList.add('active');
        })
    })
})