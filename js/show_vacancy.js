
let vacancyId = window.localStorage.getItem("vacancyId");

let docRef = db.collection("vacancys").doc(vacancyId);

docRef.get().then((doc) => {
    console.log(doc.exists);
    if(doc.exists)
    {
        setupBlog(doc.data());
    }
    else
    {
        let docRef = db.collection("internships").doc(vacancyId);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setupBlog(doc.data());
            } else {
                console.log("error")
            }
        });
    }
})

const setupBlog = (data) => {
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');
    const article = document.querySelector('.m_content');
    const corp = document.querySelector('.corp');
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
