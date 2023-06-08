
let blogId = window.localStorage.getItem("blogId");

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
   
    if(doc.exists)
    {
        setupBlog(doc.data());
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    const article = document.querySelector('.m_content');

    banner.style.backgroundImage = `url(${data.bannerImage})`;
    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    article.innerHTML += data.article;
}
let section = document.querySelector('.m_content')

section.addEventListener("click", function (event){
    let element = event.target;
    console.log(element);
        if (element.tagName === 'IMG')
        {
            element.className === 'article-image active' ? element.classList.remove('active') : element.classList.add('active');
        }
})
