//Variables
const AWESOMEICONCHECK = '<i class="fas fa-check"></i>';
const AWESOMEICONX = '<i class="fas fa-times"></i>';
const MOBILEEDITBTN = '<a class="btn bg-primary-color mx-2 editBtn" href="editPage.html"><i class="fas fa-pencil-alt"></i></a>';
const MOBILEDELETEBTN = '<a href="#" class="btn bg-secondary-color mx-2 deleteBtn"><i class="fas fa-trash-alt"></i></a>';

//Selections
const targetUserName = document.querySelector('#loggedUser');
const pagesTable = document.querySelector('#pagesTable');
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
const newPagePublished = document.querySelector('#newPagePublished');
const newPageMetaTags = document.querySelector('#newPageMetaTags');
const newPageMetaDescription = document.querySelector('#newPageMetaDescription');
const logOut = document.querySelector('#logOut');

//Events
document.addEventListener('DOMContentLoaded', onLoad);
btnAddNewUser.addEventListener('click', addNewUser);
btnAddNewPage.addEventListener('click', addNewPage);
btnAddNewPost.addEventListener('click', addNewPost);
logOut.addEventListener('click', clearAllStorage);

//Functions
function onLoad(){
    //implements CKEditor
    CKEDITOR.replace( 'editor1' );
    setUserName();
}

function setUserName(){
    //adds number class to span element and adds the user entered in logni.html
    targetUserName.classList.add('numbers');
    targetUserName.innerHTML = sessionStorage.getItem('userName');
    setInitialValues();
}

function setPublishedAwesomeIcon(value){
    if(value == true){
        return AWESOMEICONCHECK;
    }else{
        return AWESOMEICONX;
    }
}

function createTableRow(tab,a,b,c,d){
    //targets table and adds a new row with the needed values
    const table = tab;
    let mobileEditButton = MOBILEEDITBTN;
    let mobileDeleteButton = MOBILEDELETEBTN;
    let localEditBtn;
    let localDelBtn;
    let row = table.insertRow(-1);
    row.setAttribute('id',d);
    let cell1 = row.insertCell(0);
    //add the scope attribute to the new cell
    cell1.setAttribute('scope','row');
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    //add the numbers class to the cell
    cell3.classList.add('numbers');
    let cell4 = row.insertCell(3);
    cell1.innerHTML = a;
    cell2.innerHTML = setPublishedAwesomeIcon(b);
    cell3.innerHTML = c;
    cell4.innerHTML = `${mobileEditButton} ${mobileDeleteButton}`;
    //targets the new added buttons
    localEditBtn = document.querySelector('.editBtn');
    localDelBtn = document.querySelector('.deleteBtn');
    //adds a click event listener to the edit button
    localEditBtn.addEventListener('click',(d) => {
        //saves the id of the clicked button
        localStorage.setItem('editTargetID', d);
    });
    //adds a click event listener to the delete button
    localDelBtn.addEventListener('click',(d) => {
        //deletes the page from table
        let lcPagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
        lcPagesArray.splice(0,d);
        
        table.deleteRow(d);
        localStorage.setItem('editTargetID', d);
    });


}

function getStringDate(date){
    const PREFIXZERO = '0';
    let stringDate = '';
    //converts the date into a string and add a zero to the number if under 10 to ensure double digits
    if(date < 10){
        stringDate = PREFIXZERO + date.toString();
    }else{
        stringDate = date.toString();
    }
    return stringDate;
}

function getFullCurrentDate(){
    //creates array of months in a year
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currentFullDate = '';
    let currentDate = '';
    let currentMonth = '';
    let stringDate = '';
    //creates new date object
    let d = new Date();
    let numbMonth = d.getMonth();
    let currentYear = d.getFullYear();
    currentDate = d.getDate();
    //ensures that date always has double digits
    stringDate = getStringDate(currentDate);
    //asign meaningful month based on the returned value of getMonth()
    switch (numbMonth) {
        case 0:
            currentMonth = months[0];
            break;
        case 1:
            currentMonth = months[1];
            break;
        case 2:
            currentMonth = months[2];
            break;
        case 3:
            currentMonth = months[3];
            break;
        case 4:
            currentMonth = months[4];
            break;
        case 5:
            currentMonth = months[5];
            break;
        case 6:
            currentMonth = months[6];
            break;
        case 7:
            currentMonth = months[7];
            break;
        case 8:
            currentMonth = months[8];
            break;
        case 9:
            currentMonth = months[9];
            break;
        case 10:
            currentMonth = months[10];
            break;
        case 11:
            currentMonth = months[11];
            break;
        case 12:
            currentMonth = months[12];
            break;
        default:
            break;
    }
    //returns the current date
    return currentFullDate;
}

function getSplittedCurrentDate(){
    let splittedDate = '';
    //gets full date
    let fullDate = getFullCurrentDate();
    //splits the date into mont and date and year
    let monthAndDate = fullDate.substring(0,5);
    let year = fullDate.substring(6);
    let onlyMonth = monthAndDate.substring(0,2);
    //assembles new date with just month and year
    splittedDate = onlyMonth + year;
    return splittedDate;
}

function setTotalUsersCounter(){
    let localTotalUsersArray = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    let totalSiteUsers = localTotalUsersArray.length;
    //displays the total number of users in the site.
    asideUserCounter.innerHTML = totalSiteUsers;
}

function setTotalPostsCounter(){
    let localTotalPostsArray = JSON.parse(localStorage.getItem("storedPostsArray") || []);
    let totalSitePosts = localTotalPostsArray.length;
    //displays the total number of posts in the site.
    asidePostsCounter.innerHTML = totalSitePosts;
    
}

function setTotalPagesCounter(){
    let localTotalPagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
    let totalSitePages = localTotalPagesArray.length;
    //displays the total number of pages in the site.
    asidePagesCounter.innerHTML = totalSitePages;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setInitialValues(){
    //pull local sotorage array of users
    let totalPagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
    let initalTabTarget = pagesTable;
    //populates  Users table and counters por posts and pages respectively
    setPagesTable(initalTabTarget,totalPagesArray);
    setTotalUsersCounter();
    setTotalPostsCounter();
    setTotalPagesCounter();
}

function setPagesTable(tab,array){
    let tabTarget = tab;
    let pageTitle = '';
    let pagePublished = '';
    let pageCreated = '';
    let pageIndexOf = 0;
    let stringPageIndexOf = '';
    //get pages from totalPagesArray and populate pages table
    for (let item of array) {
        pageTitle = item.title;
        pagePublished = item.published;
        pageCreated = item.created;
        stringPageIndexOf = pageIndexOf.toString();
        createTableRow(tabTarget,pageTitle,pagePublished,pageCreated, stringPageIndexOf);
        //keeps tabs of the id counters
        pageIndexOf++;
    }
}

function addNewUser(){
    //assigns the array to work with
    let localStorageUsersArray = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    //creates new user object out of values inserted by new user modal
    let newUJoined = getSplittedCurrentDate();
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
}

function addNewPost(){
    //assigns the array to work with
    let localStoragePostsArray = JSON.parse(localStorage.getItem("storedPostsArray") || []);
    //creates new user object out of values inserted by new user modal
    let newPTitle = newPostTitle.value;
    let newPBody = newPostBody.value;
    let newPCreated = getFullCurrentDate();
    let newPostEntry = {
        "title": newPTitle,
        "body": newPBody,
        "created": newPCreated
    }
    //stores new object in local storage array
    localStoragePostsArray.push(newPostEntry);
    localStorage.setItem("storedPostsArray", JSON.stringify(localStoragePostsArray));
}

function addNewPage(){
    //assigns the array to work with
    let localStoragePagesArray = JSON.parse(localStorage.getItem("storedPagesArray") || []);
    let status  = newPagePublished.checked || false;
    //creates new user object out of values inserted by new user modal
    let newPaTitle = newPageTitle.value;
    let newPaBody = newPageBody.value;
    let newPaCreationDate = getFullCurrentDate();
    let newPaPub = '';
    if(status == true){
        newPaPub = true;
    }else{
        newPaPub = false;
    }
    let newPaMeTag = newPageMetaTags.value;
    let newPaMeDes = newPageMetaDescription.value;
    let newPageEntry = {
        "title": newPaTitle,
        "body": newPaBody,
        "published": newPaPub,
        "metaTags": newPaMeTag,
        "metaDescription": newPaMeDes,
        "created": newPaCreationDate
    }
    //stores new object in local storage array
    localStoragePagesArray.push(newPageEntry);
    localStorage.setItem("storedPagesArray", JSON.stringify(localStoragePagesArray));
}

function clearAllStorage(){
    localStorage.clear();
}