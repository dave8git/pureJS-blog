'use strict';

const titleClickHandler = function (event) {
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
  console.log('articleSelector', articleSelector);
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optTagsWrapperSelector = '.post-tags .list';
const optAuthorWrapperSelector = ".post-author";
const optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = '') {
  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function generateTags() {
  let allTags = [];
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapper = article.querySelector(optTagsWrapperSelector);
    let html = '';
    const tags = article.getAttribute('data-tags');
    const tagsArray = tags.split(' ');
    for (let tag of tagsArray) {
      const htmlTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      html += htmlTag;
      if (allTags.indexOf(htmlTag) == -1) {
        allTags.push(htmlTag);
      }
    }
    tagsWrapper.insertAdjacentHTML('beforeend', html);
  }
  const tagList = document.querySelector('.tags');
  tagList.innerHTML = allTags.join(' ');
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log(clickedElement);
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + tag + '"]');

  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
    console.log('tagLink', tagLink);
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
  //
}

function addClickListenersToTags() {
  const allClickableTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log('allClickableTags', allClickableTags);
  for (let clickableTag of allClickableTags) {
    clickableTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();


function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const postAuthor = article.querySelector('.post-author');
    let html = '';
    const dataAuthor = postAuthor.getAttribute('data-author');
    html = '<li><a href="#author-' + dataAuthor + '">' + dataAuthor + '</a></li> ';
    postAuthor.insertAdjacentHTML('beforeend', html);
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"');
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  const allClickableAuthors = document.querySelectorAll('a[href^="#author-"]');
  for (let clickableAuthor of allClickableAuthors) {
    clickableAuthor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
