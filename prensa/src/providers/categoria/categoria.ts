import { Injectable } from '@angular/core';

import { SqliteProvider } from '../sqlite/sqlite';

@Injectable()
export class CategoriaProvider extends SqliteProvider {
    createTable() {
        let sql = 'CREATE TABLE IF NOT EXISTS categoria (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL UNIQUE)';

        console.log( sql );

        this.open().then(() => {
            this.db.executeSql( sql, [] ).then( data => data );
        } );
    }

    save( item: any ) {
        this.open().then(() => {
            this.db.executeSql( 'SELECT 1 FROM categoria WHERE nombre = ?', [item.nombre] ).then( data => {
                console.log( "exists: " + ( data.rows.length > 0 ) );
                if ( data.rows.length > 0 ) {
                    this.db.executeSql( 'UPDATE categoria SET nombre = ? WHERE id = ?', [item.nombre, item.id] ).then( data => data );
                } else {
                    this.db.executeSql( 'INSERT INTO categoria (nombre, id) VALUES (?, ?)', [item.nombre, item.id] ).then( data => data );
                }
            } );
        } );
    }

    selectAll() {
        return this.open().then(() => {
            return this.db.executeSql( 'SELECT id, nombre FROM categoria ORDER BY id', [] )
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
