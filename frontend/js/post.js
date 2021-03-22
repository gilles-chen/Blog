const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

const getPostIdParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

const getPost = () => {
    const postId = getPostIdParam();
    fetch(`${API_URL}${postId}`, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) =>{
        buildPost(data);
    })

}

const buildPost = (data) => {
    let blogContent = "";
    blogContent = `
    <div id="individual-post-title">${data.title}</div>
    <div id="individual-post-date">${new Date(parseInt(data.added_date)).toDateString()}</div>
    <div id="individual-post-content">${data.content} </div>
    `;
    document.querySelector("header").style.backgroundImage = `url(${API_BASE_URL}${data.post_image})`;
    document.querySelector(".blog-post").innerHTML = blogContent;
}

