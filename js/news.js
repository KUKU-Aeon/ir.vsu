document.addEventListener('DOMContentLoaded', function () {

    const pagination = document.querySelector('.pagination_element');
    const pag_nav = document.getElementById('pagination_nav');

    let elCount = 0;
    const maxCount = 6;
    let currentNode = 1;

    pagination.innerHTML += `<div class="blog-section active" id="${currentNode}"></div>`
    pag_nav.innerHTML += `<li>${currentNode}</li>`

    db.collection("blogs").get().then((blogs) => {
        blogs.forEach(blog => {
            if (elCount < maxCount)
            {
                createBlog(blog);
                elCount++;
            }
            else
            {
               elCount = 1;
               currentNode++;
               pagination.innerHTML += `<div class="blog-section" id="${currentNode}"></div>`;
               pag_nav.innerHTML += `<li>${currentNode}</li>`
               createBlog(blog);
            }
        })
    })

    const createBlog = (blog) =>
    {
        let blogSection = document.getElementById(`${currentNode}`)
        const data = blog.data();
        blogSection.innerHTML += `<div class="blog-card" id="${blog.id}">
            <img src="${data.bannerImage}" class="blog-image">
            <h1 class="blog-title">${data.title.substring(0, 70) + '...'}</h1>
            <a href="../pages/blog.html" target="_blank" class="read_more">Подробнее...</a>
            </div>`;


    }


    pagination.addEventListener('mouseover', function () {
        let cards = document.querySelectorAll(".blog-card");
        cards.forEach(card => {
            card.addEventListener('click', function () {
                window.localStorage.setItem('blogId', card.id);
            })
        })
    })
});
