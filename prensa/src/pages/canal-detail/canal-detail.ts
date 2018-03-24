import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoticiaDetailPage } from '../noticia-detail/noticia-detail';
import { CanalProvider } from '../../providers/canal/canal';

@Component( {
    selector: 'page-canal-detail',
    templateUrl: 'canal-detail.html',
} )
export class CanalDetailPage {

    cnal: any;
    pblnList: any[];

    constructor( public navCtrl: NavController, public navParams: NavParams, private cnalProvider: CanalProvider ) {
        this.cnal = navParams.get( "cnal" );

        this.cnalProvider.readFeed( this.cnal )
            .then(( result ) => {
                this.pblnList = result;
            } )
            .catch( error => { console.log( error ); } );
    }

    ionViewDidLoad() {
        // console.log( 'ionViewDidLoad CanalDetailPage' );
    }

    noticiaDetail( pbln: any ) {
        // console.log( 'click!!' );

        this.navCtrl.push( NoticiaDetailPage, { pbln: pbln } );
    }
}
