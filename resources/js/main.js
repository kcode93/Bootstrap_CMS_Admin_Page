//Selection
const targetUserName = document.querySelector('#loggedUser');

//Events
document.addEventListener('DOMContentLoaded', onLoad);


//Functions
function onLoad(){
    CKEDITOR.replace( 'editor1' );
    setUserName();
}

function setUserName(){
    targetUserName.innerHTML = localStorage.getItem('userName');

}
