import { BigNat } from "./BigNat";

const bign = new BigNat(10, -7654321);

const contentsElem = document.getElementById('contents');
if(!!contentsElem) {
//    contentsElem.innerText = `${user.familyName} ${user.givenName}`;
    contentsElem.innerText = `${bign.toNumber()}`;
}
