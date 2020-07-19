"use strict";

import HttpService from './HttpService';

export default class ProfileService {

    constructor() {
    }

    static baseURL() {
        return 'http://localhost:3000/auth'
    }

    static getAllProfiles() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getProfile(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ProfileService.baseURL()}/${id}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                } else {
                    reject('Error while retrieving profile');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteProfile(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ProfileService.baseURL()}/${id}`, function (data) {
                if (data.message != undefined) {
                    resolve(data.message);
                } else {
                    reject('Error while deleting');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateProfile(profile) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${profile._id}`, profile, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

}
