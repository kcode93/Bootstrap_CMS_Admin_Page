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
const updatePageData = document.querySelector('#updatePageData');

//Events
document.addEventListener('DOMContentLoaded', onLoad);
logOut.addEventListener('click', clearAllStorage);
updatePageData.addEventListener('click', updatePageData);

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

function setPublishedStatus(value) {
    if (value == true) {
        //returns CHECK awesome icon if page was published
        return true;
    } else {
        //returns X awesome icon if page was not published
        return false;
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

function pullTargetPageData(){
    let targetPage = localStorage.getItem('targetToEdit');
    let localTotalPagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
    for (let page of localTotalPagesArray){
        if(page.id == targetPage){
            pageTitle.value = page.title;
            pageBody.value = page.body;
            pagePublished.checked = setPublishedStatus(page.published);
            pageTags.value = page.metaTags;
            pageDescriptions = page.metaDescription;
        }
    }
}

function setInitialValues() {
    //pull local sotorage array of users
    setTotalUsersCounter();
    setTotalPostsCounter();
    setTotalPagesCounter();
}

function updatePageData(){
    alert('sho');
}

function clearAllStorage() {
    localStorage.clear();
}
