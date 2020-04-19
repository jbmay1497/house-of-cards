<style>
  * {
    box-sizing: border-box;
  }
  .chatbubble {
    position: fixed;
    bottom: 0;
    right: 30px;
    transform: translateY(300px);
    transition: transform 0.3s ease-in-out;
  }
  .chatbubble.opened {
    transform: translateY(0);
  }

  .chatbubble .unexpanded {
    text-align: center;
    display: block;
    background-color: black;
    color: white;
    padding: 10px 15px 10px;
    position: relative;
    cursor: pointer;
    width: 350px;
    border-radius: 10px 10px 0 0;
    box-sizing: border-box;
  }
  .chatbubble .expanded {
    height: 300px;
    width: 350px;
    background-color: #fff;
    text-align: left;
    color: #333;
    text-shadow: none;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
  }

  .chatbubble .chat-window {
    overflow: auto;
  }

  .chatbubble .messages {
    flex: 1 1 auto;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
  }

  .chatbubble .messages li {
    padding: 5px 10px;
  }

  .messages li:nth-child(odd) {
    background: #eee;
  }

  .chatbubble .chats .input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    background: black;
  }

  .chatbubble .chats .input .form-group {
    width: 100%;
  }
  .chatbubble .chats .input input {
    border: 0;
    margin-left: 0.5%;
    width: 75%;
  }
  .chatbubble .chats .input button {
    width: 20%;
    background: white;
    color: black;
    border-radius: 5px;
  }

  .hidden {
    display: none;
  }

  .chatbubble .chats {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>

<script>

  import {getContext} from 'svelte';
  const sendMessage = getContext('sendMessage');
  const socket = getContext('socket');
  import { beforeUpdate, afterUpdate } from "svelte";
  import { onDestroy } from 'svelte';

  let message = "";
  let messages = [];

  let sendChatMessage = e =>{
      if (message){
          if (!e.key || e.key === 'Enter'){
              sendMessage({
                  action: "sendChatMessage",
                  message: message
                });
                message = "";
                let messageBox = document.getElementById('newMessage');
                messageBox.focus();
          }

      }

  };

  function updateMessages(message){
       messages = [...messages, message];
  }

  socket.on('messageReceived', updateMessages);
  let opened = false;
  let hidden = true;

  let openMessage = "Expand Chat Window";
  let closeMessage = "Minimize Chat Window";
  let chatMessage = opened ? closeMessage : openMessage;

  let toggleChatWindow = () => {
    opened = !opened;
    hidden = !hidden;
    chatMessage = opened ? closeMessage : openMessage;
    let messageBox = document.getElementById('newMessage');
    if (opened){
        messageBox.focus();
    }
  };

  let ul;
  let autoscroll;

  beforeUpdate(() => {
    autoscroll = ul && ul.offsetHeight + ul.scrollTop > ul.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) ul.scrollTo(0, ul.scrollHeight);
  });

  onDestroy(()=>{
      socket.off("messageReceived");
  })

</script>


<div class:opened class="chatbubble">
  <div class="unexpanded" on:click={toggleChatWindow}>
    <div class="title">{chatMessage}</div>
  </div>
  <div class="expanded chat-window ">
    <div class:hidden class="chats">
      <ul class="messages" bind:this={ul}>
        {#each messages as message}
          <li>{message}</li>
        {/each}
      </ul>
      <div class="input">
        <div class="form-group">
        <!-- warn-disable a11y_autofocus -->
          <input
            type="text"
            autocomplete="off"
            bind:value={message}
            id="newMessage"
            placeholder="Enter Message"
            on:keypress = {sendChatMessage}
           />
            <!--maybe make the button disbaled if no message-->
          <button on:click={sendChatMessage}>Send</button>
        </div>

      </div>
    </div>
  </div>
</div>
