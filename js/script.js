'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  console.log('Remove active link!');
}

  /* [IN PROGRESS] add class 'active' to the clicked link */

clickedElement.classList.add('active');
console.log('Add active link!');

console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.posts article.active');
console.log('Find active post');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}

  /* get 'href' attribute from the clicked link */

  const href = clickedElement.getAttribute('href');


  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(href);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector('.list.titles');
  titleList.innerHTML = '';

  /* for each article */

  const allArticles = document.querySelectorAll('.post')
  for(let article of allArticles){  
    /* get the article id */
    const id = article.getAttribute('id');

    /* find the title element */

    const title = article.querySelector('.post-title').innerHTML

    /* create HTML of the link */

    const linkHTML = '<li><a href="#'+ id +'"><span>'+ title +'</span></a></li>';
          

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;



    }
const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

}

generateTitleLinks();