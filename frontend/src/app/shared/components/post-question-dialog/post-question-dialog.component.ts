import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsService } from 'src/app/modules/questions/services/questions.service';
import { SmartForm } from '../../classes/smart-form.abstract';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-post-question-dialog',
  templateUrl: './post-question-dialog.component.html',
  styleUrls: ['./post-question-dialog.component.scss']
})
export class PostQuestionDialogComponent extends SmartForm {

  postQuestionForm: FormGroup

  constructor(formBuilder: FormBuilder, private questionService: QuestionsService, private dialogRef: MatDialogRef<LoginDialogComponent>, private snackBar: MatSnackBar) {

    const postQuestionForm = formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(8)]],
      tags: [null],
      body: [null, [Validators.required, Validators.minLength(50)]]
    })

    const formErrorMessages = {

      title: { minlength: 'Question title needs to be at least 8 characters long.' },
      body: { minlength: 'Please add more details to your question.' }

    }

    super(postQuestionForm, formErrorMessages)

    this.postQuestionForm = postQuestionForm
  }

  onSubmit(): void {

    this.postQuestionForm.markAllAsTouched()

    if (this.postQuestionForm.invalid) { return };

    const { title, tags, body } = this.postQuestionForm.value

    this.questionService.postQuestion(title, tags, body).subscribe({
      next: () => {
        this.dialogRef.close()
        this.snackBar.open("Question Posted", "Dismiss")
      },
      error: console.error
    })

  }


}
