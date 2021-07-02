import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketServiceService } from '../services/socket-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    messages: any = [];
    messagesChat: Subject<any>;


    constructor(private socketService: SocketServiceService) { 
                        this.messagesChat = <Subject<any>>socketService.connect()
                                                            .pipe(
                                                                map((res: any) => {
                                                                    return res
                                                                })
                                                            )
    }

    ngOnInit(): void {
        this.messagesChat.subscribe(data => {
            console.log(data);
        })
    }

    sendChatMessage() {
        this.messagesChat.next({text: 'Hola desde el cliente'})
    }

}
