import { BigNat } from "./BigNat";

const bign = new BigNat("-123456987654321");

const contentsElem = document.getElementById('contents');
if(!!contentsElem) {
//    contentsElem.innerText = `${user.familyName} ${user.givenName}`;
    contentsElem.innerText = `${bign.d[0]},${bign.d[1]},${bign.d[2]},${bign.d[3]}\n${bign.toNumber()}`;
}
