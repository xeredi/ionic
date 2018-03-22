import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqliteProvider {

    public db: SQLiteObject;

    constructor() {
        if ( !this.db ) {
            console.log( 'Create connection' );

            var sqlite = new SQLite();

            sqlite.create( {
                name: 'press.db',
                location: 'default'
            } )
                .then(( db: SQLiteObject ) => {
                    console.log( "DB CONNECTED" );
                    this.db = db;
                } )
                .catch( e => console.log( e ) );
        }
    }

    open() {
        return new Promise(( resolve, reject ) => {
            if ( this.db ) {
                // console.log( "DB IS OPEN" );
                resolve( this.db );
            } else {
                console.log( "NEW CONNECTION" );
                var sqlite = new SQLite();

                sqlite.create( {
                    name: 'press.db',
                    location: 'default'
                } )
                    .then(( db: SQLiteObject ) => {
                        console.log( "DB CONNECTED" );
                        this.db = db;
                        resolve( this.db );
                    } )
                    .catch( e => {
                        console.log( e );
                        reject( e );
                    } );
            }
        } );
    }
}
