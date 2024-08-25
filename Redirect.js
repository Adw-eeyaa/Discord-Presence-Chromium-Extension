/*const anchor = document.querySelector('.button-class');
document.addEventListener('DOMContentLoaded',()=>{
anchor.addEventListener('click',()=>{
    chrome.runtime.sendMessage({action:'redirect'});
});
});
*/
const anchorPop = document.querySelector('.button-class');
anchorPop.addEventListener('click',()=>{
    chrome.tabs.create({url:"https://github.com/Adw-eeyaa"})
});
