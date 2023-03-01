import { DiscordManager } from "./DiscordManager";
import { Rcon } from "rcon-client"

export class MinecraftManager {

  public client: Rcon;
  public checkEvery: number = 30000; // 30 seconds
  public retryXTimes: number = 10;

  constructor(public dc: DiscordManager) { }

  public async connect() {
    const wait = (ms: number) => new Promise(r => setTimeout(r, ms))
    const retryOperation = (operation: Function, delay: number, retries: number) => new Promise((resolve, reject) => {
      return operation()
        .then(resolve)
        .catch((reason: any) => {
          if (retries > 0) {
            return wait(delay)
              .then(retryOperation.bind(null, operation, delay, retries - 1))
              .then(resolve)
              .catch(reject);
          }
          return reject(reason);
        });
    })

    await retryOperation(async () => {
      this.client = await Rcon.connect({
        host: process.env.SERVER, port: Number.parseInt(process.env.PORT), password: process.env.RCONpassword
      })
    }, this.checkEvery, this.retryXTimes)
      .then(() => {
        console.log("Server started!")
        this.dc.send("started")
        this.client.on("end", () => {
          console.log("Server stopped!")
          this.dc.send("stopped")
          this.connect()
        })
      })
      .catch(() => {
        console.log("No connection!")
        this.dc.send("refused_connection")
      });
  }
}



