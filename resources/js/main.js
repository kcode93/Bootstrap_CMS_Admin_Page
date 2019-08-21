//Variables
const totalPagesArray = [];
const totalPostsArray = [];
const totalUsersArray = [];

//Selection
const targetUserName = document.querySelector('#loggedUser');
const numberOfPages = document.querySelector('#cardNumPages');
const numberOfPosts = document.querySelector('#cardNumPosts');
const numberOfUsers = document.querySelector('#cardNumUsers');
const numberOfVisists = document.querySelector('#cardNumVisits');
const latestUsersTab = document.querySelector('#latestUsersTable');

//Events
document.addEventListener('DOMContentLoaded', onLoad);

//Functions
function onLoad(){
    //implements CKEditor
    CKEDITOR.replace( 'editor1' );
    setUserName();
    getData('GET', 'http://jsonplaceholder.typicode.com/users').then(function(data){
        let dataArray = JSON.parse(data);
        setTotalUsersArray(dataArray);
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
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    cell1.setAttribute('scope','row');
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(4);
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

function setTotalUsersArray(array){
    //populates local users array with imported data
    for (let item of array) {
        totalUsersArray.push(item);
    }
    setLatestUsersTable(latestUsersTab,totalUsersArray);
}

function setTotalPostsArray(array){
    //populates local posts array with imported data
    for (let item of array) {
        totalPostsArray.push(item);
    }
}

function setTotalPagesArray(array){
    //populates local pages array with imported data
    for (let item of array) {
        totalPagesArray.push(item);
    }
}

function setLatestUsersTable(tab,array){
    let tabTarget = 'latest'
    let groundYear = 2010;
    let localYear = '';
    let localName = '';
    let localUserName = '';
    let localEmail = '';
    let dumText = '';
    //get users from totalUsersArray and populate latest users table
    for (let item of array) {
        localName =  item.name;
        localUserName = item.username;
        localEmail = item.email;
        localYear = item.joined || groundYear;
        localTargetTable = getTargetTable(tabTarget);
        //gets the year the users joined, if not available replace value with groundYear
        //createTableRow(tabTarget,localName,localUserName,localEmail,localYear);
        groundYear++;
        dumText+=`name: ${localName}, username: ${localUserName}, email: ${localEmail}, joined: ${localYear}`;
    }
    alert(dumText);
}



