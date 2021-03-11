// Dom Variables
let input = document.getElementsByClassName("input")[0],

    inputValue,

    gallery = document.getElementsByClassName("gallery")[0],

    pagination = document.getElementsByClassName("pagination")[0],

    // Data Variables
    myRequest,

    myData,

    pageCount;

// Events

input.addEventListener("keypress", mainFn)

/**************************************************************************************************/

//
function mainFn(event) {

    inputValue = input.value.trim().replaceAll(' ', '+');

    if (inputValue == '') return false

    //
    else {

        //
        if (event.keyCode == 13) {

            myURL = `https://pixabay.com/api/?key=20578306-ef19e84331fe6374ff78e28aa&q=${inputValue}&safesearch=true&image_type=photo&per_page=50`

            //
            getData()

        }

    }

}

/**************************************************************************************************/

// function to get data from url based ou user input
function getData() {

    myRequest = new XMLHttpRequest()

    myRequest.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            myData = JSON.parse(this.responseText).hits,

                pageCount = JSON.parse(this.responseText).totalHits / 50;

            // if there's no data
            if (myData == '') gallery.innerHTML = `<center>No Images Found, Try Again.!</center>`

            // if data is found
            else {

                // display images
                showImages(myData, gallery)

                // set links to pages related to url
                toGetPagesNum(pageCount, pagination, `${this.responseURL}`)

                // allow click on pages' links
                newPageFn()

            }

        }
    }

    myRequest.onerror = function () {
        throw "Request Failed"
    }

    myRequest.open("GET", myURL, true)

    myRequest.send()

}

/**************************************************************************************************/

// function to display data in dom
function showImages(array, whereToShow) {

    // clear div if not empty
    whereToShow.innerHTML = '';

    array.forEach((item) => {

        let image = item.webformatURL,

            tags = item.tags.split(',').map((item) => `<span class='oneTag'>${item.trim()}</span>`).join(' ');

        whereToShow.innerHTML +=
            `<div><img src='${image}' alt='image' onclick='getImageID(${item.id})' oncontextmenu='getImageID(${item.id})'><ul>${tags}</ul></div>`

        //
        getAllTags()

    })

}

/**************************************************************************************************/

// function to get id of an image clicked by user to view in a new page
function getImageID(id) {

    let theImage = myData.find((item) => item.id == id)

    localStorage.setItem('theImage', JSON.stringify(theImage))

    window.open('singleImage.html', '_blank')

}

/**************************************************************************************************/

// function to get every tag
function getAllTags() {

    let oneTag = [...document.getElementsByClassName('oneTag')]

    oneTag.forEach((singleTag) => {

        // on click on any tag
        singleTag.onclick = function () {

            let setNewSearch = singleTag.innerText.replaceAll(' ', '+');

            // scroll back to top of the page
            document.body.scrollTop = 0;

            document.documentElement.scrollTop = 0;

            // set new url
            myURL = `https://pixabay.com/api/?key=20578306-ef19e84331fe6374ff78e28aa&q=${setNewSearch}&safesearch=true&image_type=photo&per_page=50`

            // get data based on the new url
            getData()

        }

    })

}

/**************************************************************************************************/

// function to get links of pages related to url
function toGetPagesNum(count, whereToDisplay, whatToHref) {

    whereToDisplay.innerHTML = '';

    for (let i = 1; i <= count + 1; i++) {

        // display it in don
        whereToDisplay.innerHTML +=

            `<p myHref="${whatToHref}&page=${i}" class='newPage'>${i}</p>`

    }

}

/**************************************************************************************************/

// function to allow clicking on any link of pages
function newPageFn() {

    let newPageAnchor = [...document.getElementsByClassName('newPage')];

    newPageAnchor.forEach((anchor) => {

        // get 'myHref' attribute
        let pageNum = anchor.getAttribute('myHref')

        // on click
        anchor.addEventListener("click", function () {

            // scroll back to top of the page
            document.body.scrollTop = 0;

            document.documentElement.scrollTop = 0;

            // set new url based on user click
            myURL = `${pageNum}`

            // get new data
            getData()

        })

    })

}

/**************************************************************************************************/