//Variables
const totalPagesArray = [];
const totalPostsArray = [];
const totalUsersArray = [];
const VISITSMULTIPLR = 105;

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
    setUserName();
    //Ajax Request for registered Users
    getData('GET', 'http://jsonplaceholder.typicode.com/users').then(function(data){
        let dataArray = JSON.parse(data);
        setTotalUsersArray(dataArray);
    }).catch(function(err){
        console.log(err);
    });
    //Ajax Request for total Posts in Site
    getData('GET', 'https://jsonplaceholder.typicode.com/posts').then(function(data){
        let dataArray = JSON.parse(data);
        setTotalPostsArray(dataArray);
    }).catch(function(err){
        console.log(err);
    });
    //Ajax Request for total Pages in Site
    getData('GET', './resources/jsonFiles/pages.json').then(function(data){
        let dataArray = JSON.parse(data);
        setTotalPagesArray(dataArray);
    }).catch(function(err){
        console.log(err);
    });
    
}

function setUserName(){
    //adds number class to span element and adds the user entered in logni.html
    targetUserName.classList.add('numbers');
    targetUserName.innerHTML = sessionStorage.getItem('userName');
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

function getData(method, url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open(method, url);
        //if request is sucssesful 
        request.onload = function(){
            if(this.status >= 200 && this.status < 300){
                resolve(request.response);
            }else{
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        };
        //if request fails
        request.onerror = function(){
            reject({
                status: this.status,
                statusText: this.statusText
            });
        };
        request.send();
    });
}

function setTotalUsersCounter(){
    let totalSiteUsers = totalUsersArray.length;
    //displays the total number of users in the site.
    numberOfUsers.innerHTML = totalSiteUsers;
    asideUserCounter.innerHTML = totalSiteUsers;
}

function setTotalPostsCounter(){
    let totalSitePosts = totalPostsArray.length;
    //displays the total number of posts in the site.
    numberOfPosts.innerHTML = totalSitePosts;
    asidePostsCounter.innerHTML = totalSitePosts;
    
}

function setTotalPagesCounter(){
    let totalSitePages = totalPagesArray.length;
    //displays the total number of pages in the site.
    numberOfPages.innerHTML = totalSitePages;
    asidePagesCounter.innerHTML = totalSitePages;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setTotalVisitsCounter(){
    let totSiteUsrs = totalUsersArray.length;
    let totVisUsrs = totSiteUsrs * VISITSMULTIPLR;
    let formattedTotVisUsrs = '';
    //inserts a hypothetical number of user on the site, bases on total number of users.
    formattedTotVisUsrs = numberWithCommas(totVisUsrs);
    numberOfVisists.innerHTML = formattedTotVisUsrs;
}

function setTotalUsersArray(array){
    for (let item of array) {
        //parses objects to be stored in localstorage
        //localStorage.setItem("userObject", JSON.stringify(item));
        //populates local users array with imported data
        totalUsersArray.push(item);
    }
    //stores array of user objects into local sotrage
    localStorage.setItem('storedUsersArray', JSON.stringify(totalUsersArray));
    //populates latest Users table and counters por posts and pages respectively
    setLatestUsersTable(latestUsersTab,totalUsersArray);
    setTotalUsersCounter();
    setTotalVisitsCounter();
    setTotalPostsCounter();
    setTotalPagesCounter();
}

function setTotalPostsArray(array){
    for (let item of array) {
        //parses objects to be stored in localstorage
        //localStorage.setItem("postObject", JSON.stringify(item));
        //populates local posts array with imported data
        totalPostsArray.push(item);
    }
    //stores array of posts objects into local sotrage
    localStorage.setItem('storedPostsArray', JSON.stringify(totalPostsArray));

}

function setTotalPagesArray(array){
    for (let item of array) {
        //parses objects to be stored in localstorage
        //localStorage.setItem("pageObject", JSON.stringify(item));
        //populates local pages array with imported data
        totalPagesArray.push(item);
    }
    //stores array of posts objects into local sotrage
    localStorage.setItem('storedPagesArray', JSON.stringify(totalPagesArray));
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

/*function targetArray(type){
    //returns an array of objects that is stored in local storage depending on the passed parameter
    let existingEntriesArray;
    if(type == users){
        existingEntriesArray = JSON.parse(localStorage.getItem("storedUsersArray"));
        //if the retrieved array is empty, return an empty array
        if(existingEntriesArray == null){
            existingEntriesArray = [];
        }
    }else if(type == posts){
        existingEntriesArray = JSON.parse(localStorage.getItem("storedPostsArray"));
        if(existingEntriesArray == null){
            existingEntriesArray = [];
        }
    }else if(type == pages){
        existingEntriesArray = JSON.parse(localStorage.getItem("storedPagesArray"));
        if(existingEntriesArray == null){
            existingEntriesArray = [];
        }
    }
    //returns array
    return existingEntriesArray;
}*/

function addNewUser(){
    //assigns the array to work with
    let localStorageUsersArray = JSON.parse(localStorage.getItem("storedUsersArray"));
    if(localStorageUsersArray == null){
        localStorageUsersArray = [];
    }
    let counter = localStorageUsersArray.length++;
    let newUName = newUserName.value;
    let newUuser = newUserUsername.value;
    let newUEmail = newUserEmail.value;
    //creates new user object with data from modal
    let newUserEntry = {
        "id": counter,
        "name": newUName,
        "username": newUuser,
        "email": newUEmail
    }
    //adds new user to local array 
    totalUsersArray.push(newUserEntry);
    console.log(totalUsersArray);
    //stores new object in local storage array
    localStorage.setItem("newUserStored", JSON.stringify(newUserEntry));
    localStorageUsersArray.push(newUserEntry);
    localStorage.setItem("storedUsersArray", JSON.stringify(localStorageUsersArray));
    setTotalUsersCounter();
}

function clearAllStorage(){
    localStorage.clear();
}



