"use strict";

import HttpService from './HttpService';

export default class OfferService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:3000/offers' }


    static updateOffer(offer) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${offer._id}`, offer, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static createoffer(offer) {
        offer.id = Math.floor((Math.random() * 100000000) + 1).toString();
        return new Promise((resolve, reject) => {
            HttpService.post(OfferService.baseURL(), offer, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}
