import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SocketServiceService } from '../services/socket-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    form: FormGroup;
    messagesChat: Subject<any>;

    constructor(private router: Router,
                private socketService: SocketServiceService) { 
                        this.messagesChat = <Subject<any>>socketService.connect()
                                                            .pipe(
                                                                map((res: any) => {
                                                                    return res
                                                                })
                                                            )
                 }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('')
        })
        this.messagesChat.subscribe(data => {
            console.log(data);
        })
    }

    startChat() {
        sessionStorage.setItem('userName', this.form.get('name').value);
        const data = {
            label: 'start',
            name: this.form.get('name').value
        }
        this.messagesChat.next(data);
        this.router.navigate(['/chat'])
    }

}
