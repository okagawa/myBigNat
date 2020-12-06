// 難しく考えないで、最終的にはbase = 1_000_000_000とする。(数字9文字)
//   2^63-1 < 999_999_999^2
// デバッグには base = 100_000にする。(数字5文字)
export class BigNat {
    private base: number = 100000;
    public d: Array<number>;
    private size: number;
 
    // 与えられた数字文字列、BigNatとして格納する
    constructor (n_s: string) {
        if( !n_s ) { n_s = "0"; }
        
        // 符号を判定する。
        let sign : number = n_s[0]=="-" ? -1 : +1;

        // 数字以外の文字を無視して正規化する
        var canon = "";
        var c;
        for( var i=0; i< n_s.length; i++ ) {
            c = n_s[i];
            if( "0123456789".indexOf(c) > -1 ) {
                canon += c;
             }
        }

        // 先頭の0を除去
        while( canon.substring(0,1) == "0" ) {
            canon = canon.substring(1);
        }
        if( !canon ) {
            canon = "0";
            sign = 1;
        }

        // 要素の個数
        this.size = Math.ceil( canon.length/5 );
        // 最大要素の桁数
        var len0 = canon.length % 5;
        if( len0 == 0 ) { len0 = 5; }

        this.d = new Array<number>(this.size);
        // 降順に格納する。先頭に0がないので必ず十進法で評価される。
        this.d[0] = eval( canon.substring(0, len0) );

        var pos = len0;
        var tmp;
        for( var i = 1; i < this.size; i++ ) {
            tmp = canon.substring(pos, pos+5);
            pos += 5;
            // 数値に変換。必ず十進法で評価されるよう0を消す。
            this.d[i] = eval("1" + tmp) - this.base;
        }

        if( sign < 0) {
            this.d = this.bneg( this.d ) ;
        }

        this.d.reverse();
    }

    public bneg( bn:Array<number> ) : Array<number>{
        var ret = Array.from(bn, x => x * -1);
        return( ret );
    }

    public toNumber() : number {
        let t: number = 0;
        let c: number = this.size - 1;
        let sign: number = this.d[0] >= 0 ? 1 : -1;
        while(c >= 0) {
            t = t * this.base + this.d[c] * sign;
            c--;
        }
        return(t*sign);
    }

    public toString() : string {
        var ret:string = "";
        var tmp = this.d.reverse();

        ret = tmp[0].toString();
        for (var i = 1; i < this.size; i++) {
            
        }

        return(ret);
    }

//    public abs() : BigNat {
//
//    }

}