import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    avatars: Array<string> = [
        '/assets/avatar-1.svg',
        '/assets/avatar-2.svg',
        '/assets/avatar-3.svg',
        '/assets/avatar-4.svg',
        '/assets/avatar-5.svg',
        '/assets/avatar-6.svg'
    ]

    @ViewChildren('avatar') avatarsRef: QueryList<ElementRef>;
    form: FormGroup;
    avatar: string;


    constructor(private router: Router,
                private chatService: ChatService) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)])
        })
    }

    setAvatar(i) {
        this.avatarsRef.forEach((elem: any, index: number) => {
            if (i === index) {
                elem.nativeElement.classList.add('selected');
                this.avatar = this.avatars[i];
                sessionStorage.setItem('avatar', this.avatar);
            } else {
                elem.nativeElement.classList.remove('selected');
            }
        })
    }

    startChat() {
        sessionStorage.setItem('userName', this.form.get('name').value);
        const data = {
            label: 'start',
            avatar: this.avatar,
            name: this.form.get('name').value
        }
        this.chatService.sendChatMessage(data);
        this.router.navigate(['/chat'])
    }

}
