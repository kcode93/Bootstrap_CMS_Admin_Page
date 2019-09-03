//Variables
//const totalPagesArray = [];
//const totalPostsArray = [];
//const totalUsersArray = [];
const PRESENTYEAR = 2019;
const VISITSMULTIPLR = 105;
let ajaxFlag = false;

//Selections
const targetUserName = document.querySelector('#loggedUser');
const numberOfPages = document.querySelector('#cardNumPages');
const numberOfPosts = document.querySelector('#cardNumPosts');
const numberOfUsers = document.querySelector('#cardNumUsers');
const numberOfVisists = document.querySelector('#cardNumVisits');
const latestUsersTab = document.querySelector('#latestUsersTable');
const asideUserCounter = document.querySelector('#asideUserCounter');
const asidePostsCounter = document.querySelector('#asidePostsCounter');
const asidePagesCounter = document.querySelector('#asidePagesCounter');
const btnAddNewUser = document.querySelector('#addNewUser');
const btnAddNewPost = document.querySelector('#addNewPost');
const btnAddNewPage = document.querySelector('#addNewPage');
const newUserName = document.querySelector('#newUserName');
const newUserUsername = document.querySelector('#newUserUsername');
const newUserEmail = document.querySelector('#newUserEmail');
const newPostTitle = document.querySelector('#newPostTitle');
const newPostBody = document.querySelector('#newPostBody');
const newPageTitle = document.querySelector('#newPageTitle');
const newPageBody = document.querySelector('#newPageBody');
const newPageMetaTags = document.querySelector('#newPageMetaTags');
const newPageMetaDescription = document.querySelector('#newPageMetaDescription');
const logOut = document.querySelector('#logOut');

//Events
document.addEventListener('DOMContentLoaded', onLoad);
btnAddNewUser.addEventListener('click', addNewUser);
logOut.addEventListener('click', clearAllStorage);

//Functions
function onLoad(){
    //implements CKEditor
    CKEDITOR.replace( 'editor1' );
    //ajaxCalls();
    setUserName();
}

function setUserName(){
    //adds number class to span element and adds the user entered in logni.html
    targetUserName.classList.add('numbers');
    targetUserName.innerHTML = sessionStorage.getItem('userName');
    setInitialValues();
}

function getTargetTable(target){
    //used to get a dynamic target for createTableRow()
    if(target === 'latest'){
        return latestUsersTab;
    }
}

function createTableRow(tab,a,b,c,d){
    //targets table and adds a new row with the needed values
    const targetTable = getTargetTable(tab);
    const table = targetTable;
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    cell1.setAttribute('scope','row');
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell4.classList.add('numbers');
    cell1.innerHTML = a;
    cell2.innerHTML = b;
    cell3.innerHTML = c;
    cell4.innerHTML = d;
}

function setTotalUsersCounter(){
    let localTotalUsersArray = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    let totalSiteUsers = localTotalUsersArray.length;
    //displays the total number of users in the site.
    numberOfUsers.innerHTML = totalSiteUsers;
    asideUserCounter.innerHTML = totalSiteUsers;
}

function setTotalPostsCounter(){
    let localTotalPostsArray = JSON.parse(localStorage.getItem("storedPostsArray") || []);
    let totalSitePosts = localTotalPostsArray.length;
    //displays the total number of posts in the site.
    numberOfPosts.innerHTML = totalSitePosts;
    asidePostsCounter.innerHTML = totalSitePosts;
    
}

function setTotalPagesCounter(){
    let localTotalPagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
    let totalSitePages = localTotalPagesArray.length;
    //displays the total number of pages in the site.
    numberOfPages.innerHTML = totalSitePages;
    asidePagesCounter.innerHTML = totalSitePages;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setTotalVisitsCounter(){
    let localTotSiteUsrs = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    let totSiteUsrs = localTotSiteUsrs.length;
    let totVisUsrs = totSiteUsrs * VISITSMULTIPLR;
    let formattedTotVisUsrs = '';
    //inserts a hypothetical number of user on the site, bases on total number of users.
    formattedTotVisUsrs = numberWithCommas(totVisUsrs);
    numberOfVisists.innerHTML = formattedTotVisUsrs;
}

function setInitialValues(){
    //pull local sotorage array of users
    let totalUsersArray = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    //populates latest Users table and counters por posts and pages respectively
    setLatestUsersTable(latestUsersTab,totalUsersArray);
    setTotalUsersCounter();
    setTotalVisitsCounter();
    setTotalPostsCounter();
    setTotalPagesCounter();
}

function setLatestUsersTable(tab,array){
    let tabTarget = 'latest'
    let groundYear = 2019;
    let localYear = '';
    let localName = '';
    let localUserName = '';
    let localEmail = '';
    //get users from totalUsersArray and populate latest users table
    for (let i = 0; i < 10; i++) {
        localName =  array[i].name;
        localUserName = array[i].username;
        localEmail = array[i].email;
        localYear = array[i].joined || groundYear;
        localTargetTable = getTargetTable(tabTarget);
        //gets the year the users joined, if not available replace value with groundYear
        createTableRow(tabTarget,localName,localUserName,localEmail,localYear);
        groundYear--;
    }
}

function addNewUser(){
    //assigns the array to work with
    let localStorageUsersArray = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    //creates new user object out of values inserted by new user modal
    let newUJoined = PRESENTYEAR;
    let newUName = newUserName.value;
    let newUuser = newUserUsername.value;
    let newUEmail = newUserEmail.value;
    let newUserEntry = {
        "name": newUName,
        "username": newUuser,
        "email": newUEmail,
        "joined": newUJoined
    }
    //stores new object in local storage array
    localStorageUsersArray.push(newUserEntry);
    localStorage.setItem("storedUsersArray", JSON.stringify(localStorageUsersArray));
    //setInitialValues();
}

function clearAllStorage(){
    localStorage.clear();
    ajaxFlag = false;
}





