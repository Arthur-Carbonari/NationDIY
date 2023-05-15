import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  // user infs for interface 
  @Input() user!: {_id: string, username: string}
  @Input() date!: string

  constructor() { }

}
