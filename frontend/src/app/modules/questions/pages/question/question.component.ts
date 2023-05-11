import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Question } from 'src/app/shared/question.interface';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  question: Question | undefined

  votes: number = 0

  constructor(private route: ActivatedRoute, private questionsService: QuestionsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    
    this.questionsService.getQuestionById(id).subscribe(question => {

      if(!question) return
      
      this.question = question 
      this.votes = Object.keys(question.upvotes).length - Object.keys(question.downvotes).length
    })
  }

  upvote(){

    if(!this.authService.isLoggedIn) return // change this later to display login form

    if( !this.question || this.authService.userId in this.question.upvotes) return 

    if(this.authService.userId in this.question.downvotes) delete this.question.downvotes[this.authService.userId]

    this.question.upvotes[this.authService.userId] = true

    this.votes++

    this.questionsService.upvoteQuestion(this.question._id, this.authService.userId)
  }

  downvote(){

    if(!this.authService.isLoggedIn) return // change this later to display login form

    if( !this.question || this.authService.userId in this.question.downvotes) return 

    if(this.authService.userId in this.question.upvotes) delete this.question.upvotes[this.authService.userId]

    this.question.downvotes[this.authService.userId] = true

    this.votes--

    this.questionsService.downvoteQuestion(this.question._id, this.authService.userId)
  }

  dateStringToLocale(dateString: string){
    return new Date(dateString).toLocaleString()
  }

}
