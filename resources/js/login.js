//Selection
const userNameInput = document.querySelector('#pageUserName');
const loginBtn = document.querySelector('#btnLogin');

//Events
document.addEventListener('click',getUserName);

//Function
function getUserName(){
    localStorage.setItem('userName',userNameInput.value);
}