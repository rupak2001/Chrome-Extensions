//? donot use async await and also return true at the end to avoid errors

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "predict") {
    console.log(request.data);
    try {
      fetch("http://localhost:8000/checkspam", {
        method: "POST",
        body: JSON.stringify(request.data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          sendResponse(data);
        })
        .catch(()=>{{
          sendResponse(-1)
        }})
    } catch (err) {
      sendResponse(-1);
    }

    return true; //this must be done otherwise the service worker will die
  }
});
