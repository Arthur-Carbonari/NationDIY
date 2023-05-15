import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/shared/question.interface';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss']
})
export class QuestionsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'tags', "createdAt", 'card'];
  dataSource!: MatTableDataSource<Question>;
  allQuestions!: Question[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private questionService: QuestionsService, private router: Router, private route: ActivatedRoute) {

  }

  ngAfterViewInit() {
    const tag = this.route.snapshot.queryParamMap.get('tag') || "";
    
    this.loadDataSource(tag)
    // this.route.params.subscribe( params => {      
    //   this.loadDataSource(params['tag'] || "")
    // })
  }

  loadDataSource(tag: string) {
    this.questionService.getQuestions(tag).subscribe(questions => {

      if (!questions) {
        this.router.navigateByUrl('/500')
        return
      }

      this.allQuestions = questions.reverse()
      this.loadTable(this.allQuestions)
    })

  }

  loadTable(questions: Question[]) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(questions);

    // updates the paginator and the sort
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // function is called when the user types in the search input, and updates the filter criteria used by the MatTableDataSource to display only rows that match the search query.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // unction is called when the user toggles the "Show only unanswered questions" switch, and filters the questions displayed in the table based on whether they have an accepted answer or not.
  filterAnswered(toggle: {checked: boolean}){
    this.loadTable(toggle.checked ? this.allQuestions.filter(question => !question.acceptedAnswer) : this.allQuestions)
  }
}
