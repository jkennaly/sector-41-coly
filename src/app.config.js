import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";

/**
 * Import your Room files
 */
import { DiceGameRoom } from "./rooms/DiceGameRoom.js"; // Import DiceGameRoom
import { LobbyRoom } from "./rooms/LobbyRoom.js"; // Import LobbyRoom
import { MGT2ECharCreateRoom } from "./rooms/MGT2ECharCreateRoom.js"; // Import MGT2ECharCreateRoom

export default config.default({

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('dice_game', DiceGameRoom); // Define DiceGameRoom

        gameServer.define(`lobby`, LobbyRoom)

        gameServer.define(`chargen_mgt2e`, MGT2ECharCreateRoom)
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/colyseus/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/colyseus", monitor());
    },

    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }

});
