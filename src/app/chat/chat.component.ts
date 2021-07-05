import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketServiceService } from '../services/socket-service.service';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    form: FormGroup;
    messages: any = [];
    messagesChat: Subject<any>;
    userName: string;
    avatar: string;

    constructor(private socketService: SocketServiceService) { 
                        this.messagesChat = <Subject<any>>socketService.connect()
                                                            .pipe(
                                                                map((res: any) => {
                                                                    return res
                                                                })
                                                            )
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            text: new FormControl('')
        })
        this.messagesChat.subscribe(data => {
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

    sendChatMessage() {
        const data = {
            userName: this.userName,
            avatar: this.avatar,
            text: this.form.get('text').value
        }
        this.messagesChat.next(data)
    }

}
