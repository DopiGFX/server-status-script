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
          description: "Server was stopped or has crashed!",
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
          description: "Server is online!",
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
          description: "Server has refused the connection!",
          color: 16711680
        }
      ],
      attachments: []
    }],
  ])

  constructor() { }

  public async send(type: BodyType): Promise<void> {
    const apiUrl = process.env.dcWebhookUrl;
    let body = this.typeToBody.get(type);
    body.embeds.map(e => e.timestamp = dayjs().toISOString())
    await got.post(apiUrl, {
      json: this.typeToBody.get(type)
    }).json();
  }
}