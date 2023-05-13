import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { PostQuestionDialogComponent } from '../components/post-question-dialog/post-question-dialog.component';
import { SignupDialogComponent } from '../components/signup-dialog/signup-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogRef: MatDialogRef<any> | null = null

  constructor(private dialog: MatDialog) { }

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
    return this.openDialog(PostQuestionDialogComponent, {width: "60%", height: "70%"})
  }
}
