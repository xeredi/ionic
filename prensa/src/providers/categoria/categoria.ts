import { Injectable } from '@angular/core';

import { SqliteProvider } from '../sqlite/sqlite';

@Injectable()
export class CategoriaProvider extends SqliteProvider {
    createTable() {
        this.open().then(() => {
            this.db.executeSql( 'CREATE TABLE IF NOT EXISTS categoria (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL UNIQUE, icono TEXT NOT NULL)', [] ).then( data => data );
        } );
    }

    dropTable() {
        this.open().then(() => {
            this.db.executeSql( 'DROP TABLE IF EXISTS categoria', [] ).then( data => data );
        } );
    }

    save( item: any ) {
        this.open().then(() => {
            this.db.executeSql( 'SELECT 1 FROM categoria WHERE nombre = ?', [item.nombre] ).then( data => {
                // console.log( "exists: " + ( data.rows.length > 0 ) );
                if ( data.rows.length > 0 ) {
                    this.db.executeSql( 'UPDATE categoria SET icono = ? WHERE nombre = ?', [item.icono, item.nombre] ).then( data => data );
                } else {
                    this.db.executeSql( 'INSERT INTO categoria (icono, nombre) VALUES (?, ?)', [item.icono, item.nombre] ).then( data => data );
                }
            } );
        } );
    }

    selectAll() {
        return this.open().then(() => {
            return this.db.executeSql( 'SELECT id, nombre, icono FROM categoria ORDER BY id', [] )
                .then( data => {
                    var items = [];

                    if ( data.rows.length > 0 ) {
                        for ( var i = 0; i < data.rows.length; i++ ) {
                            // console.log( "Categoria: " + data.rows.item( i ) );

                            items.push( data.rows.item( i ) );
                        }
                    }

                    return items;
                } ).catch( error => { console.log( error ); return null; } );
        } ).catch( error => { console.log( error ); return null; } );
    }
}
