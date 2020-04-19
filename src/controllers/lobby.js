"use strict";

export const lobby_funcs = app => ({
    createLobby: async (lobby_id, username) => {
        let lobby = {
            _id: lobby_id,
            usernames: [username],
            host: username,
            playerCount: 1,
            gameStarted: false
        };
        let lobby_data = new app.models.Lobby(lobby);
        try {
            await lobby_data.save();
            return lobby_data;
        }catch(err){
            return {error: "Lobby could not be created. Please try again"};
        }
    },

    getLobby: async (lobby_id) => {
        let lobby = await app.models.Lobby.findById(lobby_id);
        if (!lobby){
            return {error: "Lobby does not exist"};
        }
        return lobby;
    },

    joinLobby: async (lobby_id, username) =>{
        let lobby = await app.models.Lobby.findById(lobby_id);
        if (!lobby){
            return {error: "Lobby does not exist. Please enter a different code"};
        }
        else if (lobby.playerCount >= 6){
            return {error: `Max number of players already in room`}
        }
        else if (lobby.usernames.includes(username)){
            return {error: `The username ${username} is taken. Please enter another name`};
        }
        else if (lobby.gameStarted){
            return {error: `The lobby is currently in a game. Please wait until it is finished.`};
        }
        else{
            lobby.usernames.push(username);
            lobby.playerCount ++;
            await lobby.save();
            return lobby;
        }
    },

    leaveLobby: async(lobby_id, username)=>{
        let lobby = await app.models.Lobby.findById(lobby_id);
        if (!lobby){
            return {error: "Lobby does not exist. Leave attempt failed"};
        }
        if (username !== lobby.host){
            lobby.usernames = lobby.usernames.filter(cur_username => username !== cur_username);
            lobby.playerCount --;
            await lobby.save();
            return lobby;
        }
        else{
            if (lobby.playerCount > 1){
                lobby.usernames.shift();
                console.log(lobby.usernames);
                lobby.host = lobby.usernames[0];
                lobby.playerCount --;
                await lobby.save();
                return lobby;
            }
            else{
                app.models.Lobby.findByIdAndDelete(lobby._id, async function(err, deleted_lobby){
                    if (err){
                        return { error: `Lobby could not be deleted` };
                    }
                    return null;
                })


            }
        }

    },

    toggleGame: async (lobby_id)=>{
        let lobby = await app.models.Lobby.findById(lobby_id);
        lobby.gameStarted = !lobby.gameStarted;
        await lobby.save();
    }
});


