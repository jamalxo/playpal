"use strict";

import HttpService from './HttpService';

export default class UserService {

    constructor() {
    }
    static baseURL() { return 'http://localhost:3000/request' }

    static answerRequest(requestobj) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${this.baseURL()}/answer`, requestobj,function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }
    static createRequest(requestobj) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${this.baseURL()}/create`, requestobj,function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }



}