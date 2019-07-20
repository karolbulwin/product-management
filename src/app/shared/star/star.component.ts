import {
  Component,
  OnInit,
  OnChanges,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit, OnChanges {
  @Input() rating: number;
  starWidth: number;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }

  ngOnInit() {}
  ngOnChanges(): void {
    this.starWidth = (this.rating * 120) / 5;
  }
}
