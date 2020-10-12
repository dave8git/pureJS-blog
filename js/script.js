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

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';

const generateTitleLinks = function(event) {
    let titleList = document.querySelector(optTitleListSelector); 
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector); 
    let html = ''; 
    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        html += linkHTML; 
        console.log(html);
    }
    titleList.insertAdjacentHTML('beforeend', html);
    const links = document.querySelectorAll('.list a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();




