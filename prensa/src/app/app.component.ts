import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';

import { CategoriaProvider } from '../providers/categoria/categoria';
import { PublicadorProvider } from '../providers/publicador/publicador';
import { CanalProvider } from '../providers/canal/canal';

import { HomePage } from '../pages/home/home';
@Component( {
    templateUrl: 'app.html'
} )
export class MyApp {
    rootPage: any = HomePage;

    constructor(
        platform: Platform
        , statusBar: StatusBar
        , splashScreen: SplashScreen
        , private categoriaProvider: CategoriaProvider
        , private publicadorProvider: PublicadorProvider
        , private canalProvider: CanalProvider
        , private http: Http
    ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            this.createDatabase();
            splashScreen.hide();
        } );
    }

    private createDatabase() {
        console.log( "Create DB" );

        //this.categoriaProvider.dropTable();
        this.categoriaProvider.createTable();
        this.http.get( "assets/json/ctgr.json" ).subscribe( data => {
            var ctgrList = data.json().data;

            for ( var i in ctgrList ) {
                this.categoriaProvider.save( ctgrList[i] );
            }
        } );

        //this.publicadorProvider.dropTable();
        this.publicadorProvider.createTable();
        this.http.get( "assets/json/pblr.json" ).subscribe( data => {
            var pblrList = data.json().data;

            for ( var i in pblrList ) {
                this.publicadorProvider.save( pblrList[i] );
            }
        } );

        //this.canalProvider.dropTable();
        this.canalProvider.createTable();
        this.http.get( "assets/json/cnal.json" ).subscribe( data => {
            var cnalList = data.json().data;

            for ( var i in cnalList ) {
                this.canalProvider.save( cnalList[i] );
            }
        } );

        return this;
    }
}

