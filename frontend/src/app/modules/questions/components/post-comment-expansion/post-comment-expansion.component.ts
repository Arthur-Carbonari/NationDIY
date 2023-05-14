import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Answer } from 'src/app/shared/answer.interface';
import { SmartForm } from 'src/app/shared/classes/smart-form.abstract';
import { Comment } from 'src/app/shared/comment.interface';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-post-comment-expansion',
  templateUrl: './post-comment-expansion.component.html',
  styleUrls: ['./post-comment-expansion.component.scss']
})
export class PostCommentExpansionComponent extends SmartForm{

  @Input() answerId: string | undefined
  @Output() commentPosted = new EventEmitter<Comment>();
  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;


  postCommentForm: FormGroup

  postError = ""

  opened: boolean = false

  //  modules necessaries for post comment 
  constructor(
    formBuilder: FormBuilder, 
    private authService: AuthenticationService, 
    private questionsService: QuestionsService,
    private dialogService: DialogService,
    private route: ActivatedRoute, 
  ){
    const postCommentForm = formBuilder.group({
      body: ["", [Validators.required]]
    })


    super(postCommentForm)

    this.postCommentForm = postCommentForm
  }

  // on submit check and return error or sucess 
  onSubmit(): void {    

    this.postCommentForm.markAllAsTouched()
    if (this.postCommentForm.invalid) { return };

    if(this.postError) this.postError = ""

    if(!this.authService.isLoggedIn){      
      this.dialogService.openLoginDialog()
      return
    }

    const {body} = this.postCommentForm.value

    const questionId = this.route.snapshot.paramMap.get('id')!;
    
    const requestObservable = !this.answerId ? this.questionsService.postComment(questionId, body) : this.questionsService.postAnswerComment(this.answerId, questionId, body)

    requestObservable.subscribe( res => {

      if(res.success === false){
        this.postError = "There was an error posting your comment, please try again."
        return
      }      

      this.postCommentForm.controls['body'].setValue("")
      this.postCommentForm.controls['body'].markAsUntouched()

      this.panel.close()
      // post comment if validation is pass 
      this.commentPosted.emit(res.newComment)
    })
  }

}
