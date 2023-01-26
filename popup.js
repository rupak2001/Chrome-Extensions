var content = null
var no_caption_count = 1;
var total_caption_count = 1;


const sendMessageButton = document.getElementById("sendMessage");
const removeLabelsButton = document.getElementById("removeLabels")

async function fetchFromContent() {
    await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "loadData" }, (res) => {
            content = res
            no_caption_count = 1
            total_caption_count = 1
            document.getElementById("rangeUpper").value = ""
            document.getElementById("rangeLower").value = ""
            document.getElementById("searchLink").value = ""
            showLinks(content)
        });

    })
}

var removeLabels = async () => {
    await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "deleteLabels" });
    })
}

window.onload = fetchFromContent
sendMessageButton.onclick = fetchFromContent
removeLabelsButton.onclick = removeLabels



var showLinks = (content) => {
    if (content != null) {
        var container = document.getElementById("container")

        var listtag = document.createElement("ol")
        listtag.type = "1"
        listtag.style.fontSize = "large"

        container.innerHTML = ''
        content.map((ele) => {
            var listEle = document.createElement('li')
            var linkobj = document.createElement('a')
            var openBtn = document.createElement('a')
            var openImg = document.createElement('img')

            listEle.id = total_caption_count++;
            listEle.style.borderTop = "1px solid tomato"
            listEle.style.borderBottom = "1px solid tomato"
            listEle.style.paddingTop = "0.5rem"
            listEle.style.paddingBottom = "0.5rem"
            linkobj.style.textDecoration = "none"

            if (ele.link.substring(0, ele.link.indexOf('/')) == "data:image") {
                linkobj.download = "image.png"
                linkobj.href = ele.link
            }
            else {
                linkobj.download = ele.link
                linkobj.href = ele.link
            }




            listEle.style.marginTop = "1rem"
            if (ele.desc == "") {
                linkobj.innerHTML = "no caption " + no_caption_count
                ++no_caption_count
            }
            else linkobj.innerHTML = ele.desc.substring(0, 20) + "...."



            openBtn.setAttribute('class', "openBtn")
            openBtn.href = ele.link
            openBtn.setAttribute("target", "_blank")
            openImg.src = "./img/openLink.svg"
            openImg.width = 15
            openBtn.append(openImg)


            listEle.appendChild(linkobj)
            listEle.appendChild(openBtn)
            listtag.appendChild(listEle)
        })
        container.appendChild(listtag)
        container.appendChild(document.createElement('br'))

    }
}


document.querySelector("#searchLink").addEventListener('change', (e) => {
    var ind = e.target.value
    var searchEle = document.getElementById(ind)

    if (searchEle) {
        searchEle.scrollIntoView()
    }
    else {
        document.getElementById(1).scrollIntoView()
        document.getElementById("searchLink").value = ""
    }
})

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

document.querySelector("#downloadAll").addEventListener('click', () => {
    if (content != null) {
        var upRange = document.getElementById("rangeUpper").value
        var downRange = document.getElementById("rangeLower").value
        console.log(upRange + " " + downRange)
        var cLength = content.length
        if (downRange - 1 >= 0 && upRange < cLength) {
            for (var dRange = downRange - 1; dRange < upRange; dRange++) {
                if (content[dRange].link.substring(0, content[dRange].link.indexOf('/')) == "data:image") {
                    downloadURI(content[dRange].link, "imageLoop.png")
                }
                else {
                    downloadURI(content[dRange].link)
                }

            }
        }
        else if (upRange == "" && downRange == "") {
            for (var dRange = 0; dRange < content.length; dRange++) {
                if (content[dRange].link.substring(0, content[dRange].link.indexOf('/')) == "data:image") {
                    downloadURI(content[dRange].link, "imageLoop.png")
                }
                else {
                    downloadURI(content[dRange].link)
                }
            }
        }
        else if (downRange - 1 >= 0 && downRange - 1 < content.length && upRange == "") {
            for (var dRange = downRange; dRange < content.length; dRange++) {
                if (content[dRange].link.substring(0, content[dRange].link.indexOf('/')) == "data:image") {
                    downloadURI(content[dRange].link, "imageLoop.png")
                }
                else {
                    downloadURI(content[dRange].link)
                }
            }
        }
        else {
            document.getElementById("rangeUpper").value = ""
            document.getElementById("rangeLower").value = ""
        }
    }
})

