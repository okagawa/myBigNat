import { BigNat } from "./BigNat";

// const user = new User('岡川', '宏', 48);
const bign = new BigNat(10, -7654321);

const contentsElem = document.getElementById('contents');
if(!!contentsElem) {
//    contentsElem.innerText = `${user.familyName} ${user.givenName}`;
    contentsElem.innerText = `${bign.toNumber()}`;
}
