import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SmartForm } from 'src/app/shared/classes/smart-form.abstract';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-post-answer-form',
  templateUrl: './post-answer-form.component.html',
  styleUrls: ['./post-answer-form.component.scss']
})
export class PostAnswerFormComponent extends SmartForm{

  postAnswerForm: FormGroup

  constructor(formBuilder: FormBuilder, private authService: AuthenticationService, private route: ActivatedRoute, private questionsService: QuestionsService){

    const postAnswerForm = formBuilder.group({
      body: [null, [Validators.required, Validators.minLength(50)]]
    })

    const formErrorMessages = {
      body: { minlength: 'Your answer is too short. Please add more detail.' },
    }

    super(postAnswerForm, formErrorMessages)

    this.postAnswerForm = postAnswerForm
  }

  onSubmit(): void {    
    this.postAnswerForm.markAllAsTouched()
    if (this.postAnswerForm.invalid) { return };

    const {body} = this.postAnswerForm.value

    const questionId = this.route.snapshot.paramMap.get('id')!;

    this.questionsService.answerQuestion(questionId, body).subscribe( res => console.log(res))
  }

}
