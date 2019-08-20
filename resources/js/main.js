//Selections
let userName = document.querySelector('#pageUserName');
let tagetUserName = document.querySelector('#targetUserName');
let loginBtn = document.querySelector('#btnLogin'); 

//Events
document.addEventListener("DOMContentLoaded", onLoad);

//Functions
function onLoad(){
    CKEDITOR.replace('editor1');
    console.log(userName);
    console.log(targetUserName);
    console.log(loginBtn);
}