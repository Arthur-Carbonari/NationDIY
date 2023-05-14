import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/shared/question.interface';
import { QuestionsService } from '../../services/questions.service';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss']
})
export class QuestionsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'tags', "createdAt", 'card'];
  dataSource!: MatTableDataSource<Question>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private questionService: QuestionsService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngAfterViewInit() {
    const tag = this.route.snapshot.queryParamMap.get('tag') || "";

    this.loadDataSource(tag)

    // this.route.paramMap.subscribe( params => {
    //   this.loadDataSource(params.get('tag') || '')
    // })
  }

  loadDataSource(tag: string){
    this.questionService.getQuestions(tag).subscribe( res => {

      if(!res) {
        this.router.navigateByUrl('/500')
        return
      }

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(res);

      // updates the paginator and the sort
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
