const blogSection = document.querySelector('.blog-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop()))
        {
            createBlog(blog);
        }
    })
})

const createBlog = (blog) =>
{
    let data = blog.data();
    blogSection.innerHTML += `<div class="blog-card">
            <img src="${data.bannerImage}" class="blog-image">
            <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
            <a href="/${blog.id}" class="read_more">Подробнее...</a>
        </div>`
}