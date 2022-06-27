
var database = firebase.database();

// asking for username getting the message typed by the user
let username = prompt("Please enter your name:","")
let send = document.querySelector(".send-button")

send.addEventListener('click', writeUserData)

// writing the message to database typed by user
function writeUserData() {
  let msg = document.querySelector(".chat-textbox").value;
  firebase.database().ref('messages/').push().set({
    message : msg,
    userName: username
});
  document.querySelector(".chat-textbox").value = "";
}





// Read from the database
firebase.database().ref('messages').on('child_added', (snapshot) => {
  const data = snapshot.val();


  if(username == data.userName)
  {
    var side = document.createElement("div");
    side.setAttribute("class", "right");
    var displayMsg = document.createElement('p');
    displayMsg.setAttribute("id", `m-${snapshot.key}`);
    var child = document.createTextNode(`${data.userName}: ${data.message}`)
    displayMsg.appendChild(child)
    

    // delete feature
    var buttonDel = document.createElement("button");
    buttonDel.setAttribute("onclick", "deleteMsg(this)");
    buttonDel.setAttribute("data-id", snapshot.key);
    buttonDel.setAttribute("id", `message-${snapshot.key}`);
    buttonDel.setAttribute("class", "buttonDel");
    side.appendChild(displayMsg)
    side.appendChild(buttonDel)
    document.querySelector(".main-section").appendChild(side)
    document.getElementById(`message-${snapshot.key}`).innerHTML = "del";
  }
  else
  {
    var side = document.createElement("div");
    side.setAttribute("class", "left");
    var displayMsg = document.createElement('p');
    var child = document.createTextNode(`${data.userName}: ${data.message}`)
    displayMsg.appendChild(child)
    side.appendChild(displayMsg)
    document.querySelector(".main-section").appendChild(side)
  }
  
  // var msgscroll = document.querySelector(".main-section")
  // autoscrool();
  // function autoscrool() {
  //   // var h=msgscroll.scrollHeight;
  //   // console.log(h);
  //   msgscroll.scrollTop = msgscroll.scrollHeight;
  // }
 
});



// delete function
firebase.database().ref("messages/").on("child_removed", function (snapshot) {
  document.getElementById(`m-${snapshot.key}`).innerHTML = "This message has been deleted";
});

function deleteMsg(self) {
  var messageId = self.getAttribute("data-id");
  database.ref('messages/').child(messageId).remove()
}



// access code set by admin
function passcode() {
  let passcode = document.getElementById("passcode").value;
  database.ref('userpasscode/').set({
    password: passcode
  })
}



//authentication
function user_access() {
  var user_input = document.getElementById("user_input").value;

  database.ref('userpasscode/').on('child_added', (snapshot) => {
    let userCode = snapshot.val();

    console.log(userCode);

      if (user_input == userCode.password) {
        document.querySelector(".passcode").style.display = "none";
      }
       else if(user_input == ""){
        alert("Please Enter A Passcode")
       }
      else{
        alert("You Have Enter A Wrong Passcode")
      }
  })

}

