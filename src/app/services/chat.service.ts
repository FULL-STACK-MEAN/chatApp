import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketServiceService } from './socket-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    messagesChat: Subject<any>;

    constructor(private socketService: SocketServiceService) { 
        this.messagesChat = <Subject<any>>socketService.connect()
                                                       .pipe(
                                                           map((res: any) => {
                                                               return res
                                                           })
                                                       )
    }

    sendChatMessage(data: any) {
        this.messagesChat.next(data);
    }

}
