const content = document.getElementById('content');

const routes = {
    "#home" : "<h1>This is Home Section</h1><p>This is a paragraph under home section.</p>",
    "#about-us" : "<h1>This is About Us Section</h1><p>This is a paragraph under about us section.</p>",
    "#services" : "<h1>This is Services Section</h1><p>This is a paragraph under services section.</p>",
    "#contact" : "<h1>This is Contact Section</h1><p>This is a paragraph under contact section.</p>",
};

function loadContent(){
    const hash = window.location.hash || "#home";
    content.innerHTML = routes[hash] || "<h1>Oops! 404 Page Not Found.</h1>"
}

window.onload = loadContent;

window.onhashchange = loadContent;