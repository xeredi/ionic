import { Injectable } from '@angular/core';

import { SqliteProvider } from '../sqlite/sqlite';
import * as feedparser from 'feedparser-promised';

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

    readFeed( feed: any ) {
        return feedparser.parse( feed.url )
            .then( items => {
                var itemList = [];

                items.map( item => {
                    var itemData: any = {};

                    var msec = Date.now() - Date.parse( item.pubdate.toDateString() );
                    var timeMessage = null;

                    if ( msec > 0 ) {
                        if ( msec < 3600000 ) {
                            timeMessage = 'Hace ' + Math.round( msec / 60000 ) + " minutos";
                        } else if ( msec < ( 24 * 3600000 ) ) {
                            timeMessage = 'Hace ' + Math.round( msec / 3600000 ) + " horas";
                        }
                    }

                    itemData.pblr = feed.pblr;
                    itemData.pblrId = feed.pblrId;
                    itemData.link = item.link;
                    itemData.titulo = item.title;
                    itemData.pubDate = item.pubdate;
                    itemData.author = item.author;
                    itemData.description = item.description;
                    itemData.msec = msec;
                    itemData.timeMessage = timeMessage;

                    if ( item.image ) {
                        itemData.icon = item.image.url
                        itemData.imUrl = item.image.url
                    }

                    if ( item.enclosures[0] ) {
                        var enclosureData: any = item.enclosures[0];

                        if ( enclosureData.type.indexOf( 'audio' ) >= 0 ) {
                            itemData.enclosureUrl = enclosureData.url;
                            itemData.enclosureLength = enclosureData.length;

                            if ( enclosureData.length ) {
                                // console.log('Audio length: ' + enclosureData.length);
                            }
                        } else if ( enclosureData.type.indexOf( 'image' ) >= 0 ) {
                            itemData.imUrl = enclosureData.url;

                            if ( itemData.icon == null ) {
                                itemData.icon = enclosureData.url;
                            }
                        } else {
                            console.log( 'Unknown enclosure Type: ' + enclosureData.type );
                        }
                    }

                    if ( itemData.icon == null ) {
                        let parser = new DOMParser();
                        let parsedHtml = parser.parseFromString( itemData.description, 'text/html' );

                        if ( parsedHtml.images[0] ) {
                            itemData.icon = parsedHtml.images[0].src;

                            // console.log("Image scanned: " + itemData.thumbnailUrl);
                        }
                    }

                    if ( itemData.icon == null ) {
                        itemData.icon = feed.icon;
                    }

                    if ( itemData.imUrl == null ) {
                        itemData.imUrl = itemData.icon;
                    }

                    itemList.push( itemData );
                } );

                return itemList;
            } )
            .catch( error => {
                console.error( 'error: ', error );

                return null;
            } );
    }
}
