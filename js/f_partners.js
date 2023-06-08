document.addEventListener('DOMContentLoaded', function () {

    const pagination = document.querySelector('.pagination_element');
    const pag_nav = document.getElementById('pagination_nav');

    let elCount = 0;
    const maxCount = 100;
    let currentNode = 1;

    pagination.innerHTML += `<div class="partner-section active" id="${currentNode}"></div>`

    db.collection("f_partners").get().then((blogs) => {
        blogs.forEach(blog => {
            if (elCount < maxCount)
            {
                createPartner(blog);
                elCount++;
            }
            else
            {
                elCount = 1;
                currentNode++;
                pagination.innerHTML += `<div class="partner-section" id="${currentNode}"></div>`;
                createPartner(partner);
            }
        })
    })

    const createPartner = (partner) =>
    {
        let blogSection = document.getElementById(`${currentNode}`)
        const data = partner.data();
        blogSection.innerHTML += `<div class="blog-card" id="${partner.id}">
            <img src="${data.bannerImage}" class="blog-image" id="img-${partner.id}">
            <a  href=${data.source}" target="_blank" class="blog-title">${data.title}</a>
            <p id ="text-${partner.id}" class="text-hidden">${data.article}</p>
            </div>`;
    }

});
