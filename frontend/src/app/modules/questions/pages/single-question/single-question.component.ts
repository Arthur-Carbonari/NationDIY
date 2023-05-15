import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Answer } from 'src/app/shared/answer.interface';
import { Question } from 'src/app/shared/question.interface';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.scss']
})
export class SingleQuestionComponent {

  question!: Question
  allAnswers: Answer[] = []

  // paginator logic from Angular Material
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageAnswers: Answer[] = []

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    public dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    
    //  use id to route page, if not found redirect to 404
    this.questionsService.getQuestionById(id).subscribe(question => {
      
      if (!question){
        this.router.navigateByUrl('/404')
        return
      }

      this.question = question
      //  sort logic 
      this.questionsService.getQuestionAnswers(id).subscribe(answers => {
        this.allAnswers = answers

        this.paginator.length = answers.length

        this.sortAnswers()
        this.updatePaging()
      })
    })
  }
  //  add answer logic
  addAnswer(answer: Answer) {
    this.allAnswers.push(answer)
    this.paginator.length = this.paginator.length + 1

    this.sortAnswers()
    this.updatePaging()
    //  notification bar 
    this.snackBar.open("Answer Posted Sucessfully", "Dismiss")
  }
  //  paginator logic for upadate pag
  updatePaging() {
    const pageNumber = this.paginator.pageIndex
    const pageSize = this.paginator.pageSize

    const skip = pageNumber * pageSize

    this.pageAnswers = this.allAnswers.slice(skip, skip + pageSize)
  }
  //  sort logic based on vote value
  sortAnswers() {
    this.allAnswers = this.allAnswers
      .sort((a1, a2) => ((Object.keys(a2.upvotes).length) - Object.keys(a2.downvotes).length - (Object.keys(a1.upvotes).length - Object.keys(a1.downvotes).length)) )
      .sort((a1, a2) => a1._id === this.authService.userId ? -1 : 0)
      .sort((a1, a2) => a1._id === this.question.acceptedAnswer ? -1 : 0)
  }
  // accept answer using question and answer id 
  acceptAnswer(answerId: string) {
    this.questionsService.acceptAnswer(answerId, this.question._id).subscribe(res => {
      if (res) {
        this.question.acceptedAnswer = answerId
        
        this.sortAnswers()
        this.updatePaging()  // update page after opertaion
      }
    })
  }

  // deletion logic based on ids
  removeAnswer(answerId: string) {
    this.questionsService.deleteAnswer(answerId, this.question._id).subscribe(res => {
      if (res.sucess) {
        this.allAnswers = this.allAnswers.filter(answer => answer._id !== answerId)
        this.updatePaging() // update page after opertaion
      }
    })
  }

}
