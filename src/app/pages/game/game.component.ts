import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { GameService } from 'src/app/services/game.service';
import {
  faExclamation,
  faUser,
  faCouch
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  icons = {
    exclamation: faExclamation,
    user: faUser,
    couch: faCouch
  };
  room$: Observable<Room>;
  myScore: number;
  counter: number;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.room$ = this.gameService.update().pipe(
      map(room => {
        room.players.forEach(player => {
          if (player.name === this.gameService.playerName) {
            this.myScore = player.score;
          }
        });
        return room;
      })
    );
    this.counter = 4;
    interval(1000)
      .pipe(take(4))
      .subscribe(() => {
        this.counter -= 1;
      });
    this.gameService
      .finish()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigateByUrl('/podium');
      });
  }

  press() {
    this.gameService.press();
  }
}
