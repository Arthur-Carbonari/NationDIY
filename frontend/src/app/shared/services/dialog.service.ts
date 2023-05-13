import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../components/signup-dialog/signup-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogRef: MatDialogRef<any> | null = null

  constructor(private dialog: MatDialog) { }

  public openDialog(component: ComponentType<unknown>) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef =  this.dialog.open(component);

    this.dialogRef.beforeClosed().subscribe( () => this.closeDialog)

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
}
