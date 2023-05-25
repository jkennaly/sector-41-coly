import { Command } from "@colyseus/command";
import axios from 'axios';

const DB_SERVER = 'http://localhost:3000';

export class AxiosPostCommand extends Command {
  async execute({ token, apiRoute, body = {} }) {
    try {
      const { data } = await axios.post(DB_SERVER + apiRoute, body, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      //console.log('AxiosPostCommand data:', data);
      return data;
    } catch (error) {
      console.error("AxiosPostCommand error:", error);
      // You can choose to throw the error to stop the command sequence
      // or you can return null or some default value to allow the sequence to continue
      throw error;
    }
  }
}


export class AxiosGetCommand extends Command {
    async execute({ token, apiRoute }) {
      try {
        const { data } = await axios.get(DB_SERVER + apiRoute, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        //console.log('AxiosGetCommand data:', data);
        return data;
      } catch (error) {
        console.error("AxiosGetCommand error:", error);
        // You can choose to throw the error to stop the command sequence
        // or you can return null or some default value to allow the sequence to continue
        throw error;
      }
    }
  }
  