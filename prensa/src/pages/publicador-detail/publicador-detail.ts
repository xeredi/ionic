import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CanalDetailPage } from '../canal-detail/canal-detail';
import { CanalProvider } from '../../providers/canal/canal';

@Component( {
    selector: 'page-publicador-detail',
    templateUrl: 'publicador-detail.html',
} )
export class PublicadorDetailPage {

    pblr: any;
    cnalList: any[];

    constructor( public navCtrl: NavController, public navParams: NavParams, private cnalProvider: CanalProvider ) {
        this.pblr = navParams.get( "pblr" );
        this.cnalProvider.selectByPublicador( this.pblr.id ).then(( result ) => {
            this.cnalList = result;
        } );
    }

    ionViewDidLoad() {
        // console.log( 'ionViewDidLoad PublicadorDetailPage' );
    }

    canalDetail( cnal: any ) {
        // console.log( 'click!!' );

        this.navCtrl.push( CanalDetailPage, { cnal: cnal } );
    }

}
