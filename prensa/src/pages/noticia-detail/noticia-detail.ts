import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component( {
    selector: 'page-noticia-detail',
    templateUrl: 'noticia-detail.html',
} )
export class NoticiaDetailPage {
    pbln: any;

    constructor( public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser ) {
        this.pbln = navParams.get( "pbln" );

        console.log( "pbln: " + JSON.stringify( this.pbln ) );
    }

    ionViewDidLoad() {
        // console.log( 'ionViewDidLoad NoticiaDetailPage' );
    }

    noticiaExterna( url: string ) {
        console.log("external: " + url);

        this.iab.create(url, '_blank', 'location=yes');
    }
}
