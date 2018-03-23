import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CategoriaDetailPage } from '../categoria-detail/categoria-detail';
import { CategoriaProvider } from '../../providers/categoria/categoria';

@Component( {
    selector: 'page-home',
    templateUrl: 'home.html'
} )
export class HomePage {

    ctgrList: any[];

    constructor( public navCtrl: NavController, private ctgrProvider: CategoriaProvider ) {
        // console.log( "Cargar categorias" );

        this.ctgrProvider.selectAll()
            .then(( result ) => {
                this.ctgrList = result;
            } )
            .catch( error => { console.log( error ); } )
        ;

    }

    categoriaDetail( ctgr: any ) {
        // console.log( 'click!!' );

        this.navCtrl.push( CategoriaDetailPage, { ctgr: ctgr } );
    }

}
