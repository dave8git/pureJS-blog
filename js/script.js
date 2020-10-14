'use strict';

const titleClickHandler = function (event) {
  const clickedElement = this;
  event.preventDefault();
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts .article.active');
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
      const htmlTag = '<li><a href="#tag-' + tag  + '">' + tag + '</a></li> ';
      html += htmlTag;
      if(allTags.indexOf(htmlTag) == -1) {
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

}

function addClickListenersToTags() {
  const allClickableTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log('allClickableTags', allClickableTags);
  for (let clickableTag of allClickableTags) {
    clickableTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();
