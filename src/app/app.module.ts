import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

const config: SocketIoConfig = {
  url: 'https://thumbwar-api.herokuapp.com',
  options: {}
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SocketIoModule.forRoot(config), PagesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
