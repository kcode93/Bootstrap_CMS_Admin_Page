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
const saveChangesBtn = document.querySelector('#updatePageData');

//Events
document.addEventListener('DOMContentLoaded', onLoad);
logOut.addEventListener('click', clearAllStorage);
saveChangesBtn.addEventListener('click', updatePageData);

//Functions
function onLoad() {
    //implements CKEditor
    //CKEDITOR.replace('editor1');
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
        //returns a CHECKED checkbox if page was published
        return true;
    } else {
        //returns a UNCHECKED checkbox if page was not published
        return false;
    }
}

function setTotalUsersCounter() {
    //pulls the local storage array fo Users and determines the # of stored users
    let localTotalUsersArray = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    let totalSiteUsers = localTotalUsersArray.length;
    //displays the total number of users in the site.
    asideUserCounter.innerHTML = totalSiteUsers;
}

function setTotalPostsCounter() {
    //pulls the local storage array fo Posts and determines the # of stored users
    let localTotalPostsArray = JSON.parse(localStorage.getItem("storedPostsArray") || []);
    let totalSitePosts = localTotalPostsArray.length;
    //displays the total number of posts in the site.
    asidePostsCounter.innerHTML = totalSitePosts;

}

function setTotalPagesCounter() {
    //pulls the local storage array fo Pages and determines the # of stored users
    let localTotalPagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
    let totalSitePages = localTotalPagesArray.length;
    //displays the total number of pages in the site.
    asidePagesCounter.innerHTML = totalSitePages;
}

function pullTargetPageData(){
    //pulls the target page ID from local storage and pulls the total pages local storage array
    let targetPage = localStorage.getItem('targetToEdit');
    let localTotalPagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
    //loops thru array of apges and displays data by pulling it form the target page only
    for (let page of localTotalPagesArray){
        if(page.id == targetPage){
            pageTitle.value = page.title;
            pageBody.value = page.body;
            pagePublished.checked = setPublishedStatus(page.published);
            pageTags.value = page.metaTags;
            pageDescriptions.value = page.metaDescription;
        }
    }
}

function setInitialValues() {
    //sets the initial counters for all the users, pages and posts
    setTotalUsersCounter();
    setTotalPostsCounter();
    setTotalPagesCounter();
    pullTargetPageData();
}

function updatePageData(){
    
}

function clearAllStorage() {
    //deltes all the saved data
    localStorage.clear();
}
