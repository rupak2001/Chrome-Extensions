var res = []

function loadContent() {
    var imgs = document.getElementsByTagName("img")
    res = []
    for (var i = 0; i < imgs.length; i++) {
        if (!imgs[i].src == '') {
            res.push({ "link": imgs[i].src, "desc": imgs[i].alt })
            addLabel(imgs[i], i + 1)
        }
    }
}

function addLabel(ele, code) {
    if (!document.getElementById("ExtInsertedLabel" + code)) {
        var divn = document.createElement('h5')
        divn.setAttribute('class', "capDiv")
        divn.setAttribute('id', "ExtInsertedLabel" + code)
        divn.style.backgroundColor = 'black'
        // divn.style.width="3rem"
        divn.style.height = "2rem"
        divn.style.color = "white"
        divn.style.textAlign = "center"
        divn.style.margin = 0
        divn.style.padding = "0.5rem"
        divn.style.position = "absolute"
        divn.style.zIndex = "1000"
        divn.innerHTML = code
        ele.parentNode.insertBefore(divn, ele)
    }

}





chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
    if (request.action == "loadData") {
        loadContent()
        sendResponse(res)
    }

    if (request.action == "deleteLabels") {
        var labelClass = document.getElementsByClassName("capDiv")

        while (labelClass.length > 0) {
            labelClass[0].remove()
        }
    }
})
