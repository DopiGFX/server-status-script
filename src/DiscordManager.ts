import dayjs from 'dayjs';
import got from 'got';

type BodyType = "stopped" | "started" | "refused_connection"
type SimpleDcWebhookObject = {
  content: null;
  embeds: SimpleDcWebhookEmbed[];
  attachments: any[];
}
type SimpleDcWebhookEmbed = {
  title: string;
  description: string;
  color: number;
  timestamp?: string;
}

export class DiscordManager {

  public typeToBody: Map<BodyType, SimpleDcWebhookObject> = new Map([
    ["stopped", {
      content: null,
      embeds: [
        {
          title: "Server offline!",
          description: "Der Server wurde gestoppt oder ist gecrashed!",
          color: 16711680
        }
      ],
      attachments: []
    }],
    ["started", {
      content: null,
      embeds: [
        {
          title: "Server online!",
          description: "Der Server ist gestartet!",
          color: 4718336
        }
      ],
      attachments: []
    }],
    ["refused_connection", {
      content: null,
      embeds: [
        {
          title: "Server crashed!",
          description: "Der Server hat die Verbindung abgelehnt!",
          color: 16711680
        }
      ],
      attachments: []
    }],
  ])

  constructor() { }

  public async send(type: BodyType): Promise<void> {
    const apiUrl = "https://discord.com/api/webhooks/" + process.env.dcCannelId + "/" + process.env.dcWebghookToken;
    let body = this.typeToBody.get(type);
    body.embeds.map(e => e.timestamp = dayjs().toISOString())
    await got.post(apiUrl, {
      json: this.typeToBody.get(type)
    }).json();
  }
}