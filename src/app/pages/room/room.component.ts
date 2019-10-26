import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room';
import { faCheck, faCouch, faClock } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
  icons = {
    check: faCheck,
    couch: faCouch,
    clock: faClock
  };
  room$: Observable<Room>;

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit() {
    this.room$ = this.gameService.update();
    this.gameService
      .start()
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigateByUrl('/game');
      });
  }

  ready() {
    this.gameService.ready();
  }
}
