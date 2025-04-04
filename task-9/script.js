const content = document.getElementById('content');
const loading = document.getElementById('loading');

let page = 1;
let isFetching = false;

async function fetchData(){
    if(isFetching) return;

    isFetching=true;
    loading.style.display = "block";

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
        const data = await response.json();
        data.forEach(post => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
            content.appendChild(div);
        }); 
        page++;
    } catch (error) {
        console.error(`Error : ${error.message}`);
    }finally {
        isFetching = false;
        loading.style.display = "none";
    }
}

function handleScroll(){
    // if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) { // fetching before 50px
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchData();
    }
}

fetchData();

document.addEventListener('scroll',handleScroll);