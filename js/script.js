'use strict'

/*
document.getElementById('test-button').addEventListener('click', function(){
const links = document.querySelectorAll('.titles a');
console.log('links:', links);
});
*/

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#article-link-template').innerHTML), 
  tagLink: Handlebars.compile(document.querySelector('#tag-link-template').innerHTML), 
  sidebarTagLink: Handlebars.compile(document.querySelector('#tag-sidebar-link-template').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#author-link-template').innerHTML),
  sidebarAuthorLink: Handlebars.compile(document.querySelector('#author-sidebar-link-template').innerHTML)
}

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
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-'

function generateTitleLinks (customselector='') {
  const titleList = document.querySelector(optTitleListSelector)
  titleList.innerHTML = ''
  const articles = document.querySelectorAll(optArticleSelector+customselector)
  console.log(articles, customselector)
  for (const article of articles) {
    const id = article.getAttribute('id')
    const title = article.querySelector(optTitleSelector).innerHTML
    const linkHTML = templates.articleLink({id: id, title: title})
    titleList.innerHTML = titleList.innerHTML + linkHTML
  }
  const links = document.querySelectorAll('.titles a')
  for (const link of links) {
    link.addEventListener('click', titleClickHandler)
  }
}

generateTitleLinks()

function calculateTagsParams(allTags){
  let min = 999999
  let max = 0
  for (const tag in allTags){
    if(allTags[tag] < min){
      min = allTags[tag]
    }
    if(allTags[tag] > max){
      max = allTags[tag]
    }
  }
  return {
    min:min, 
    max:max
  }
}

function calculateTagClass(count, params){
  const countRange = params.max - params.min;
  const classInterval = countRange/(5-1);
  const classNbr = Math.floor((count-params.min)/classInterval) + 1;
  return 'tag-size-' + classNbr;
}

function generateTags(){
  const allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector)
  for (const article of articles) {
    const tagsWrapper = article.querySelector('.post-tags ul')
    let html = ''
    const dataTags = article.getAttribute('data-tags')
    const tags = dataTags.split(' ')
    for (const tag of tags) {
      const linkTag = templates.tagLink({tag: tag})
      html = html + linkTag
      if(!allTags[tag]){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html
  }
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  let allTagsHTML = ''
  for(let tag in allTags){
    const className = calculateTagClass(allTags[tag],tagsParams)
    allTagsHTML += templates.sidebarTagLink({className: className, tag: tag, count: allTags[tag]})
  }
tagList.innerHTML = allTagsHTML;
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

  const articles = document.querySelectorAll(optArticleSelector)
  const allAuthors = []
   for (const article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector)
    const dataAuthor = article.getAttribute('data-author')
    const linkAuthor = templates.authorLink({dataAuthor: dataAuthor})
    authorWrapper.innerHTML = linkAuthor
    if (!allAuthors.includes(dataAuthor)){
      allAuthors.push(dataAuthor)
    }
  }
  console.log(allAuthors)
  const authorsList = document.querySelector('.sidebar .authors')
  for (const author of allAuthors) {
    const linkAuthor = templates.sidebarAuthorLink({author: author})
    authorsList.innerHTML += linkAuthor
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