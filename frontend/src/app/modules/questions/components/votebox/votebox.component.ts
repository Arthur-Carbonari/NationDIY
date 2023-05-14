import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-votebox',
  templateUrl: './votebox.component.html',
  styleUrls: ['./votebox.component.scss']
})
export class VoteboxComponent {

  @Input() currentValue = 0
  @Input() currentVote = 0

  @Output() voted = new EventEmitter<number>();

  constructor(private authService: AuthenticationService, private dialogService: DialogService) { }

  vote(value: number) {

    // Return early if the user is not logged in
    if (!this.authService.isLoggedIn) {
      this.dialogService.openLoginDialog()
      return
    }

    // Set the value to either 1 or -1 to represent an upvote or downvote respectively, this is done for security
    value = value > 0 ? 1 : -1

    if (this.currentVote === value) {
      this.currentValue -= value
      this.currentVote = 0
      this.voted.emit(0)
      return
    }

    if (this.currentVote !== 0) this.currentValue += value

    this.currentValue += value
    this.currentVote = value

    this.voted.emit(value)
  }

}
