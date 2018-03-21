import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoticiaDetailPage } from '../noticia-detail/noticia-detail';

@Component( {
    selector: 'page-canal-detail',
    templateUrl: 'canal-detail.html',
} )
export class CanalDetailPage {

    cnal: any;
    pblnList: any[];

    constructor( public navCtrl: NavController, public navParams: NavParams ) {
        this.cnal = navParams.get("cnal");
        this.pblnList = [{ id: 1, titulo: 'Noticia 1' }, { id: 2, titulo: 'Noticia 2' }, { id: 3, titulo: 'Noticia 3' }, { id: 4, titulo: 'Noticia 4' }];
    }

    ionViewDidLoad() {
        console.log( 'ionViewDidLoad CanalDetailPage' );
    }

    noticiaDetail( pbln: any ) {
        console.log( 'click!!' );

        this.navCtrl.push( NoticiaDetailPage, { pbln: pbln } );
    }
}
