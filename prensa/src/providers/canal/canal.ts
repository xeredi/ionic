import { Injectable } from '@angular/core';

import { SqliteProvider } from '../sqlite/sqlite';

@Injectable()
export class CanalProvider extends SqliteProvider {
    createTable() {
        this.open()
            .then(() => {
                this.db.executeSql(
                    'CREATE TABLE IF NOT EXISTS canal ('
                    + ' id INTEGER PRIMARY KEY AUTOINCREMENT'
                    + ', publicadorId INTEGER'
                    + ', autor TEXT'
                    + ', icon TEXT'
                    + ', idioma TEXT'
                    + ', link TEXT'
                    + ', titulo TEXT NOT NULL'
                    + ', url TEXT NOT NULL UNIQUE'
                    + ', podcast INTEGER NOT NULL'
                    + ', fecha INTEGER NOT NULL'
                    + ')', [] )
                    .then( data => data )
                    .catch( error => { console.log( error ); } );
            } )
            .catch( error => { console.log( error ); } );
    }

    dropTable() {
        this.open()
            .then(() => {
                this.db.executeSql( 'DROP TABLE IF EXISTS canal', [] )
                    .then( data => data )
                    .catch( error => { console.log( error ); } );
            } )
            .catch( error => { console.log( error ); } );
    }

    save( item: any ) {
        this.open()
            .then(() => {
                this.db.executeSql( 'SELECT 1 FROM canal WHERE url = ?', [item.url] )
                    .then( data => {
                        // console.log( "exists: " + ( data.rows.length > 0 ) );
                        if ( data.rows.length <= 0 ) {
                            this.db.executeSql(
                                'INSERT INTO canal (publicadorId, autor, icon, idioma, link, titulo, url, podcast, fecha) '
                                + ' SELECT id, ?, ?, ?, ?, ?, ?, ?, ? FROM publicador WHERE url = ?'
                                , [item.autor, item.icon, item.idioma, item.link, item.titulo, item.url, item.podcast, item.fecha, item.publicador] )
                                .then( data => data )
                                .catch( error => { console.log( error ); } );
                        } else {
                            this.db.executeSql(
                                'UPDATE canal SET '
                                + ' autor = ?, icon = ?, idioma = ?, link = ?, titulo = ?, podcast = ?, fecha = ? '
                                + ' WHERE url = ?'
                                , [item.autor, item.icon, item.idioma, item.link, item.titulo, item.podcast, item.fecha, item.url] )
                                .then( data => data )
                                .catch( error => { console.log( error ); } );
                        }
                    } )
                    .catch( error => { console.log( error ); } );
            } )
            .catch( error => { console.log( error ); } );
    }

    selectByPublicador( publicadorId: number ) {
        return this.open()
            .then(() => {
                return this.db.executeSql( "SELECT id, publicadorId, autor, icon, idioma, link, titulo, url, podcast, fecha FROM canal "
                    + " WHERE fecha > (STRFTIME('%s', 'now') - 90 * 24 * 3600) * 1000 AND publicadorId = ? ORDER BY id", [publicadorId] )
                    .then( data => {
                        var items = [];

                        if ( data.rows.length > 0 ) {
                            for ( var i = 0; i < data.rows.length; i++ ) {
                                // console.log( "Categoria: " + data.rows.item( i ) );

                                items.push( data.rows.item( i ) );
                            }
                        }

                        return items;
                    } )
                    .catch( error => { console.log( error ); return null; } );
            } )
            .catch( error => { console.log( error ); return null; } );
    }
}
