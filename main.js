document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);

getPosts();


function login() {
  console.log("login");
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

function writeNewPost() {

  var name = document.getElementById("title").value;
  var text = document.getElementById("body").value;


  // A post entry.
  var postData = {
    title: name,
    body: text
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('match1').push().key;
  var userName = firebase.auth().currentUser.displayName;

  var updates = {};
  updates['/match1/' + newPostKey] = postData;


  return firebase.database().ref().update(updates);

}




function getPosts() {
  
  firebase.database().ref('match1').on('value', function (snapshot) {
    var logs = document.getElementById("posts");
    logs.innerHTML = "";
    var posts = snapshot.val();


    for (var key in posts) {
      var text = document.createElement("div");
      var element = posts[key];

      text.append(element.body);
      logs.append(text);
    }

  });
}