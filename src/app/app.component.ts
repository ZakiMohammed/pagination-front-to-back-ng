import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Options, Response } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  options: Options = {
    orderBy: 'Name',
    orderDir: 'ASC',
    page: 1,
    search: '',
    size: 5
  };
  response: Response = null;

  getEmployeesSub: Subscription;

  constructor(private appService: AppService) {
  }

  get numbers(): number[] {
    const limit = Math.ceil((this.response && this.response.filtered) / this.options.size);
    return Array.from({ length: limit }, (_, i) => i + 1);
  }

  get direction() {
    return this.options.orderDir === 'ASC' ? '⬆' : '⬇';
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.getEmployeesSub.unsubscribe();
  }

  getEmployees(): void {
    this.getEmployeesSub = this.appService.getEmployees(this.options).subscribe(response => this.response = response);
  }

  order(by: string) {
    if (this.options.orderBy === by) {
      this.options.orderDir = this.options.orderDir === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.options.orderBy = by;
    }
    this.getEmployees();
  }

  size(size: number) {
    this.options.size = size;
    this.getEmployees();
  }

  search($event: any): void {
    const text = $event.target.value;
    this.options.search = text;
    this.options.page = 1;
    this.getEmployees();
  }

  next() {
    const exist = ((this.options.size * (this.options.page + 1)) - this.options.size) < this.response.filtered;
    if (exist) {
      this.options.page++;
      this.getEmployees();
    }
  }

  prev() {
    if (this.options.page > 1) {
      this.options.page--;
      this.getEmployees();
    }
  }

  to(page: number) {
    this.options.page = page;
    this.getEmployees();
  }

  by(order: string) {
    return this.options.orderBy === order;
  }
}
