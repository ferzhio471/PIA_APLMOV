import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Location} from './climate';
import {Locations} from './location';

@Injectable({
    providedIn: 'root'
})

export class LocationDBService {

    location: Location;
    locations: Locations;

    private storage: SQLiteObject;
    locationsList = new BehaviorSubject([]);
    private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private platform: Platform,
        private sqlite: SQLite,
        private httpClient: HttpClient,
        private sqlPorter: SQLitePorter,
        private geolocation: Geolocation
    ) {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'positronx_db.db',
                location: 'default'
            })
                .then((db: SQLiteObject) => {
                    this.storage = db;
                    this.getLocationsData();
                });
        });
    }

    bdState() {
        return this.isDbReady.asObservable();
    }

    fetchLocations(): Observable<Locations[]> {
        return this.locationsList.asObservable();
    }

    getLocationsData() {
        this.httpClient.get(
            'assets/db_locations.sql',
            { responseType: 'text' }
        ).subscribe(data => {
            this.sqlPorter.importSqlToDb(this.storage, data).then(_ => {
                this.getLocations();
                this.isDbReady.next(true);
            }).catch(error => console.error(error));
        });
    }

    getLocations() {
        return this.storage.executeSql('SELECT * FROM locations', []).then(res => {
            let items: Locations[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({

                        name: res.rows.item(i).name,
                        region: res.rows.item(i).region,
                        country: res.rows.item(i).country,
                        lat: res.rows.item(i).lat,
                        lon: res.rows.item(i).lon,
                        tz_id: res.rows.item(i).tz_id,
                        localtime_epoch: res.rows.item(i).localtime_epoch,
                        localtime: res.rows.item(i).localtime
                    });
                }
            }
            this.locationsList.next(items);
        })
    }

    addLocation(l_name, region, country, lat, lon, tz_id, localtime_epoch, localtime) {

        let data = [l_name, region, country, lat, lon, tz_id, localtime_epoch, localtime];

        return this.storage.executeSql('INSERT INTO locations (l_name, region, country, lat, lon, tz_id, localtime_epoch, localtime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data).then(res => {
                this.getLocations();
            });


    }


}