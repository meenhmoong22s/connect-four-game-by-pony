import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public boardState = [];
  public active = 'r';

  ngOnInit() {
    this.init();
  }

  init = function () {
    this.boardState = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
  };

  drop(index, index2) {
    if (this.boardState[index][index2] === 0) {
      this.boardState[0][index2] = this.active;
      this.active = this.active == 'r' ? 'l' : 'r';
    }

    this.dropLoop(1, index2);
  }

  async dropLoop(numb, index2) {
    setTimeout(() => {
      if (this.boardState[numb][index2] === 0 && numb <= 5) {
        this.boardState[numb - 1][index2] = 0;
        this.boardState[numb][index2] = this.active;
        this.dropLoop(numb + 1, index2);
      } else {
        this.winDetect();
      }
    }, 50);
  }

  winDetect() {
    let tempWinner = '';
    //horiz
    for (let i = 0; i < this.boardState.length; i++) {
      var rowMatch = this.boardState[i].join('').match(/r{4}|l{4}/);
      if (rowMatch) {
        if (rowMatch[0].indexOf('r') > -1) {
          alert('blue win');
          this.init();
        } else {
          alert('yellow win');
          this.init();
        }
      }
    }
    //vertical
    var columns = this.getColumns();
    for (var j = 0; j < columns.length; j++) {
      var colMatch = columns[j].join('').match(/r{4}|l{4}/);
      if (colMatch) {
        if (colMatch[0].indexOf('r') > -1) {
          alert('blue win');
          this.init();
        } else {
          alert('yellow win');
          this.init();
        }
      }
    }
    //diag
    var diags = this.getDiags();
    for (var l = 0; l < diags.length; l++) {
      var diagMatch = diags[l].join('').match(/r{4}|l{4}/);
      if (diagMatch) {
        if (diagMatch[0].indexOf('r') > -1) {
          alert('blue win');
          this.init();
        } else {
          alert('yellow win');
          this.init();
        }
      }
    }
    return tempWinner;
  }

  getColumns() {
    var columns = [];
    for (var j = 0; j < this.boardState[0].length; j++) {
      var column = [];
      for (var k = 0; k < this.boardState.length; k++) {
        column.push(this.boardState[k][j]);
      }
      columns.push(column);
    }
    return columns;
  }

  getDiags() {
    let arr = this.boardState;
    var diags = [];
    for (var i = -5; i < 7; i++) {
      var group = [];
      for (var j = 0; j < 6; j++) {
        if (i + j >= 0 && i + j < 7) {
          group.push(arr[j][i + j]);
        }
      }
      diags.push(group);
    }
    for (i = 0; i < 12; i++) {
      var group = [];
      for (var j = 5; j >= 0; j--) {
        if (i - j >= 0 && i - j < 7) {
          group.push(arr[j][i - j]);
        }
      }
      diags.push(group);
    }
    return diags.filter(function (a) {
      return a.length > 3;
    });
  }
}
