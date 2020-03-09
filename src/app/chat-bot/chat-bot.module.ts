import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDialogComponent } from '../chat/chat-dialog/chat-dialog.component';
import { NbLayoutModule, NbChatModule, NbSpinnerModule, NbCardModule } from '@nebular/theme';
import { DropDownDirective } from './drop-down.directive';

@NgModule({
  declarations: [ChatDialogComponent, DropDownDirective],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbChatModule,
    NbSpinnerModule,
    NbCardModule
  ],
  exports: [ChatDialogComponent]
})
export class ChatBotModule { }
