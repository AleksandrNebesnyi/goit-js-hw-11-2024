export default function makeCardMarkup(Items) {
    return Items.map((item)=>{
      const {webformatURL,largeImageURL,tags,likes,views,comments,downloads}=item;
      return`<div class="photo-card">
      <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
    
    <div class="info">
      <p class="info-item">
        <b>likes:${likes}</b>
      </p>
      <p class="info-item"><b>views:${views}</b>
      </p>
      <p class="info-item">
        <b>comments:${comments}</b>
      </p>
      <p class="info-item">
        <b>downloads:${downloads}</b>
      </p>
    </div>
  </div>`
  
    }).join('');  
  };