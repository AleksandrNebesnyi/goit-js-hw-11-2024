function clearContainer(element) {
    element.innerHTML ='';
    };
    function isHidden(elem) {
      elem.classList.add('is-hidden')
      
  };
  function isVisible(elem) {
      elem.classList.remove('is-hidden')
    
  };
 
    
  export {clearContainer,isHidden,isVisible};