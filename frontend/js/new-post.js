const API_URL = "http://localhost:3000/api/posts";

const submitNewPost = () => {
    const title = document.getElementById("form-post-title").value;
    const content = document.getElementById("form-post-content").value;
    const img = document.getElementById("form-post-image");

    let data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("post-image", img.files[0]);

    fetch(API_URL, {
        method: "POST",
        body: data
    }).then(() => {
        setTimeout(() => { //redirect after a certain time to make sure the json file is not busy.
            window.location.href ="index.html";
        },1000); 
    })
}