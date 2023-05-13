import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() answerCreated = new EventEmitter<any>();

  postError = ""

  constructor(formBuilder: FormBuilder, private authService: AuthenticationService, private route: ActivatedRoute, private questionsService: QuestionsService){

    const postAnswerForm = formBuilder.group({
      body: ["", [Validators.required, Validators.minLength(50)]]
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

    if(this.postError) this.postError = ""

    const {body} = this.postAnswerForm.value

    const questionId = this.route.snapshot.paramMap.get('id')!;

    this.questionsService.answerQuestion(questionId, body).subscribe( res => {

      if(res.success === false){
        this.postError = "There was an error posting your answer, please try again."
        return
      }

      this.postAnswerForm.controls['body'].setValue("")
      this.postAnswerForm.controls['body'].markAsUntouched()

      this.answerCreated.emit(res)
    })
  }

}
