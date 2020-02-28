"use strict";

export const lobby_funcs = app => ({
    createLobby: async (lobby_id, username) => {
        let lobby = {
            _id: lobby_id,
            usernames: [username],
            owner: username,
            count: 1
        };
        console.log(lobby);
        let lobby_data = new app.models.Lobby(lobby);
        console.log(lobby_data);
        try {
            await lobby_data.save();
            console.log(lobby_data);
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
        if (lobby.usernames.includes(username)){
            return {error: `The username ${username} is taken. Please enter another name`};
        }
        lobby.usernames.push(username);
        lobby.count ++;
        await lobby.save();
        return lobby;
    }
});


