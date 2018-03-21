import { Injectable } from '@angular/core';

import { SqliteProvider } from '../sqlite/sqlite';

@Injectable()
export class PublicadorProvider extends SqliteProvider {
    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS publicador (id INTEGER PRIMARY KEY, categoriaId INTEGER NOT NULL, nombre TEXT NOT NULL)';

        console.log( sql );

        this.open().then(() => {
            this.db.executeSql( sql, [] ).then( data => data );
        } );
    }

    save( item: any ) {
        this.open().then(() => {
            this.db.executeSql( 'SELECT 1 FROM publicador WHERE categoriaId = ? AND nombre = ? ', [item.categoriaId, item.nombre] ).then( data => {
                console.log( "exists: " + ( data.rows.length > 0 ) );
                if ( data.rows.length <= 0 ) {
                    this.db.executeSql(
                        'INSERT INTO publicador (id, categoriaId, nombre) VALUES (?, ?, ?)'
                        , [item.id, item.categoriaId, item.nombre] ).then( data => data );
                }
            } );
        } );
    }

    selectByCategoria( categoriaId: number ) {
        return this.open().then(() => {
            return this.db.executeSql( 'SELECT id, categoriaId, nombre FROM publicador WHERE categoriaId = ? ORDER BY nombre', [categoriaId] )
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
