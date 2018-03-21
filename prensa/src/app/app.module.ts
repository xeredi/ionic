import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoriaDetailPage } from '../pages/categoria-detail/categoria-detail';
import { PublicadorDetailPage } from '../pages/publicador-detail/publicador-detail';
import { CanalDetailPage } from '../pages/canal-detail/canal-detail';
import { NoticiaDetailPage } from '../pages/noticia-detail/noticia-detail';

import { CategoriaProvider } from '../providers/categoria/categoria';
import { LoaderProvider } from '../providers/loader/loader';
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { PublicadorProvider } from '../providers/publicador/publicador';

@NgModule( {
    declarations: [
        MyApp,
        HomePage,
        CategoriaDetailPage,
        PublicadorDetailPage,
        CanalDetailPage,
        NoticiaDetailPage
    ],
    imports: [
        BrowserModule, HttpModule,
        IonicModule.forRoot( MyApp )
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        CategoriaDetailPage,
        PublicadorDetailPage,
        CanalDetailPage,
        NoticiaDetailPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CategoriaProvider,
        LoaderProvider,
    SqliteProvider,
    PublicadorProvider,
    PublicadorProvider
    ]
} )
export class AppModule { }
