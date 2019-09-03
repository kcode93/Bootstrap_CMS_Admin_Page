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

function setContainerArrays(array){
    let containerArray = [];
    let counter = '';
    let lsArrayName = '';
    for (let item of array) {
        //populates local users array with imported data
        containerArray.push(item);
    }
    //stores array of user objects into local sotrage
    if(counter == 0){
        lsArrayName = 'storedUsersArray';
        localStorage.setItem(lsArrayName, JSON.stringify(containerArray));
    }else if(counter == 1){
        lsArrayName = 'storedPostsArray';
        localStorage.setItem(lsArrayName, JSON.stringify(containerArray));
    }else if (counter == 2){
        lsArrayName = 'storedPagesArray';
        localStorage.setItem(lsArrayName, JSON.stringify(containerArray));
    }
}

function ajaxCalls(){
    //Ajax Request for registered Users
    getData('GET', 'http://jsonplaceholder.typicode.com/users').then(function(data){
        if(ajaxFlag == false){
            let dataArray = JSON.parse(data);
            setContainerArrays(dataArray);
        }
    }).catch(function(err){
        console.log(err);
    });
    //Ajax Request for total Posts in Site
    getData('GET', 'https://jsonplaceholder.typicode.com/posts').then(function(data){
        if(ajaxFlag == false){
            let dataArray = JSON.parse(data);
            setContainerArrays(dataArray);
        }
    }).catch(function(err){
        console.log(err);
    });
    //Ajax Request for total Pages in Site
    getData('GET', './resources/jsonFiles/pages.json').then(function(data){
        if(ajaxFlag == false){
            let dataArray = JSON.parse(data);
            setContainerArrays(dataArray);
        }
    }).catch(function(err){
        console.log(err);
    });
}