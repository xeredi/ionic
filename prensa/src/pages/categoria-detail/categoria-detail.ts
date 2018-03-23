import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PublicadorDetailPage } from '../publicador-detail/publicador-detail';
import { PublicadorProvider } from '../../providers/publicador/publicador';

@Component( {
    selector: 'page-categoria-detail',
    templateUrl: 'categoria-detail.html',
} )
export class CategoriaDetailPage {

    ctgr: any;
    pblrList: any[];

    constructor( public navCtrl: NavController, public navParams: NavParams, private pblrProvider: PublicadorProvider ) {
        this.ctgr = navParams.get( "ctgr" );

        this.pblrProvider.selectByCategoria( this.ctgr.id )
            .then(( result ) => {
                this.pblrList = result;
            } )
            .catch( error => { console.log( error ); } );

        // console.log( 'categoria: ' + this.ctgr );
    }

    ionViewDidLoad() {
        // console.log( 'ionViewDidLoad CategoriaDetailPage' );
    }

    publicadorDetail( pblr: any ) {
        console.log( 'click!!' );

        this.navCtrl.push( PublicadorDetailPage, { pblr: pblr } );
    }

}
