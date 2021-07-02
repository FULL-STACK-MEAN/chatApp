import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

  connect(): Subject<MessageEvent> {

      this.socket = io(this.url, { transports: ['websocket'] });

      return Subject.create()
  }

}
