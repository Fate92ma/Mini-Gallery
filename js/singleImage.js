// Dom Variables
let singleImage = document.getElementsByClassName('singleImage')[0],

    // Data Variables
    getSavedImageId = localStorage.getItem('theImage'),

    singleObject;

// Events

window.addEventListener("load", isImageFound)

/**************************************************************************************************/

// function to ckeck localStorage
function isImageFound() {

    // if there's id saved in localStorage
    if (getSavedImageId) {

        singleObject = JSON.parse(getSavedImageId);

        // display its data
        mySingleImage(singleObject, singleImage)

    }

    // if no id found
    else {

        singleImage.innerHTML = `<center>Click On Any Image To View In This Page</center>`

    }

}

/**************************************************************************************************/

// function to display image data in dom 
function mySingleImage(object, whereToShow) {

    whereToShow.innerHTML = `<img src="${object.largeImageURL}" alt="image">

<div>
<p><strong>Width </strong><span>${object.imageWidth}</span></p>
<p><strong>Height </strong><span>${object.imageHeight}</span></p>
<p><strong>Size </strong><span>${object.imageSize}</span></p>
</div>

    <div>
<p><strong>Views </strong><span>${object.views}</span></p>
<p><strong>Downloads </strong><span>${object.downloads}</span></p>
<p><strong>Favorites </strong><span>${object.favorites}</span></p>
</div>`

}

/**************************************************************************************************/