'use strict'

/*
document.getElementById('test-button').addEventListener('click', function(){
const links = document.querySelectorAll('.titles a');
console.log('links:', links);
});
*/

const titleClickHandler = function (event) {
  event.preventDefault()
  const clickedElement = this
  console.log(event)
  const activeLinks = document.querySelectorAll('.titles a.active')
  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active')
  }
  clickedElement.classList.add('active')
  console.log('clickedElement:', clickedElement)
  const activeArticles = document.querySelectorAll('.posts article.active')
  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active')
  }
  const href = clickedElement.getAttribute('href')
  const targetArticle = document.querySelector(href)
  targetArticle.classList.add('active')
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleAuthorSelector = '.post-author'

function generateTitleLinks (customselector='') {
  const titleList = document.querySelector(optTitleListSelector)
  titleList.innerHTML = ''
  const articles = document.querySelectorAll(optArticleSelector+customselector)
  console.log(articles, customselector)
  for (const article of articles) {
    const id = article.getAttribute('id')
    const title = article.querySelector(optTitleSelector).innerHTML
    const linkHTML = '<li><a href="#' + id + '"><span>' + title + '</span></a></li>'
    titleList.innerHTML = titleList.innerHTML + linkHTML
  }
  const links = document.querySelectorAll('.titles a')
  for (const link of links) {
    link.addEventListener('click', titleClickHandler)
  }
}

generateTitleLinks()

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector)

  /* START LOOP: for every article: */
  for (const article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector('.post-tags ul')
    /* make html variable with empty string */
    let html = ''

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags')

    /* split tags into array */
    const tags = dataTags.split(' ')

    /* START LOOP: for each tag */
    for (const tag of tags) {

      /* generate HTML of the link */
      const linkTag = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>'
      html = html + linkTag
    }

    tagsWrapper.innerHTML = html
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
    event.preventDefault()

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '')

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]')

  /* START LOOP: for each active tag link */
  for (const activeTag of activeTags) {
    activeTag.classList.remove('active')
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="'+href+'"]')

  /* START LOOP: for each found tag link */
  for (const tagLink of tagLinks) {
    tagLink.classList.add('active')
  }


    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="'+tag+'"]')
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]')

  /* START LOOP: for each link */
  for (const link of links) {
    link.addEventListener('click', tagClickHandler)
  }

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector)

  /* START LOOP: for every article: */
  for (const article of articles) {
    /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector)

    /* get tags from data-tags attribute */
    const dataAuthor = article.getAttribute('data-author')

    /* generate HTML of the link */
    const linkAuthor = '<li><a href="#author-' + dataAuthor + '"><span>' + dataAuthor + '</span></a></li>'
    
    authorWrapper.innerHTML = linkAuthor
  }
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
    event.preventDefault()

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '')

  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]')

  /* START LOOP: for each active tag link */
  for (const activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active')
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="'+href+'"]')

  /* START LOOP: for each found tag link */
  for (const authorLink of authorLinks) {
    authorLink.classList.add('active')
  }


    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="'+author+'"]')
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#author-"]')

  /* START LOOP: for each link */
  for (const link of links) {
    link.addEventListener('click', authorClickHandler)
  }

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToAuthors();