import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoriaDetailPage } from '../pages/categoria-detail/categoria-detail';
import { PublicadorDetailPage } from '../pages/publicador-detail/publicador-detail';
import { CanalDetailPage } from '../pages/canal-detail/canal-detail';
import { NoticiaDetailPage } from '../pages/noticia-detail/noticia-detail';
import { NoticiaExternaPage } from '../pages/noticia-externa/noticia-externa';

import { CategoriaProvider } from '../providers/categoria/categoria';
import { LoaderProvider } from '../providers/loader/loader';
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { PublicadorProvider } from '../providers/publicador/publicador';
import { CanalProvider } from '../providers/canal/canal';

@NgModule( {
    declarations: [
        MyApp,
        HomePage,
        CategoriaDetailPage,
        PublicadorDetailPage,
        CanalDetailPage,
        NoticiaDetailPage,
        NoticiaExternaPage
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
        NoticiaDetailPage,
        NoticiaExternaPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        InAppBrowser,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CategoriaProvider,
        LoaderProvider,
        SqliteProvider,
        PublicadorProvider,
        PublicadorProvider,
        CanalProvider
    ]
} )
export class AppModule { }
