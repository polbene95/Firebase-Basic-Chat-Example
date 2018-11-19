document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);


getPosts();


function login() {

    // https://firebase.google.com/docs/auth/web/google-signin
    
    // Provider
    var provider = new firebase.auth.GoogleAuthProvider();

    // How to Log In
    firebase.auth().signInWithPopup(provider);


}

function logout () {
    firebase.auth().signOut();
}

function writeNewPost(chat) {

    // https://firebase.google.com/docs/database/web/read-and-write

    // Values
    var text = document.getElementById("textInput").value;
    var userName = firebase.auth().currentUser.displayName;
    

    // A post entry
    
    var post = {
        name: userName,
        body: text  
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('main-chat').push().key;

    //Write data
    var updates = {};
    updates[newPostKey] = post;
    
    return firebase.database().ref('main-chat').update(updates);
    
    

    
}

function getPosts(chat) {

     firebase.database().ref('main-chat').on('value', function (data) {
         
//         var posts = document.getElementById("posts");
//         
//         posts.innerHTML = "";

         var messages = data.val();

//         for (var key in messages) {
//             var text = document.createElement("div");
//             var element = messages[key];
//
//             text.append(element.name);
//             text.append(element.body);
//             posts.append(text);
//         }

     })

    console.log("getting posts");

}














// function login() {

//     var provider = new firebase.auth.GoogleAuthProvider();

//     firebase.auth().signInWithPopup(provider);
//     console.log("Login!!");

// }


// function writeNewPost() {

//     var text = document.getElementById("textInput").value;
//     var userName = firebase.auth().currentUser.displayName;

//     // A post entry.
//     var postData = {
//         name: userName,
//         body: text
//     };

//     // Get a key for a new Post.
//     var newPostKey = firebase.database().ref().child('myMessages').push().key;


//     var updates = {};

//     updates[newPostKey] = postData;

//     firebase.database().ref().child('myMessages').update(updates);


// }


// function getPosts() {


//     firebase.database().ref('myMessages').on('value', function (data) {
//         var posts = document.getElementById("posts");
//         posts.innerHTML = "";

//         var posts = data.val();

//         for (var key in posts) {
//             var text = document.createElement("div");
//             var element = posts[key];

//             text.append(element.body);
//             posts.append(text);
//         }

//     })
// }
