"use strict";

import HttpService from './HttpService';

export default class OfferService {

    constructor() {
    }

    static baseURL() {
        return 'http://localhost:3000/offers'
    }


    static updateOffer(offer) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${offer._id}`, offer, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static createOffer(offer) {
        offer.id = Math.floor((Math.random() * 100000000) + 1).toString();
        return new Promise((resolve, reject) => {
            HttpService.post(OfferService.baseURL(), offer, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getOffer(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${OfferService.baseURL()}/${id}`, function (data) {
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

    static getAllOffers() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }
}
