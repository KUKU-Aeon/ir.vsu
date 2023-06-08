document.addEventListener("DOMContentLoaded", function (){

    const data =
    [
        {Name:"Как все начиналось",Description:"Подготовка специалистов-международников в&nbsp;Воронежском Государственном Университете началась в&nbsp;середине 1990-х годов и&nbsp;осуществлялась в&nbsp;рамках специализации на&nbsp;Историческом факультете.", Date: "1995-2000 гг.", Image: "../img/roadmap/hist.jpg"},
        {Name:"Создание факультета",Description:"Факультет международных отношений был создан в&nbsp;2002 году на&nbsp;базе исторического и&nbsp;экономического факультетов и&nbsp;включал две кафедры: <ul style='list-style-type: circle'><li>Международных отношений и&nbsp;регионоведения</li><li>Международной экономики и&nbsp;внешнеэкономической деятельности</li></ul> В 2012 году создана Кафедра регионоведения и экономики зарубежных стран", Date: "25.01.2002", Image: "../img/roadmap/start.jpg"},
        {Name:"Направления развития",Description:"На&nbsp;факультете сложились и&nbsp;укрепились международные связи с&nbsp;зарубежными университетами. Партнерами Факультета стали Университеты Европы, Северной и&nbsp;Южной Америки, Азии",Date: "", Image: "../img/roadmap/global.jpeg"},
        {Name:"ФМО, где Ф - Family!", Description: "На&nbsp;факультете сформировался слаженный коллектив профессионалов и&nbsp;единомышленников, а&nbsp;сам факультет Международных отношений превратился в&nbsp;одно из&nbsp;самых динамично развивающихся структурных подразделений Воронежского Университета.", Date: "2002&nbsp;&mdash;&nbsp;настоящее время", Image: "../img/ir_vsu.jpg_large"},
    ];


    let block = document.getElementById("roadmap-stage1");
    renderStage(data, block);

    function renderStage(data,container){
        data.forEach((item)=>{
            let image;
            if (item.Image !="")
            {
                image =` <img src="${item.Image}" alt="">`
            }

            container.innerHTML += `<li>
		<div class="roadmap-item">
      
			<div class="roadmap-header">
				${item.Name} 
			</div>
			<div class="roadmap-body">
				${item.Description}
			</div>
			<div class="roadmap-footer">
            
			</div>
		</div>
    <div class="date-placeholder">
			    
			${image}
			${item.Date}
   	</div>
	</li>
`
        });

        container.innerHTML += "<li></li>"

    }


    let roadmap = document.querySelector(".roadmap");

    roadmap.addEventListener('click', function (event){
        event.target.classList.remove('hidden')
    })

})