var img_links = [];
var finalMessage = "";

function scrapData() {
  finalMessage = ""
  img_links  = []
  var images = null
  var text_p = null
  var text_h1 = null 
  var text_h2 = null
  var text_h3 = null
  var text_h4 = null
  var text_h5 = null
  var text_h6 = null
  // var text_div = null
  var text_span = null

  try{
    images = document.querySelector(".ii").querySelectorAll("img");
    text_div = document.querySelector(".ii").querySelectorAll("div");
    // text_span = document.querySelector(".ii").querySelectorAll("span");
    // text_p = document.querySelector(".ii").querySelectorAll("p");
    // text_h1 = document.querySelector(".ii").querySelectorAll("h1");
    // text_h2 = document.querySelector(".ii").querySelectorAll("h2");
    // text_h3 = document.querySelector(".ii").querySelectorAll("h3");
    // text_h4 = document.querySelector(".ii").querySelectorAll("h4");
    // text_h5 = document.querySelector(".ii").querySelectorAll("h5");
    // text_h6 = document.querySelector(".ii").querySelectorAll("h6");
  }
  catch(err){
    return {"message":"0"}
  }
  

  store = {}

  for (var i = 0; i < images.length; i++) {
    // if(!store[images[i]]){
      img_links.push(images[i].src);
      // store[images[i]] = 1
    // }
    
  }

  // extractString(text_p);
  // extractString(text_h1);
  // extractString(text_h2);
  // extractString(text_h3);
  // extractString(text_h4);
  // extractString(text_h5);
  // extractString(text_h6);
  extractString(text_div);
  // extractString(text_span);

  var contents = { text: finalMessage, images: img_links,message:"1"};
  return contents;
}

function extractString(tagData) {
  for (var i = 0; i < tagData.length; i++) {
    content = tagData[i].textContent.trim();

    if (content != "") {
      finalMessage += content;
    }
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "scrapdata") {
    var reply = scrapData()
    console.log(reply)
    sendResponse(reply)
  }
});
