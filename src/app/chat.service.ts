import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'

import { BehaviorSubject } from 'rxjs';
import { environment } from '../../src/environments/environment';

export interface Message {
  text: string;
  sender: "You" | "Amina" | "Bot";
  reply?: boolean;
  date: Date;
  avatar?: string;
  user?: UserIcon
}

export interface UserIcon {
  name: "You",
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly token = environment.dialogflow.lloydantBot;
  private readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  loading: boolean = false;

  constructor() { }

  // Sends and receives messages via DialogFlow
  async converse(text: string) {
    this.loading = true;//open spinner

    const userMessage: Message = {
      text,
      sender: "You",
      reply: true,
      date: new Date(),
      avatar: "/assets/Human_Icon.png"
    };

    this.update(userMessage);

    const response = await this.client.textRequest(text);
    
    const botMessage: Message = {
      text: response.result.fulfillment.speech,
      sender: "Amina",
      date: new Date(),
      avatar: "/assets/Amina_Icon.png"
    };

    this.update(botMessage);
    this.loading = false;//hide spinner

    return;
  }

  update(message: Message): void {
    this.conversation.next([message]);
  }

}