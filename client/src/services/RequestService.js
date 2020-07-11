"use strict";

import HttpService from './HttpService';

export default class UserService {

    constructor() {
    }
    static baseURL() { return 'http://localhost:3000/request' }

    static answerRequest(requestId, status) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/answer`,{requestId:requestId, status:status},function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }
    static createRequest(offer) {
        return new Promise((resolve, reject) => {
            console.log(JSON.stringify({offer}))
            HttpService.post(`${this.baseURL()}/create`, {offer},function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }



}