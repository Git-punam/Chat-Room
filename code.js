var database = firebase.database();

// asking for username getting the message typed by the user
let username = prompt("Please enter your name:","");
let send = document.querySelector(".send-button")

send.addEventListener('click', writeUserData)

// writing the message to database typed by user
function writeUserData() {
  let msg = document.querySelector(".chat-textbox").value;
  
  let time = new Date();
  let hrs = time.getHours();
  let min = time.getMinutes();
  if(hrs>=12 && hrs<23)
      var dtime=`${hrs}:${min}`+"PM";
  else
      var dtime=`${hrs}:${min}`+"AM";
  firebase.database().ref('messages/').push().set({
    message : msg,
    userName: username,
    textTime: dtime
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

    //parent div for text-message and 'del' button
    var divfortextDel = document.createElement("div");
    divfortextDel.setAttribute("class","div-for-text-del")

              //for displaying text message
              var displayMsg = document.createElement('p');
              displayMsg.setAttribute("class","text-message")
              displayMsg.setAttribute("id", `m-${snapshot.key}`);
              var child = document.createTextNode(`${data.userName}: ${data.message}`)
              displayMsg.appendChild(child)
              // delete feature
              var buttonDel = document.createElement("button");
              buttonDel.setAttribute("onclick", "deleteMsg(this)");
              buttonDel.setAttribute("data-id", snapshot.key);
              buttonDel.setAttribute("id", `message-${snapshot.key}`);
              buttonDel.setAttribute("class", "buttonDel");

              
              divfortextDel.appendChild(displayMsg)
              divfortextDel.appendChild(buttonDel)

              //  document.getElementById(`message-${snapshot.key}`).innerHTML = "del";

              

    //parent div for image and time
    var divforImageTime = document.createElement("div");
    divforImageTime.setAttribute("class","parent-for-img-time")
              //this is for the chat-head image
              var divforImage = document.createElement("div");    
              divforImage.setAttribute("class","div-for-image");
              var chatImage = document.createElement("img");
              chatImage.setAttribute("src","./image/chat-head.png");
              divforImageTime.appendChild(chatImage);

              //this is for the time displayed
              var displayTime = document.createElement("div");     
              displayTime.setAttribute("class","display-time");
              var chatTime = document.createElement("p");
              var chatTimeDisplay = document.createTextNode(`${data.textTime}`)
              chatTime.appendChild(chatTimeDisplay)
              displayTime.appendChild(chatTime);

              divforImageTime.appendChild(divforImage)
              divforImageTime.appendChild(displayTime)

        side.appendChild(divfortextDel)
        side.appendChild(divforImageTime)

      document.querySelector(".main-section").appendChild(side)
      document.getElementById(`message-${snapshot.key}`).innerHTML = "del";
    
  }
  else
  {
    // console.log(data.textTime);
    var side = document.createElement("div");
    side.setAttribute("class", "left");

      //parent for chat head and time display
      var divforImageTime = document.createElement("div");
      divforImageTime.setAttribute("class","parent-for-img-time")

        //this is for the chat-head image
        var divforImage = document.createElement("div");    
        divforImage.setAttribute("class","div-for-image");
        var chatImage = document.createElement("img");
        chatImage.setAttribute("src","./image/chat-head.png");
        divforImageTime.appendChild(chatImage);

        //this is for the time displayed
        var displayTime = document.createElement("div");     
        displayTime.setAttribute("class","display-time");
        var chatTime = document.createElement("p");
        var chatTimeDisplay = document.createTextNode(`${data.textTime}`)
        chatTime.appendChild(chatTimeDisplay)
        displayTime.appendChild(chatTime);

        divforImageTime.appendChild(divforImage)
        divforImageTime.appendChild(displayTime)

      //for diplaying text message
      var displayMsg = document.createElement('p');
      displayMsg.setAttribute("class","text-message");
      var child = document.createTextNode(`${data.userName}: ${data.message}`)
      displayMsg.appendChild(child)

      side.appendChild(divforImageTime)
      side.appendChild(displayMsg)

      document.querySelector(".main-section").appendChild(side)
  }
  
  // var msgscroll = document.querySelector(".main-section")
  // console.log(msgscroll.scrollHeight);
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
  console.log(self);
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

    // console.log(userCode);

      if (user_input == userCode.password) {
        document.querySelector(".passcode").style.display = "none";
        document.querySelector(".chat").classList.add('chat-screen');
      }
       else if(user_input == ""){
        alert("Please Enter A Passcode")
       }
      else{
        alert("You Have Enter A Wrong Passcode")
      }
  })

}

