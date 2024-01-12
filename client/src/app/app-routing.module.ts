import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatwindowstaticComponent } from './chatwindowstatic/chatwindowstatic.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';
import { TwilioChatComponent } from './twilio-chat/twilio-chat.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'sendmessage', component: SendmessageComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'chat/:id', component: ChatComponent },
  {path: 'chatwindowstatic', component: ChatwindowstaticComponent },
  {path: 'chatwindowstatic/:id', component: ChatwindowstaticComponent },
  {path: 'twiliochat', component: TwilioChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //  { relativeLinkResolution: 'legacy' }
  exports: [RouterModule]
})
export class AppRoutingModule {
}

// Eager Loading End

// Lazy Loading Start

// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
//   { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
//   { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
//   { path: 'sendmessage', loadChildren: () => import('./sendmessage/sendmessage.module').then(m => m.SendMessageModule) },
//   { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
//   { path: 'chat/:id', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
//   { path: 'chatwindowstatic', loadChildren: () => import('./chatwindowstatic/chatwindowstatic.module').then(m => m.ChatWindowStaticModule) },
//   { path: 'chatwindowstatic/:id', loadChildren: () => import('./chatwindowstatic/chatwindowstatic.module').then(m => m.ChatWindowStaticModule) },
//   { path: 'twiliochat', loadChildren: () => import('./twilio-chat/twilio-chat.module').then(m => m.TwilioChatModule) }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
