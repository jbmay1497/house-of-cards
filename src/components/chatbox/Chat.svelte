<script context="module">
  import { writable } from "svelte/store";
  import { get } from "svelte/store";
  const new_messages = writable([]);

  export function updateMessages(new_message) {
    new_messages.set([...get(new_messages), new_message]);
    console.log(`new messages is: ${get(new_messages)}`);
  }
</script>

<script>
  import { sendMessage } from "../../routes/networking";
  import { beforeUpdate, afterUpdate } from "svelte";

  let message = "";
  let messages = [];
  let opened = false;
  let hidden = true;

  let openMessage = "Expand Chat Window";
  let closeMessage = "Minimize Chat Window";
  let chatMessage = opened ? closeMessage : openMessage;

  let toggleChatWindow = () => {
    opened = !opened;
    hidden = !hidden;
    chatMessage = opened ? closeMessage : openMessage;
  };

  let ul;
  let autoscroll;

  let enterMessage = m => {
    sendMessage(m);
    message = "";
  };

  beforeUpdate(() => {
    autoscroll = ul && ul.offsetHeight + ul.scrollTop > ul.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) ul.scrollTo(0, ul.scrollHeight);
  });

  $new_messages = messages;

  $: if ($new_messages !== messages) {
    messages = $new_messages;
  }
</script>

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
          <input
            type="text"
            autocomplete="off"
            bind:value={message}
            id="newMessage"
            placeholder="Enter Message" />
          <button on:click={() => enterMessage(message)}>Send</button>
        </div>

      </div>
    </div>
  </div>
</div>
