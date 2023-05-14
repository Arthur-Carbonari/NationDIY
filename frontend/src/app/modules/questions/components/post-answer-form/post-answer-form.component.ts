import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Answer } from 'src/app/shared/answer.interface';
import { SmartForm } from 'src/app/shared/classes/smart-form.abstract';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-post-answer-form',
  templateUrl: './post-answer-form.component.html',
  styleUrls: ['./post-answer-form.component.scss']
})
export class PostAnswerFormComponent extends SmartForm{

  postAnswerForm: FormGroup  // Declares postAnswerForm property to hold the form instance.

  @Output() answerCreated = new EventEmitter<Answer>();  // Defines output event emitter for the created answer.

  postError = "" // Declares postError property to hold the error message.


  constructor(
    formBuilder: FormBuilder, 
    private authService: AuthenticationService, 
    private route: ActivatedRoute, 
    private questionsService: QuestionsService,
    private dialogService: DialogService
    ){


       /*
    * Creates an instance of the PostAnswerFormComponent class with formBuilder, authService, route, questionsService, and dialogService dependencies.
    * Defines postAnswerForm instance of FormGroup with a single form control called 'body' with validators required and minLength(20).
    * Creates formErrorMessages object to handle validation messages.
    * Calls the SmartForm constructor with the postAnswerForm and formErrorMessages as arguments.
    * Initializes the postAnswerForm property with the postAnswerForm instance.
    */
    const postAnswerForm = formBuilder.group({
      body: ["", [Validators.required, Validators.minLength(20)]]
    })

    const formErrorMessages = {
      body: { minlength: 'Your answer is too short. Please add more detail.' },
    }

    super(postAnswerForm, formErrorMessages)

    this.postAnswerForm = postAnswerForm  
  }

    /*
    * Triggers the form validation for the postAnswerForm instance.
    * If the form is invalid, it returns immediately.
    * Clears the postError if any previous error exists.
    * If the user is not logged in, opens the login dialog.
    * Extracts the body value from the form and the questionId from the route snapshot.
    * Calls the questionsService to post the answer and emits the created answer through the answerCreated event emitter.
    */
  onSubmit(): void {    
    this.postAnswerForm.markAllAsTouched()
    if (this.postAnswerForm.invalid) { return };

    if(this.postError) this.postError = ""

    if(!this.authService.isLoggedIn){      
      this.dialogService.openLoginDialog()
      return
    }

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
