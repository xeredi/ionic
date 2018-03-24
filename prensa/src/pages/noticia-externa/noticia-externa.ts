import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component( {
    selector: 'page-noticia-externa',
    templateUrl: 'noticia-externa.html',
} )
export class NoticiaExternaPage {
    url: string;

    constructor( public navCtrl: NavController, public navParams: NavParams ) {
        this.url = navParams.get("url");
    }

    ionViewDidLoad() {
        console.log( 'ionViewDidLoad NoticiaExternaPage' );
    }

}
