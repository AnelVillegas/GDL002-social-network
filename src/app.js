//import { eventNames } from "cluster";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA5c3QxVhf1fbrXpiFFlQs2ZSgae2EPeIM",
    authDomain: "zero-waste-d5038.firebaseapp.com",
    databaseURL: "https://zero-waste-d5038.firebaseio.com",
    projectId: "zero-waste-d5038",
    storageBucket: "",
    messagingSenderId: "222059406012"
};
firebase.initializeApp(config);




const registerButton = document.querySelector('#register');
const loginButton = document.querySelector('#login');
const postButton = document.querySelector('#sendPost');


//Reistrar Usuarios
const register = () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

    });
}

const login = () => {

  let email2 = document.querySelector("#email2").value;
  let password2 = document.querySelector("#password2").value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
}

const observer = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      showContent();

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('no existe usuario activo')
    }
  });
};

observer();

const showContent = () => {
  let content = document.querySelector('#onlylogged');
  content.innerHTML = "Sólo lo ven personas que tengan cuenta";

};




// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

//Post
const post = () => {

  let postWritten = document.querySelector('#post').value;
  db.collection('post').add({
    post: postWritten,
  
 })
    .then(function (docRef) {
      document.querySelector('#post').value = '';
      console.log("Document written with ID: ", docRef.id);
    
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

//Print data on screen
let showPost = document.querySelector('#showPost');
db.collection('post').onSnapshot((querySnapshot) => {
  
  showPost.innerHTML = '';
  querySnapshot.forEach((docRef) => {
  let idPost=(`${docRef.id}`);
   
    //console.log(idPost);
    showPost.innerHTML += `
       <div id="WrittenPost">${docRef.data().post}</div>
       <button class="deletePost">Eliminar</button>
      
       
       `;
  });
  eventButton();
});

  
function eventButton()  { 
  db.collection('post').onSnapshot((querySnapshot) => {
     querySnapshot.forEach((docRef) => {
     //
     console.log(`${docRef.id}`);
     let idPosted=(`${docRef.id}`);
    
      
        } );
        const deleteButton = document.querySelectorAll('.deletePost');
        console.log(deleteButton);
        deleteButton.forEach((button)=> {       
          button.addEventListener('click',  () => {
           deleteWrittenPost(docRef);
           
           function deleteWrittenPost(docRef) {
  
            console.log(`${docRef.id}`);
        
            
          } 
          } );
        
        } );
  });
}





//Delete posts
//let eachIdPost=querySnapshot.forEach((docRef) => {
  //let idPost=(`${docRef.id}`)
  
function deleteWrittenPost(eachId) {
  
    console.log(`${docRef.id}`);

    
  } 

   /* (db.collection("post").docRef(docRef.id).delete().then(function () {
     console.log("Document successfully deleted!");
     }).catch(function (error) {
     console.error("Error removing document: ", error);
     //deleted id ${doc.id.target.dataset.deleteButton}
     });*/
  

  
       
    








//Buttons
registerButton.addEventListener('click', register);
loginButton.addEventListener('click', login);
postButton.addEventListener('click', post);
/*deleteButton.addEventListener('click',deletePost);
//<button deleteButton id="`${doc.id}`">Eliminar</button>
//removeBtn.addEventListener('click', e => {
console.log(`deleted row ${e.target.dataset.removeButtonId}`)*/