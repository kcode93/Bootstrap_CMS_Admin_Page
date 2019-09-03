//variables
const CURRENTYEAR = 2019;

//Selection
const userNameInput = document.querySelector('#pageUserName');
const loginBtn = document.querySelector('#btnLogin');
//Events
document.addEventListener('click',getUserName);
//Function
function getUserName(){
    ajaxCalls();
    sessionStorage.setItem('userName',userNameInput.value);
}



function setContainerArrays(array, i){
    let containerArray = [];
    let counter = '';
    let lsArrayName = '';
    for (let item of array) {
        //populates local users array with imported data
        containerArray.push(item);
    }
    counter = i;
    //stores array of user objects into local sotrage
    if(counter == 0){
        lsArrayName = 'storedUsersArray';
        localStorage.setItem(lsArrayName, JSON.stringify(containerArray));
        setRandomDateArray();
    }else if(counter == 1){
        lsArrayName = 'storedPostsArray';
        localStorage.setItem(lsArrayName, JSON.stringify(containerArray));
    }else if (counter == 2){
        lsArrayName = 'storedPagesArray';
        localStorage.setItem(lsArrayName, JSON.stringify(containerArray));
    }
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

function ajaxCalls(){
    //Ajax Request for registered Users
    let source = '';
    let numbRequests = 3;
    for(let i = 0; i < numbRequests; i++){
        if(i == 0){
            source = 'http://jsonplaceholder.typicode.com/users';
        }else if(i == 1){
            source = 'https://jsonplaceholder.typicode.com/posts';
        }else {
            source = './resources/jsonFiles/pages.json';
        }
        getData('GET', source).then(function(data){
            let dataArray = JSON.parse(data);
            setContainerArrays(dataArray, i);
        }).catch(function(err){
            console.log(err);
        });
    }
}

function setRandomDate(year){
    //creates array of months in a year
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let randomNumber = Math.floor((Math.random() * 11) + 0);
    let currentMonth = '';
    let currentYear = year;
    let randomDate = '';
    //asign meaningful month based on the returned value of getMonth()
    switch (randomNumber) {
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
    randomDate = `${currentMonth} ${currentYear}`;
    return randomDate;
}

function setRandomDateArray(){
    let thisYear = CURRENTYEAR;
    let locUsrArr = JSON.parse(localStorage.getItem("storedUsersArray") || []);
    let localRandomDates = [];
    let newDateEntry = '';
    for(let i = 0; i < locUsrArr.length; i++){
        newDateEntry = setRandomDate(thisYear);
        localRandomDates.push(newDateEntry);
        thisYear--;
    }
    localStorage.setItem("storedRandomDates", JSON.stringify(localRandomDates));
}