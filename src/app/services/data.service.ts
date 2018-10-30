import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DataService implements OnInit {
    url: string;
    constructor(private http: HttpClient) {
        this.url = "https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks";
    }
    ngOnInit() {
    }
    getData() {
        return this.http.get(this.url)
    }
    insertData(payload: any) {
        let url = this.url
        let promise = new Promise((resolve, reject) => {
            this.http.post(url, payload).toPromise()
                .then((res: any) => {
                    console.log(res);
                    resolve(res);
                }).catch((err: HttpErrorResponse) => {
                    reject(err.status);
                });
        });
        return promise;
    }
    deleteData(id: any) {
        let url = this.url + "/" + id
        let promise = new Promise((resolve, reject) => {
            this.http.delete(url).toPromise()
                .then((res: any) => {
                    console.log(res);
                    resolve(res);
                }).catch((err: HttpErrorResponse) => {
                    reject(err.status);
                });
        });
        return promise;
    }
}