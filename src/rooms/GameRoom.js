import colyseus from 'colyseus';
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import command from '@colyseus/command'
import { OnJoinCommand } from "../commands/OnJoinCommand.js";
import { ClearRollResultsCmd } from "../commands/ClearRollResults.js";
import { AxiosPostCommand } from "../commands/util/DB.js";
// You need to set these
const JWKS_URI = 'http://localhost:3000/keys';
const AUDIENCE = "https://0441.design/api/";
const ISSUER = 'https://0441.design';

const client = jwksClient({
  jwksUri: JWKS_URI
});

async function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export class GameRoom extends colyseus.Room {
  // Override these methods in your child class to implement game logic
  async onAuth(client, options, request) {
    const { token } = options;
    //console.log('token:', token);
    let payload;
    try {
      // Verify the JWT token and get the payload
      payload = await new Promise((resolve, reject) => {
        jwt.verify(token, getKey, {
          audience: AUDIENCE,
          issuer: ISSUER,
          algorithms: ['RS256']
        }, (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });
    } catch (e) {
      console.log('JWT verification failed:', e.code);
    
      // check if token expired
      if (e instanceof jwt.TokenExpiredError) {
        throw new Error('TOKEN_EXPIRED');
      } else {
        throw new Error('JWT verification failed');
      }
    }

      //console.log('JWT verification succeeded:', payload.nickname);
    try {
      //get ft-user-id from SERVER using axios
      const cmd = new AxiosPostCommand();
      //console.log('getting userId', cmd.execute)
      const data = await this.dispatcher.dispatch(cmd, {
        token,
        apiRoute: '/api/Profiles/getUserId/',
      });

      //console.log('post data:', data);

      this.tokens[data.id] = token;

      //console.log('JWT verification succeeded:', response.data);
      payload.id = data.id;
      //console.log('GameRoom onAuth succeeded:', payload);
      return payload;
    } catch (e) {
      console.log('Get player ID failed:', e);
    }
  }

  requestJoin (options, isNewRoom) {
  }

  onCreate(options) {
    //console.log('GameRoom.onCreate', options);
        // Set metadata.
        this.setMetadata({
          gameId: options.gameId,
      });
    const StateConstructor = options.stateConstructor
    const stateOpts = options.state
    this.setState(new StateConstructor(stateOpts));
    this.dispatcher = new command.Dispatcher(this);
    this.tokens = {};
    //this.setState(new YourState());
  }

  onJoin(client, options) {
    const cmd = new OnJoinCommand()
    //console.log('GameRoom.onJoin cmd', cmd.execute)
    this.dispatcher.dispatch(cmd, {
      client, options
  });
  }

  onLeave(client, consented) {
    delete this.state.players[client.auth.id];
  }

  onDispose() {
    this.dispatcher.stop();
  }
}

export default GameRoom;
