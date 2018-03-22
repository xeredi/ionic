import { Injectable } from '@angular/core';

import { SqliteProvider } from '../sqlite/sqlite';

@Injectable()
export class PublicadorProvider extends SqliteProvider {
    createTable() {
        this.open().then(() => {
            this.db.executeSql( 'CREATE TABLE IF NOT EXISTS publicador (id INTEGER PRIMARY KEY AUTOINCREMENT, categoriaId INTEGER NOT NULL, url TEXT NOT NULL, logo TEXT NOT NULL, nombre TEXT NOT NULL, tipo TEXT NOT NULL)', [] ).then( data => data );
        } );
    }

    dropTable() {
        this.open().then(() => {
            this.db.executeSql( 'DROP TABLE IF EXISTS publicador', [] ).then( data => data );
        } );
    }

    save( item: any ) {
        this.open().then(() => {
            this.db.executeSql( 'SELECT 1 FROM publicador WHERE url = ? ', [item.url] ).then( data => {
                console.log( "exists: " + ( data.rows.length > 0 ) );
                if ( data.rows.length <= 0 ) {
                    this.db.executeSql(
                        'INSERT INTO publicador (categoriaId, url, logo, nombre, tipo) SELECT id, ?, ?, ?, ? FROM categoria WHERE nombre = ?'
                        , [item.url, item.logo, item.nombre, item.tipo, item.categoria] ).then( data => data );
                }
            } );
        } );
    }

    selectByCategoria( categoriaId: number ) {
        return this.open().then(() => {
            return this.db.executeSql( 'SELECT id, categoriaId, url, logo, nombre, tipo FROM publicador WHERE categoriaId = ? ORDER BY nombre', [categoriaId] )
                .then( data => {
                    var items = [];

                    if ( data.rows.length > 0 ) {
                        for ( var i = 0; i < data.rows.length; i++ ) {
                            items.push( data.rows.item( i ) );
                        }
                    }

                    return items;
                } ).catch( error => { console.log( error ); return null; } );
        } ).catch( error => { console.log( error ); return null; } );
    }
}
