"use strict";

import HttpService from './HttpService';

export default class UserService {

    constructor() {
    }

    static baseURL() {
        return 'http://localhost:3000/request'
    }

    static answerRequest(requestId, status) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/answer`, {requestId: requestId, status: status}, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });

    }

    static finishRequest(requestId) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/finish`, {requestId: requestId}, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });

    }

    static cancelGame(requestId) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/cancel`, {requestId: requestId}, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });

    }

    static createRequest(offerId, discordTag, message) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${this.baseURL()}/create`, {
                offerId: offerId,
                discordTag: discordTag,
                message: message
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });

    }

    static getRequest(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/${id}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                } else {
                    reject('Error while retrieving offer');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });

    }


}
