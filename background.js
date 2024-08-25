
chrome.runtime.onInstalled.addListener(()=>{
    console.log('Extension Installed');
})










/*chrome.runtime.OnMessage.addListener((message,sender,sendResponse)=>{
    if(message.action == 'redirect'){
        chrome.tabs.create({url:'https://github.com/Adw-eeyaa'});
    }else{
        console.log("Waiting for Message");
    }
});
*/

chrome.runtime.onMessage.addListener((message)=>{
    if(message && message!='redirect'){
        fetch('http://localhost:3000/update',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(message)
        }).catch(error =>console.error("Error sending data to server:",error));
        
       
         
        }
   
});

