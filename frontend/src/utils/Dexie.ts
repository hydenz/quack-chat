import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';

class IndexedDB extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  // contacts: Dexie.Table<Contact, string>; // string = type of the primkey
  contacts: Dexie.Table<Contact, string>;
  messages: Dexie.Table<Message, string>; // string = type of the primkey
  //...other tables goes here...

  constructor() {
    super('quack-chat');
    this.version(1).stores({
      contacts: '&id',
      messages: '&id, contactId',
    });
    // this.version(1).stores({
    //   contacts: 'id, messages',
    // });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.contacts = this.table('contacts');
    this.messages = this.table('messages');
  }

  async addMessage({ id, contactId, content, sentByMe }: any) {
    id = id || uuidv4();
    const newMessage = {
      id,
      contactId,
      sentByMe,
      content,
      firstTimestamp: Date.now(),
    };
    const contactExists = await this.contacts.get(contactId);
    if (contactExists) {
      await this.messages.add(newMessage);
    } else {
      await this.contacts.add({ id: contactId });
      await this.messages.add(newMessage);
    }
    // await this.contacts
    //   .where('id')
    //   .equals(contactId)
    //   .modify((contact) => contact.messages.push(newMessage))
    //   .then(async (numberOfUpdated) => {
    //     if (!numberOfUpdated) {
    //       await this.contacts.add({
    //         id: contactId,
    //         messages: [newMessage],
    //       });
    //     }
    //   });
    return id;
  }

  async updateMessage(messageId: string, changes: any) {
    await this.messages
      .where('id')
      .equals(messageId)
      .modify((message) => {
        // console.log(message);
        for (let arr of Object.entries(changes)) {
          (message as any)[arr[0]] = arr[1]!;
          // (contact.messages.find((message) => message.id === messageId) as any)[
          //   arr[0] as any
          // ] = arr[1]!;
        }
      });
  }

  async deleteContact(contactId: string) {
    await this.transaction('rw', this.contacts, this.messages, async () => {
      await this.contacts.where('id').equals(contactId).delete();
      await this.messages.where('contactId').equals(contactId).delete();
    });
  }
  // async updateMessage({ contactId, messageId }: any, changes: any) {
  //   await this.contacts
  //     .where('id')
  //     .equals(contactId)
  //     .modify((contact) => {
  //       for (let arr of Object.entries(changes)) {
  //         (contact.messages.find((message) => message.id === messageId) as any)[
  //           arr[0] as any
  //         ] = arr[1]!;
  //       }
  //     });
  // }
}

export interface Message {
  id: string;
  contactId: string;
  sentByMe: boolean;
  content: string;
  firstTimestamp: number;
  timestampClientReceived?: number;
  timestampServerReceived?: number;
}

export interface Contact {
  id: string;
  // messages: Message[];
}

export default new IndexedDB();
