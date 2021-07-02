import { Component, OnInit } from '@angular/core';
import { SocketServiceService } from '../services/socket-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private socketService: SocketServiceService) { }

  ngOnInit(): void {
      this.socketService.connect();
  }

}
