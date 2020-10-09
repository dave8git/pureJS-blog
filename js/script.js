'use strict'

const titleClickHandler = function(event) {
    const clickedElement = this;
    event.preventDefault();
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts .post.active'); 
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href'); 
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    targetArticle.classList.add('active');
    
}

const links = document.querySelectorAll('.list a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}
