<svelte:head>
    <title>Lobby</title>
</svelte:head>

<style>
    body {
        height: 100%;
        background: linear-gradient(to right, seagreen, black);
    }

    .container{
        padding: 2px;
        text-align: center;
    }

    h1 {
        padding: 1vw;
        color: white;
    }

    .dropbtn {
        background-color: #4CAF50;
        color: white;
        padding: 1vw;
        font-size: 16px;
        border: none;
    }

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
        position: relative;
        right: 20%;
        display: inline-block;
    }

    .custom {
        position: relative;
        left: 20%;
        display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        display: none;
        background-color: #f1f1f1;
        max-width: 120px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {display: block;}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {background-color: #3e8e41;}

    img {
        width: 15%;
        position: relative;
        padding: 1em;
    }
</style>

<script>

</script>

<body class="container">
    <h1>LOBBY</h1>

    <div class="dropdown">
        <button class="dropbtn">Existing Games</button>
        <div class="dropdown-content">
            <a href="game/oldmaid">Old Maid</a>
            <a href="game">War</a>
            <a href="game">Solitaire</a>
        </div>
    </div>

    <div class="custom">
        <button class="dropbtn">Custom Game</button>
    </div>

    <figure>
        <img src = 'images/face_down.jpg' alt="face down card"/>
    </figure>
</body>
