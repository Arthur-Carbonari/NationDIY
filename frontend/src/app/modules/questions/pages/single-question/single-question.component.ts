import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageAnswers: Answer[] = []

  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.questionsService.getQuestionById(id).subscribe(question => {

      if (!question) return

      this.question = question

      this.questionsService.getQuestionAnswers(id).subscribe(answers => {
        this.allAnswers = answers

        this.paginator.length = answers.length
        this.updatePaging()
      })
    })
  }

  addAnswer(answer: Answer) {
    this.allAnswers.push(answer)
    this.paginator.length = this.paginator.length + 1
    this.updatePaging()
    this.snackBar.open("Answer Posted Sucessfully", "Dismiss")
  }

  updatePaging() {
    const pageNumber = this.paginator.pageIndex
    const pageSize = this.paginator.pageSize

    const skip = pageNumber * pageSize

    this.pageAnswers = this.allAnswers.slice(skip, skip + pageSize)
  }

  removeAnswer(answerId: string){
    this.allAnswers = this.allAnswers.filter(answer => answer._id !== answerId)
    this.updatePaging()
  }

}
