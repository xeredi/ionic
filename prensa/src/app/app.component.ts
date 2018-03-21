import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';

import { CategoriaProvider } from '../providers/categoria/categoria';
import { PublicadorProvider } from '../providers/publicador/publicador';

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

        this.categoriaProvider.createTable();

        this.http.get( "assets/json/ctgr.json" ).subscribe( data => {
            var ctgrList = data.json().data;

            for ( var i in ctgrList ) {
                this.categoriaProvider.save( ctgrList[i] );
            }
        } );

        this.publicadorProvider.createTable();
        this.http.get( "assets/json/pblr.json" ).subscribe( data => {
            var pblrList = data.json().data;

            for ( var i in pblrList ) {
                this.publicadorProvider.save( pblrList[i] );
            }
        } );
/*
        this.publicadorProvider.save( { id: 10000, categoriaId: 1000, nombre: 'El Pais' } );
        this.publicadorProvider.save( { id: 10001, categoriaId: 1000, nombre: 'El Mundo' } );
        this.publicadorProvider.save( { id: 10002, categoriaId: 1010, nombre: 'Sport' } );
        this.publicadorProvider.save( { id: 10003, categoriaId: 1010, nombre: 'Mundo Deportivo' } );
        this.publicadorProvider.save( { id: 10004, categoriaId: 1010, nombre: 'Marca' } );
        this.publicadorProvider.save( { id: 10005, categoriaId: 1020, nombre: 'Muy Interesante' } );
        this.publicadorProvider.save( { id: 10006, categoriaId: 1030, nombre: 'Cadena SER' } );
        this.publicadorProvider.save( { id: 10007, categoriaId: 1030, nombre: 'Onda Cero' } );
        this.publicadorProvider.save( { id: 10008, categoriaId: 1030, nombre: 'COPE' } );
*/
        return this;
    }
}

