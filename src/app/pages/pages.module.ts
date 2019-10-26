import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Routes, RouterModule } from '@angular/router';
import { GameGuard } from '../guards/game.guard';

import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { GameComponent } from './game/game.component';
import { PodiumComponent } from './podium/podium.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'room', component: RoomComponent, canActivate: [GameGuard] },
  { path: 'game', component: GameComponent, canActivate: [GameGuard] },
  { path: 'podium', component: PodiumComponent, canActivate: [GameGuard] },
  { path: '**/*', redirectTo: '/' }
];

@NgModule({
  declarations: [HomeComponent, RoomComponent, GameComponent, PodiumComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PagesModule {}
