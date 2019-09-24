//Selections
const targetUserName = document.querySelector('#loggedUser');
const logOut = document.querySelector('#logOut');
const asideUserCounter = document.querySelector('#asideUserCounter');
const asidePostsCounter = document.querySelector('#asidePostsCounter');
const asidePagesCounter = document.querySelector('#asidePagesCounter');
const pageTitle = document.querySelector('#pageTitle');
const pageBody = document.querySelector('#pageBody');
const pagePublished = document.querySelector('#pagePublished');
const pageTags = document.querySelector('#pageTags');
const pageDescriptions = document.querySelector('#pageDes');

//Events
document.addEventListener('DOMContentLoaded', onLoad);
logOut.addEventListener('click', clearAllStorage);

//Functions
function onLoad() {
    //implements CKEditor
    CKEDITOR.replace('editor1');
    setUserName();
}