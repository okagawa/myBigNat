export class BigNat {
    public base: number;
    private d: Int32Array;
    private digits: number;
 
    constructor (base: number, n: number) {
        this.base = base;
        let count: number = 0
        let t: number = n >= 0 ? n : -n;
        let sign : boolean = n >= 0 ? true : false;

        this.digits = (Math.log(t) / Math.log(base))|0 + 1;
        this.d = new Int32Array(this.digits);

        while( count < this.digits) {
            this.d[count] = (t % base) * (sign == true ? 1 : -1 );
            t =  (t / base)|0;
            count++;
        }
    }

    public toNumber() : number {
        let t: number = 0;
        let c: number = this.digits - 1;
        let sign: number = this.d[0] >= 0 ? 1 : -1;
        while(c >= 0) {
            t = t * this.base + this.d[c] * sign;
            c--;
        }
        return(t*sign);
    }

//    public abs() : BigNat {
//
//    }

}