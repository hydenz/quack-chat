import mongoose from 'database/index';
import { MessageData, Message } from 'types/database';

const messageDataSchema = new mongoose.Schema<MessageData>({
  id: { type: String, required: true },
  content: { type: String, required: true },
  timestampClientReceived: { type: Number, required: false },
  timestampServerReceived: { type: Number, required: true },
});

const messageSchema = new mongoose.Schema<Message>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    data: { type: [messageDataSchema], required: true },
  },
  { collection: 'messages' }
);

const Message = mongoose.model<Message>('Message', messageSchema);

export default Message;
