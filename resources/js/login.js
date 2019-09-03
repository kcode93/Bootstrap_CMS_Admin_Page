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