import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImage } from './api-servis';
import makeCardMarkup from './create-markup';
import {clearContainer,isHidden,isVisible} from './helpers'

const STOREGE_KEY='input-value';

const input = document.querySelector('.search-form input');
const searchBtn= document.querySelector('.search-form button');
const gallery = document.querySelector('.gallery');
const loadMoreBtn= document.querySelector('.load-more');

input.addEventListener('input',throttle(onChangeInput,0));
searchBtn.addEventListener('click',onBtnPress);
loadMoreBtn.addEventListener('click',onPressloadMoreBtn);

populateInput();
let query='';
let page =23;

function onChangeInput (event){ 
  query=event.currentTarget.value;  
  localStorage.setItem( STOREGE_KEY,query); 
};

function onBtnPress(event) {  
  event.preventDefault();
  clearContainer(gallery);
  localStorage.removeItem(STOREGE_KEY);
  page=1;
getImgAndCreateMarkup().then(({totalHits})=>{
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`); 
});
   input.value='';
  

};

function populateInput() {
  const storageData=localStorage.getItem(STOREGE_KEY); 
  if (storageData) {    
      input.value=storageData;     
  }
};

function onPressloadMoreBtn() { 
  isHidden(loadMoreBtn);
  getImgAndCreateMarkup().then(({totalHits,page,hits})=>{
    const amountOfPages =totalHits/hits.length;
      if (page>=amountOfPages) {
       Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
       isHidden(loadMoreBtn);
    }
  });
}


 async function getImgAndCreateMarkup() {
   await getImage(query,page).then(({hits,totalHits})=>{   
    gallery.insertAdjacentHTML('beforeend',makeCardMarkup(hits));
    if(hits.length === 0){
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
    }  
    const {height: cardHeight}= gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
   
    page +=1;
    new SimpleLightbox('.gallery a',{
      captionsData:"alt",
      captionPosition:"bottom",
      captionDelay:200,
    });    
    isVisible(loadMoreBtn);     

  }).catch((error)=>{
    console.log(error.message);
     Notiflix.Notify.failure('Please try again');

  });
 return {totalHits,page,hits};
}




;

