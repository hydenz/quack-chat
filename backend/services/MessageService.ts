import { IncomingMessage } from 'types/websocket';
import Message from 'database/models/message';

export default class MessageService {
  static async storeMessage({ content, from, to, id }: IncomingMessage) {
    return await Message.findOneAndUpdate(
      { from, to },
      {
        $push: {
          data: {
            id,
            content: content,
            timestampServerReceived: Date.now(),
          },
        },
      },
      { upsert: true }
    );
  }

  static async getMessages(userId: string) {
    const foundMessages = await Message.find({ to: userId });
    return foundMessages;
  }

  static async deleteMessages(userId: string) {
    await Message.findOneAndDelete({ to: userId });
  }
}
