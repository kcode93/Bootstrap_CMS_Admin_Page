//Selection
const userNameInput = document.querySelector('#pageUserName');
const loginBtn = document.querySelector('#btnLogin');
//Events
document.addEventListener('click',getUserName);
//Function
function getUserName(){
    sessionStorage.setItem('userName',userNameInput.value);
}