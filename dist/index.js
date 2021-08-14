"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNat_1 = require("./BigNat");
const bign = new BigNat_1.BigNat("-123456987654321");
const contentsElem = document.getElementById('contents');
if (!!contentsElem) {
    //    contentsElem.innerText = `${user.familyName} ${user.givenName}`;
    contentsElem.innerText = `${bign.d[0]},${bign.d[1]},${bign.d[2]},${bign.d[3]}\n${bign.toNumber()}`;
}
