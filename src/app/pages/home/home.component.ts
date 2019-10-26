import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { faPlay, faUser, faCouch } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  icons = {
    play: faPlay,
    user: faUser,
    couch: faCouch
  };
  playerName: string;
  roomName: string;
  isFull: boolean;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.gameService
      .joined()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigateByUrl('/room');
      });

    this.isFull = false;
    this.gameService
      .full()
      .pipe(take(1))
      .subscribe(() => {
        this.isFull = true;
      });
  }

  join() {
    this.gameService.join(this.playerName, this.roomName);
  }
}
