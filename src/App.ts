import { DiscordManager } from "./DiscordManager";
import { MinecraftManager } from "./MinecraftManager";

export class App {

  private discord: DiscordManager;
  private minecraft: MinecraftManager;

  constructor() {
    console.log("Starting Script");
    this.discord = new DiscordManager();
    this.minecraft = new MinecraftManager(this.discord);
    this.minecraft.connect();
  }
}