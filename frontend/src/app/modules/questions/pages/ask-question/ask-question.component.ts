import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { SmartForm } from 'src/app/shared/classes/smart-form.abstract';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent extends SmartForm {

  postQuestionForm: FormGroup

  constructor(formBuilder: FormBuilder, private httpClient: HttpClient) {

    const postQuestionForm = formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(8)]],
      tags: [null],
      body: [null, [Validators.required, Validators.minLength(200)]]
    })

    const formErrorMessages = {

      title: { minlength: 'Question title needs to be at least 8 characters long.' },
      body: { minlength: 'Your question needs to be at least 200 characters long.' }

    }

    super(postQuestionForm, formErrorMessages)

    this.postQuestionForm = postQuestionForm
  }

  onSubmit(): void {

    this.postQuestionForm.markAllAsTouched()

    if (this.postQuestionForm.invalid) { return };

    const { title, tags, body } = this.postQuestionForm.value

    this.httpClient.post<any>('api/questions', { title, tags, body }).subscribe({
      next: console.log,
      error: console.error
    })


  }

}
