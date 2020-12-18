// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyD6Rep6a1SyhkF9Av5VFAxlrYLEbYITCgk",
    authDomain: "chat-app-4ce55.firebaseapp.com",
    databaseURL: "https://chat-app-4ce55-default-rtdb.firebaseio.com",
    projectId: "chat-app-4ce55",
    storageBucket: "chat-app-4ce55.appspot.com",
    messagingSenderId: "948776785128",
    appId: "1:948776785128:web:8802212ccf302ffcfd255d",
    measurementId: "G-T5XEGM1W72"
  };

// Initialize Firebase  

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let username = document.getElementById("username");
let message = document.getElementById("message");
let messages = document.getElementById("messages");

// retrieving the saved username on page load from localStorage
username.value = localStorage.getItem("username");

message.addEventListener("keypress", function(e){
  if (e.key == "Enter"){

    // save the username in localStorage
    localStorage.setItem("username", username.value);

    // console.log(username.value + ": " + message.value);

    // push data to database 
    database.ref("messages").push({
      username:username.value,
      message:message.value
    })

    message.value = "";
  }
})

database.ref("messages").on("child_added", function(e) {
  let data = e.val();
  console.log(data);

// created div, span, p 
  let div = document.createElement("div");
  let span = document.createElement("span");
  span.innerHTML = "@" + data.username;
  let p = document.createElement("p");
  p.innerHTML = data.message;

  div.appendChild(span);
  div.appendChild(p);

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
})