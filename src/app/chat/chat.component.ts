import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    form: FormGroup;
    messages: any = [];
    userName: string;
    avatar: string;
    @ViewChild('panel') panelRef: ElementRef;

    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            text: new FormControl('')
        })
        this.chatService.messagesChat.subscribe(data => {
            console.log(data);
            const responseData = JSON.parse(data);
            if(responseData.label === 'start') {
                responseData.messagesChat.forEach((elem: any) => {
                    this.messages.push(elem);
                });
            }
            if(responseData.label === 'messageChat') {
                this.messages.push(responseData.message);
            }
        })
        this.userName = sessionStorage.getItem('userName');
        this.avatar = sessionStorage.getItem('avatar');
    }

    ngAfterViewChecked() {
        this.panelRef.nativeElement.scrollTop = this.panelRef.nativeElement.scrollHeight;
    }

    sendChatMessage() {
        const data = {
            userName: this.userName,
            avatar: this.avatar,
            text: this.form.get('text').value
        }
        this.chatService.sendChatMessage(data);
        this.form.reset();
    }

}
