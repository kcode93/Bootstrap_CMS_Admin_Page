//Variables
const totalPagesArray = [];
const totalPostsArray = [];
const totalUsersArray = [];
const VISITSMULTIPLR = 105;

//Selection
const targetUserName = document.querySelector('#loggedUser');
const numberOfPages = document.querySelector('#cardNumPages');
const numberOfPosts = document.querySelector('#cardNumPosts');
const numberOfUsers = document.querySelector('#cardNumUsers');
const numberOfVisists = document.querySelector('#cardNumVisits');
const latestUsersTab = document.querySelector('#latestUsersTable');
const asideUserCounter = document.querySelector('#asideUserCounter');
const asidePostsCounter = document.querySelector('#asidePostsCounter');
const asidePagesCounter = document.querySelector('#asidePagesCounter');
const addNewUser = document.querySelector('#addNewUser');
const addNewPost = document.querySelector('#addNewPost');
const addNewPage = document.querySelector('#addNewPage');

//Events
document.addEventListener('DOMContentLoaded', onLoad);

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
        localStorage.setItem("userObject", JSON.stringify(item));
        //populates local users array with imported data
        totalUsersArray.push(item);
    }
    //stores array of user objects into local sotrage
    localStorage.setItem('storedUseresArray', JSON.stringify(totalUsersArray));
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
        localStorage.setItem("postObject", JSON.stringify(item));
        //populates local posts array with imported data
        totalPostsArray.push(item);
    }
    //stores array of posts objects into local sotrage
    localStorage.setItem('storedPostsArray', JSON.stringify(totalPostsArray));

}

function setTotalPagesArray(array){
    for (let item of array) {
        //parses objects to be stored in localstorage
        localStorage.setItem("pageObject", JSON.stringify(item));
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

function targetArray(type){
    switch (type) {
        case user:
            return totalUsersArray;
            break;
        case post:
            return totalPostsArray;
            break;
        case page:
            return totalPagesArray;
            break;
        default:
            break;
    }
}

function addNewEntry(type){
    
}



