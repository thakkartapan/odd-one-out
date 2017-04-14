import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Rx from 'rxjs';

interface Box {
  color: string,
  isAnswer: boolean;
  height: string;
  width: string;
}

@Component({
  selector: 'app-game-box',
  templateUrl: './game-box.component.html',
  styleUrls: ['./game-box.component.css']
})
export class GameBoxComponent implements OnInit {

  @ViewChild('gameBoxDiv') gameBoxDiv: ElementRef;

  private row: number = 2;
  private col: number = 1;
  private maxHeight: number = 400;
  private maxWidth: number = 600;
  private color: number = 10;

  seconds: number = 60;
  boxs: Array<Box> = [];
  index: number = 0;
  isStarted: boolean = false;
  private subscription: Rx.Subscription = null;

  constructor() { }

  ngOnInit() {
  }

  onStartClicked() {
    this.maxWidth = this.gameBoxDiv.nativeElement.offsetWidth;
    this.isStarted = true;
    this.seconds = 60;
    this.boxs = [];
    this.index = 0;
    this.row = 2;
    this.col = 1;
    this.color = 10;

    this.nextLevel();

    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    this.subscription = Rx.Observable.interval(1000).subscribe((r) => {
      this.seconds--;
      if (this.seconds <= 0) {
        this.endGame();
      }
    });
  }

  onEndClicked() {
    this.endGame();
  }

  onBoxClick(selectedBox: Box) {
    if (selectedBox.isAnswer === true) {
      this.nextLevel();
    } else {
      console.log('wrong clicked');
    }
  }

  private nextLevel() {
    if (this.col <= this.row) {
      this.col++;
    } else {
      this.row++;
    }
    this.index++;

    this.color = this.color + 10;

    const eles: Array<Box> = [];
    const boxCount = this.level;
    const differentColorBoxNumber = this.getRandomNumber(0, boxCount);
    const calHeight = (this.maxHeight / this.row) - 2;
    const calWidth = (this.maxWidth / this.col) - 2;
    const height = `${calHeight}px`;
    const width = `${calWidth}px`;

    for (let i = 0; i < boxCount; i++) {
      let color: string;
      let isAnswer: boolean;
      if (i === differentColorBoxNumber) {
        color = `hsla(${this.color}, ${this.getPer()}%, ${this.secPer}%, 1)`;
        isAnswer = true;
      } else {
        color = `hsla(${this.color}, 100%, 50%, 1)`;
        isAnswer = false;
      }

      eles.push({ color, isAnswer, height, width });
    }
    this.boxs = eles;
  }

  private endGame() {
    console.log(' end game');
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.isStarted = false;
    this.boxs = [];
  }

  private getRandomNumber(start: number, end: number): number {
    return Math.min(end, Math.max(start, Math.floor(Math.random() * end) + (start - 1)));
  }

  get level(): number {
    return this.row * this.col;
  }

  getPer(): number {
    let per;
    if (this.index < 10) {
      per = this.getRandomNumber(40, 40 + this.index);
    } else if (this.index < 20) {
      per = this.getRandomNumber(60, 60 + this.index);
    } else if (this.index < 30) {
      per = this.getRandomNumber(65, 65 + this.index);
    } else {
      per = this.getRandomNumber(70, 70 + this.index);
    }

    return Math.min(per, 100);
  }

  get secPer(): number {
    let secPer;
    if (this.index < 10) {
      secPer = 40;
    } else if (this.index < 15) {
      secPer = 42.5;
    } else if (this.index < 20) {
      secPer = 45;
    } else if (this.index < 25) {
      secPer = 47.5;
    } else if (this.index < 28) {
      secPer = 48;
    } else if (this.index < 31) {
      secPer = 48.5;
    } else if (this.index < 35) {
      secPer = 49;
    } else if (this.index < 40) {
      secPer = 49.5;
    } else {
      secPer = 49.9;
    }
    return secPer;
  }
}
