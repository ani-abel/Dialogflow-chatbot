import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../../chat.service';
import { Observable } from "rxjs";
import { scan } from "rxjs/operators";

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  messages: Observable<Message[]>;
  showChats: boolean = true;

  constructor(public chatBotService: ChatService) { }

  ngOnInit() {
    //Load the initial message loaded by the chatbot
    const initialMessage: Message = {
      text: "Hi, am Amina How can I help?",
      sender: "Amina",
      avatar: "/assets/Amina_Icon.png",
      date: new Date()
    };

    this.chatBotService.update(initialMessage);

    this.messages = this.chatBotService
            .conversation
            .asObservable()
            .pipe(
              scan((acc, val) => acc.concat(val))
          );
  }

  sendMessage(event): void {
    this.chatBotService.converse(event.message);
  }

  toggle(): void {
    this.showChats = !this.showChats;
  }

}