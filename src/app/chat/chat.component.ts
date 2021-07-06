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
    userId: string;
    userName: string;
    userNameIn: string;
    userNameOut: string;
    avatar: string;
    @ViewChild('panel') panelRef: ElementRef;

    constructor(private chatService: ChatService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            text: new FormControl('')
        })
        this.chatService.messagesChat.subscribe(data => {
            const responseData = JSON.parse(data);
            if(responseData.label === 'start') {
                if(this.userId === undefined) {
                    this.userId = responseData.userId;
                    responseData.messagesChat.forEach((elem: any) => {
                        this.messages.push(elem);
                    });
                } else {
                    this.userNameIn = responseData.userNameIn;
                    const timer = setTimeout(() => {
                        this.userNameIn = undefined;
                        clearTimeout(timer);
                    }, 2000)
                }
            }
            if(responseData.label === 'messageChat') {
                this.messages.push(responseData.message);
            }
            if(responseData.label === 'end') {
                this.userNameOut = responseData.userNameOut;
                const timer = setTimeout(() => {
                    this.userNameOut = undefined;
                    clearTimeout(timer);
                }, 2000)
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
