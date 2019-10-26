import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {
  constructor(private gameService: GameService, private router: Router) {}

  canActivate(): boolean {
    if (!this.gameService.roomName || !this.gameService.playerName) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
