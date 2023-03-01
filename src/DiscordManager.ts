import dayjs from 'dayjs';
import got from 'got';

type BodyType = "stopped" | "started" | "refused_connection"

export class DiscordManager {

  public typeToBody: Map<BodyType, Object> = new Map([
    ["stopped", {
      content: null,
      embeds: [
        {
          title: "Server offline!",
          description: "Der Server wurde gestoppt oder ist gecrashed!",
          color: 16711680,
          timestamp: dayjs().toISOString()
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
          color: 4718336,
          timestamp: dayjs().toISOString()
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
          color: 16711680,
          timestamp: dayjs().toISOString()
        }
      ],
      attachments: []
    }],
  ])

  constructor() { }

  public async send(type: BodyType): Promise<void> {
    const apiUrl = "https://discord.com/api/webhooks/" + process.env.dcCannelId + "/" + process.env.dcWebghookToken;
    await got.post(apiUrl, {
      json: this.typeToBody.get(type)
    }).json();
  }
}