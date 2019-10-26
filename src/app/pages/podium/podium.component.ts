import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { faAward, faUndoAlt, faSkull } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.less']
})
export class PodiumComponent implements OnInit {
  icons = {
    award: faAward,
    reload: faUndoAlt,
    skull: faSkull
  };
  reloadDisabled = true;
  isWinner: boolean;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.gameService
      .update()
      .pipe(take(2))
      .subscribe(room => {
        this.isWinner = room.winner.name === this.gameService.playerName;
      });
    interval(3000)
      .pipe(take(1))
      .subscribe(() => {
        this.reloadDisabled = false;
      });
  }

  reload() {
    this.router.navigateByUrl('/');
  }
}
