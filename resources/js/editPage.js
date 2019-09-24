//Selections
const targetUserName = document.querySelector('#loggedUser');
const logOut = document.querySelector('#logOut');
const asideUserCounter = document.querySelector('#asideUserCounter');
const asidePostsCounter = document.querySelector('#asidePostsCounter');
const asidePagesCounter = document.querySelector('#asidePagesCounter');
const pageTitle = document.querySelector('#pageTitle');
const pageBody = document.querySelector('#pageBody');
const pagePublished = document.querySelector('#pagePublished');
const pageTags = document.querySelector('#pageTags');
const pageDescriptions = document.querySelector('#pageDes');

//Events
document.addEventListener('DOMContentLoaded', onLoad);
logOut.addEventListener('click', clearAllStorage);

//Functions
function onLoad() {
    //implements CKEditor
    CKEDITOR.replace('editor1');
    setUserName();
}

function setUserName() {
    //adds number class to span element and adds the user entered in logni.html
    targetUserName.classList.add('numbers');
    targetUserName.innerHTML = sessionStorage.getItem('userName');
    setInitialValues();
}

function setPublishedAwesomeIcon(value) {
    if (value == true) {
        //returns CHECK awesome icon if page was published
        return AWESOMEICONCHECK;
    } else {
        //returns X awesome icon if page was not published
        return AWESOMEICONX;
    }
}

function setTotalUsersCounter() {
    let localTotalUsersArray = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    let totalSiteUsers = localTotalUsersArray.length;
    //displays the total number of users in the site.
    asideUserCounter.innerHTML = totalSiteUsers;
}

function setTotalPostsCounter() {
    let localTotalPostsArray = JSON.parse(localStorage.getItem("storedPostsArray") || []);
    let totalSitePosts = localTotalPostsArray.length;
    //displays the total number of posts in the site.
    asidePostsCounter.innerHTML = totalSitePosts;

}

function setTotalPagesCounter() {
    let localTotalPagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
    let totalSitePages = localTotalPagesArray.length;
    //displays the total number of pages in the site.
    asidePagesCounter.innerHTML = totalSitePages;
}