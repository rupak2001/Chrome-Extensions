mailText = null;
var txt =
  "Welcome to Spam Police !! \n \n please open a mail in gmail then scan again. . .";
var i = 0;

document.getElementById("scan_btn").addEventListener("click", async () => {
  document.getElementById("outmsg").classList.add("d-none")

  await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "scrapdata" }, (res) => {
      mailText = res;
      if(!mailText){
        document.getElementById("status").innerHTML = ""
        i = 0
        statusText()
      }
      else if (mailText.message == "1") {
        txt = `Discovered Data:\n Message Size:  ${mailText.text.split(" ").length} words \n No. Of Images: ${mailText.images.length}\n
        Click On "Check Mail" to Predict
        `;

        setTimeout(()=>{
          document.getElementById("predict").classList.remove("disabled")
          document.getElementById("scan_btn").innerHTML = 'Re-Scan <i class="bi bi-arrow-clockwise"></i>'
        },2000)
      }

      document.getElementById("status").innerHTML = ""
      i = 0
      statusText()
    });
  });
});

document.getElementById("predict").addEventListener("click",()=>{
  document.getElementById('predict').classList.add("d-none")
  document.getElementById('pred_loader').classList.remove("d-none")

  // setTimeout(()=>{
    chrome.runtime.sendMessage({action:"predict",data:mailText},(res)=>{
      document.getElementById("outmsg").classList.remove("d-none")
      if(res == 1){
        document.getElementById("outmsg").style.backgroundColor = "#E64848"
        document.getElementById("pResult").innerHTML = 'Spam Mail <i class="bi bi-exclamation-triangle-fill"></i>'
      }
      if(res == 0){
        document.getElementById("outmsg").style.backgroundColor = "#003366"
        document.getElementById("pResult").innerHTML = 'Not a Spam Mail <i class="bi bi-shield-fill-check"></i>'
      }

      if(res == -1){
        document.getElementById("outmsg").style.backgroundColor = "#E64848"
        document.getElementById("pResult").innerHTML = 'Server Error <i class="bi bi-bar-chart"></i></i>'
      }

      setTimeout(()=>{
        document.getElementById('predict').classList.remove("d-none")
        document.getElementById('pred_loader').classList.add("d-none")

        txt = "Process is Now Complete"
        document.getElementById("predict").classList.add("disabled")
        document.getElementById("status").innerHTML = ""
        i = 0
        statusText()
      },100)
    })
  
  
})


function statusText() {
  if (i < txt.length) {
    document.getElementById("status").innerHTML += txt.charAt(i);
    i++;
    setTimeout(statusText, 20);
  }
}
