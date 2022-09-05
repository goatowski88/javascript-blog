'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log(event);
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  const href = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(href);
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';

function generateTitleLinks(){
  const titleList = document.querySelector('.list.titles');
  titleList.innerHTML = '';
  const allArticles = document.querySelectorAll('.post')
  for(let article of allArticles){  
    const id = article.getAttribute('id');
    const title = article.querySelector('.post-title').innerHTML
    const linkHTML = '<li><a href="#'+ id +'"><span>'+ title +'</span></a></li>';
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
  link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();