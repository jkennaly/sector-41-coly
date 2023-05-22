import colyseus from 'colyseus';
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// You need to set these
const JWKS_URI = 'http://localhost:3000/keys';
const LOGIN_SERVER = 'http://localhost:3000';
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

class GameRoom extends colyseus.Room {
  // Override these methods in your child class to implement game logic
  async onAuth(client, options, request) {
    const { token } = options;
    //console.log('token:', token);

    try {
      // Verify the JWT token and get the payload
      const payload = await new Promise((resolve, reject) => {
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

      //console.log('JWT verification succeeded:', token);

      //get fr-user-id from LOGIN_SERVER using axios
      const { data } = await axios.post(LOGIN_SERVER + '/api/Profiles/getUserId/', {}, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      //console.log('JWT verification succeeded:', response.data);
      payload.id = data.id;
      return payload;
    } catch (e) {
      console.log('JWT verification failed:', e.code);
    
      // check if token expired
      if (e instanceof jwt.TokenExpiredError) {
        throw new Error('TOKEN_EXPIRED');
      } else {
        throw new Error('JWT verification failed');
      }
    }
  }

  requestJoin (options, isNewRoom) {
    // If isNewRoom is true, a new Room will be created and options.gameId will be set as metadata
    return (options.create) ? (options.gameId !== undefined) : this.metadata.gameId === options.gameId;
  }

  onCreate(options) {
        // Set metadata.
        this.setMetadata({
          gameId: options.gameId,
      });
  }

  onJoin(client, options) {
    throw new Error("Method 'onJoin(client, options)' must be implemented.");
  }

  onLeave(client, consented) {
    throw new Error("Method 'onLeave(client, consented)' must be implemented.");
  }
}

export default GameRoom;
