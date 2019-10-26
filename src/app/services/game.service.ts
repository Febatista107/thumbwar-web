import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _playerName: string;
  private _roomName: string;

  constructor(private socket: Socket) {}

  public get playerName() {
    return this._playerName;
  }

  public get roomName() {
    return this._roomName;
  }

  public join(playerName: string, roomName: string) {
    this._setParams(roomName, playerName);
    this.socket.emit('join', { playerName, roomName });
  }

  public ready() {
    this.socket.emit('ready', this._getParams());
  }

  public press() {
    this.socket.emit('press', this._getParams());
  }

  public full() {
    return this.socket.fromEvent('full').pipe(map(this._clearParams));
  }

  public joined() {
    return this.socket.fromEvent('joined');
  }

  public start() {
    return this.socket.fromEvent('start');
  }

  public finish() {
    return this.socket.fromEvent('finish').pipe(map(this._clearParams));
  }

  public update() {
    return this.socket.fromEvent<Room>('update');
  }

  private _setParams(roomName, playerName) {
    this._roomName = roomName;
    this._playerName = playerName;
  }

  private _clearParams() {
    this._roomName = null;
    this._playerName = null;
  }

  private _getParams() {
    return { roomName: this._roomName, playerName: this._playerName };
  }
}
