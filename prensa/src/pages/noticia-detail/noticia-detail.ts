import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component( {
    selector: 'page-noticia-detail',
    templateUrl: 'noticia-detail.html',
} )
export class NoticiaDetailPage {
    pbln: any;

    constructor( public navCtrl: NavController, public navParams: NavParams ) {
        this.pbln = navParams.get("pbln");
    }

    ionViewDidLoad() {
        console.log( 'ionViewDidLoad NoticiaDetailPage' );
    }

}
