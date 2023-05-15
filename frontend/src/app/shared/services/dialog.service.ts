import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { PostQuestionDialogComponent } from '../components/post-question-dialog/post-question-dialog.component';
import { SignupDialogComponent } from '../components/signup-dialog/signup-dialog.component';



//provides methods for opening and closing dialog windows using the MatDialog component from Angular Material. It also provides methods for opening specific types of dialogs, such as login, signup, and post-question dialogs.

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogRef: MatDialogRef<any> | null = null

  constructor(private dialog: MatDialog, private authService: AuthenticationService) { }

  public openDialog(component: ComponentType<unknown>, config: MatDialogConfig<any> = {}) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(component, config);

    this.dialogRef.beforeClosed().subscribe(() => this.closeDialog)

    return this.dialogRef
  }

  public closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

  public openLoginDialog() {
    return this.openDialog(LoginDialogComponent)
  }

  public openSignupDialog() {
    return this.openDialog(SignupDialogComponent);
  }

  public openPostQuestionDialog() {

    if(!this.authService.isLoggedIn){
      this.openLoginDialog()
      return
    }

    // set standard size of the dialog based on percentage of the screen size
    return this.openDialog(PostQuestionDialogComponent, {width: "60%", height: "70%"})
  }
}
