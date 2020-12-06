var objDate0 = new Date();
var tick0 = objDate0.getTime();
var BIG_UNIT = 100000;

var A,B,C,Test,Test1,Test2;

//Test=bpow([2], [59]);
//_debug( Math.pow(2,30) );
//_debug( bdigit(Test) );

var A=bset("2"), B=bset("59"), C=bset("1");
var N = bsub( bpow( A, B ), C );
var I;

document.write("<p>Checking whether it is divisible by ...");
for(var i=170001; i<200000; i+=2 ) {
	if(i%1000==1) document.write(  (i-1) + "...<br /> ");

	if(i%3==0||i%5==0||i%7==0||i%11==0||i%13==0||i%17==0||i%19==0||
	i%23==0||i%29==0||i%31==0||i%37==0||i%41==0||i%43==0||i%47==0||
	i%53==0||i%59==0||i%61==0||i%67==0||i%71==0||i%73==0||i%79==0||
	i%83==0||i%89==0||i%93==0||i%97==0||i%101==0||i%103==0||i%107==0||
	i%109==0||i%113==0||i%127==0||i%131==0||i%137==0||i%139==0||i%149==0)continue;

	var I = bset( i.toString() );

	if( bmod( N, I ) == 0 ) {
		document.write( "</p>" );
		document.write( "<h2>" + bshow(N) + " = " + i + "&#215;" + bshow(bdiv(N, I)) + "</h2>");
		break;
	}

}




var objDate1 = new Date();
var tick1 = objDate1.getTime();
var cost1 = tick1 - tick0;
_debug("Cost " + cost1/1000 + " sec");

/*
var test= Math.pow(2,57)-1;

isPrime_v1( test );

var objDate1 = new Date();
var tick1 = objDate1.getTime();
var cost1 = tick1 - tick0;
_debug("Cost " + cost1/1000 + " sec");

isPrime( test );


var objDate2 = new Date();
var tick2 = objDate2.getTime();
var cost2 = tick2 - tick1;
_debug("Cost " + cost2/1000 + " sec");

*/


function isPrime_v1( number ) {
_debug("test1");
    if( number < 2 || number != Math.floor(number) ) {
        _debug("[ERROR] Unexpected input " + number + " at function isPrime");
        return false;
    }

    for( var i=3; i <= Math.sqrt(number); i+=2 ) {
        if( number % i ==0 ) {
            _debug( number + " divisible by " + i );
            return false;
        }
    }

    _debug( "* " + number + " is prime" );
    return true;
}




function isPrime( argument ) {
	if( typeof argument == "number" ) {
	 	if( argument < 2 || argument != Math.floor( argument ) ) {
			_debug( "[ERROR] illegal argument at function isPrime: " + argument );
			return null;
		} else if( argument > Math.pow( 2, 53 ) ) {
			_debug( "[ERROR] float argument &gt; 2^53 at function isPrime: " + argument );
			return null;
		}

		return isPrimeN( argument );

	} else if( isBigInt( argument ) ) {

		var f = b2float( argument );

		if( f < 2 || f != Math.floor( f )  ) {
			_debug( "[ERROR] illegal argument at function isPrime: " + bshow( argument ) );
			return null;
		}

		if( f < Math.pow( 2, 53 ) ) return isPrimeN( f );
		else return isPrimeB( argument );

	}

	_debug( "[ERROR] unknown type of argument at function isPrime: " + argument );
	return null;

}

function isPrimeN( n ) {

_debug("n= " + n);

	if( typeof n != "number" || n<2 || n!=Math.floor(n) || n>Math.pow(2,53) ) {
		_debug( "[ERROR] illegal argument at function isPrimeN: " + n );
		return null;
	}

	// 明白な素数を排除
	if( n==2 || n==3 || n==5 || n==7 ) return true;

	// 明白な非素数を排除
	if( n%2==0 || n%3==0 || n%5==0 || n%7==0 ) {
		_debug( n + " divisible by 2, 3, 5, or 7" );
		return false;
	}

	var max = Math.floor( Math.sqrt( n ) );
	var d_max = Math.floor( max/10 );
	var d1, d3, d7;

	// 割る数、単位10
	for(var d = 1; d <= d_max; d++ ) {

//_debug("d= " + d);

		d1 = d.toString() + "1";

		if( n % d1 == 0 ) {
			_debug( n + " divisible by " + d1 );
			return false;
		}
//else _debug( n + " not divisible by " + d1 );

		d3 = d.toString() + "3";

		if( n % d3 == 0 ) {
			_debug( n + " divisible by " + d3 );
			return false;
		}
//else _debug( n + " not divisible by " + d3 );

		d7 = d.toString() + "7";

		if( n % d7 == 0 ) {
			_debug( n + " divisible by " + d7 );
			return false;
		}
//else _debug( n + " not divisible by " + d7 );


	}

	_debug( n + " is prime" );

	return true;
}

function isPrimeB( B ) {

	_debug("NOT IMPLEMENTED YET - isPrimeB");
	return null;
}



// Bの平方根の整数部分を求める
/*
function bsqrt( B ) {
	if( !isBigInt(B) ) return null;

	var f = b2float( B );

	if( f<0 ) return null;

	var x = Math.floor( Math.sqrt( f ) );

_debug("x=" + x)

	var X = bset( x.toString() );

	var R = bsub( B, bmul( X, X ) );

	_debug("square root of " + bshow(B) );
	_debug("R = " + bshow(R) );

	if( babscmp( R, [0] ) == 0 ) {
		_debug( bshow(X) + " exactly");
		return X;
	} else if( bsign(R) > 0 ) {
		for( var i=0; i<100; i++ ) {

document.write( bshow(X) + ", " );
			X = badd( X, [1] );
			R = bsub( B, bmul( X, X ) );
	_debug("#R = " + bshow(R) );
			if( bsign(R)<0 ) break;
		}
	} else {
		for( var i=0; i<100; i++ ) {

document.write( bshow(X) );

			X = bsub( X, [1] );
			R = bsub( B, bmul( X, X ) );
	_debug("*R = " + bshow(R) );
			if( bsign(R)>0 ) {
				X = bsub( X, [1] );
				break;
			}
		}
	}

	_debug( bshow(X) + "^2 = " + bshow(bmul(X,X)) );

	var Y = bsub( X, [1] );

	_debug( bshow(Y) + "^2 = " + bshow(bmul(Y,Y)) );

	return X;

}
*/

// BのP乗をmodで割ったときの余りを求める
// P, mod はBigInt形式でも数値でもかまわない。
function bpowmod( B, P, mod ) {
	if( !isBigInt(B) ) return null;

	var power;
	if( typeof P == "number" ) power = P;
	else if( typeof P == "object") power = b2float( P );
	else return null;

	if( power != Math.floor(power) || power < 0 ) {
		_debug("[ERROR] inadequate power at function bpowmod(): power=" + power );
		return null
	} else if( power > Math.pow(2, 52) ) {
		_debug("[NOT IMPLEMENTED YET] a big power at function bpowmod(): power=" + power );
		return null
	}


	var M = new Array();
	if( typeof mod == "number" ) M = bset( mod.toString(10) );
	else if( isBigInt( mod ) ) M = bcopy( mod );
	else return null;


	var fmod = b2float( M );
	// modは2以上でなければならない
	if( fmod <= 1 ) {
		_debug("[ERROR] inadequate mod at function bpowmod(): mod=" + bshow(M) );
		return null
	}



	// 0乗と1乗は直接計算
	if( power == 0 ) {
		if( babscmp( B, [0] ) == 0 ) return [ 0 ];
		else return [ 1 ];
	} else if( power == 1 ) return bmod( B, M );

	// powerを2進展開する
	var bin_str = power.toString(2);
	var max = bin_str.length - 1;
	var bin_digit = new Array();
	for( var i=0; i<=max ; i++ ) {
		bin_digit[i] = bin_str.charAt( max - i );


	}

	// Bの2^n乗をMで割った剰余計算する
	var _B = new Array(); // 配列の配列
	_B[0] = bmod( B, M );
	for( var n = 1; n <= max; n++ ) {
		_B[n] = bmod( bmul( _B[ n-1 ] , _B[ n-1 ] ) , M );
	}

	var Ret = [ 1 ];
	for( var i = 0; i < bin_digit.length; i++ ) {
		if( bin_digit[i] == 1 ) Ret = bmod( bmul( Ret, _B[i] ), M );
	}

	return Ret;

}


// bpow BのP乗を求める
// PはBigInt形式でも通常の自然数でもかまわない。
function bpow( B, P ) {

	if( !isBigInt(B) ) return null;

	var power;
	if( typeof P == "number" ) power = P;
	else if( typeof P == "object") power = b2float( P );
	else return null;

	if( power != Math.floor(power) || power > 2048 || power < 0 ) {
		_debug("[ERROR] inadequate power at function bpow(): power=" + power );
		return null
	}

	// 3乗までは直接計算する
	if( power == 0 ) {
		if( babscmp( B, [0] ) == 0 ) return [ 0 ];
		else return [ 1 ];
	} else if( power == 1 ) return B;
	else if( power == 2 ) return bmul( B, B );
	else if( power == 3 ) return bmul( bmul( B, B ), B );

	// powerを2進展開する
	var bin_str = power.toString(2);
	var max = bin_str.length - 1;
	var bin_digit = new Array();
	for( var i=0; i<=max ; i++ ) {
		bin_digit[i] = bin_str.charAt( max - i );
	}

	// Bの2^n乗を計算する
	var _B = new Array(); // 配列の配列
	_B[0] = B; // 最初の要素はB自身
	for( var n = 1; n <= max; n++ ) {
		_B[n] = bmul( _B[ n-1 ] , _B[ n-1 ] );
	}

	var Ret = [ 1 ];
	for( var i = 0; i < bin_digit.length; i++ ) {
		if( bin_digit[i] == 1 ) Ret = bmul( Ret, _B[i] );
	}

	return Ret;
}

// bdiv わり算
function bdiv( B1, B2 ) {
	var result = bdivmod( B1, B2 );
	return result[0];
}

function bmod( B1, B2 ) {
	var result = bdivmod( B1, B2 );
	return result[1];
}


// 商と余り
function bdivmod( B1, B2 ) {

	if( !isBigInt(B1) || !isBigInt(B2) ) return null;

	var sign2 = bsign( B2 );

	// 浮動小数点演算で商を逐次近似

	// 第0近似
	var _Q = _b2fdiv2b( B1, B2 );

	var _R = new Array();

	var step;

	for( step=1; step<100; step++ ) {

//		_debug("### STEP " + step);

//		_debug("_Q= " + bshow( _Q ));

		// 剰余を求める
		_R = bsub( B1, bmul( B2, _Q ) );

//		_debug("_R= " + bshow( _R ));

		// 剰余が非負で割る数B2より絶対値が小さければ計算終了
		if( bsign( _R ) >=0 && babscmp( _R, B2 ) < 0 ) return [ _Q, _R ];

		// しからざれば ...
		if( sign2 >= 0 || step%2==0 ) {
			// 残差をB2で割った商を足して_Qを補正
			_Q = badd( _Q, _b2fdiv2b( _R, B2 ) );
		} else {
			// 負数で割る場合、商+1も試さねばならない
			_Q = badd( _Q , [1] );
		}
	}


	_debug("[Error] Too many steps at function bdivmod: _R=" + bshow(_R));
	return null;

}

// BigInt形式を受け取り浮動小数点計算で除算し結果を再びBigInt形式で返す
function _b2fdiv2b( B1, B2 ) {
	return bset(   Math.floor( b2float(B1)/b2float(B2) ).toString()   );
}


function b2float( B ) {
	var sign;
	sign = ( bsign( B ) < 0 )? -1 : 1;

	var Work = new Array();
	if( sign < 0 ) Work = bneg( B );
	else Work = bcopy( B );

	var ret=0;

	for( var i=0 ; i<Work.length; i++ ) {
		ret += ( Work[i] * Math.pow( BIG_UNIT, i ) );
	}

	return ( sign < 0 )? -ret : ret ;
}






function bmul( B1, B2 ) {

	if( !isBigInt(B1) || !isBigInt(B2) ) return null;

	var zeros, _mul;
	var Work = bset("0");


	for( var idx1=0; idx1 < B1.length; idx1++ ) {
		for( var idx2=0; idx2 <B2.length; idx2++ ) {
			zeros = getZeros( ( idx1 + idx2 )*5 );
			_mul = ( B1[idx1] * B2[idx2] ).toString(10) + zeros;
			Work = badd( Work, bset(_mul) );
		}
	}

	return Work;

}

function getZeros( how_many ) {

	var _z = how_many % 10;
	var _z10 = (how_many - _z) / 10;

	var ret = "";

	for( var i = 0; i < _z10; i++ ) ret += "0000000000";
	for( var i = 0; i < _z; i++ ) ret += "0";

	return ret;
}



function bneg( B ) {
	if( !isBigInt( B ) ) return null;

	var ret = new Array();

	for( var i=0; i<B.length; i++ ) ret[i] = (-1) * B[i];
	return ret;
}


function badd( B1, B2 ) {

	if( !isBigInt(B1) || !isBigInt(B2) ) {
		return null;
	}

	var sign1 = bsign(B1), sign2 = bsign(B2);
	var ret_sign;

	// 結果の正負の判定
	if( sign1 * sign2 <0 ) {
		var abscmp = babscmp( B1, B2 );
		if( abscmp > 0 ) ret_sign = sign1;
		else if( abscmp < 0 ) ret_sign = sign2;
		else ret_sign = 1; // 符号だけ異なって絶対値が同じ、和はゼロ

	} else if( sign1 >= 0 ) {
		ret_sign = 1; // 正の数同士の足し算
	} else {
		ret_sign = -1; // 負の数同士の足し算
	}

	var sum = new Array();

	var max = Math.max( B1.length, B2.length );

	for( var i=0; i < max; i++ ) {
		sum[i] = 0;
		if( B1[i] ) sum[i] += B1[i];
		if( B2[i] ) sum[i] += B2[i];

		//_debug("B1[" + i + "] = " + B1[i]);
		//_debug("B2[" + i + "] = " + B2[i]);
		//_debug( "RAW sum[" + i + "] = " + sum[i]);
	}


	// くりあがり等
	for( var i=0; i<sum.length; i++ ) {
		if( ret_sign >= 0 ) { // 結果は非負
			while( sum[i] >= BIG_UNIT ) {
				sum[i]-=BIG_UNIT;
				if(typeof sum[i+1] == "number" ) sum[i+1]++;
				else sum[i+1] = 1;
			}
			while( sum[i] < 0 ) {
				sum[i]+=BIG_UNIT;
				if(typeof sum[i+1] == "number" ) sum[i+1]--;
				else _debug("[Unexpected] sum[i+1] undefined when i=" + i);
			}
		} else { // 結果は負
			while( sum[i] > 0 ) {
				sum[i]-=BIG_UNIT;
				if(typeof sum[i+1] == "number" ) sum[i+1]++;
				else _debug("[Unexpected] sum[i+1] undefined when i=" + i);
			}
			while( sum[i] <= - BIG_UNIT ) {
				sum[i]+=BIG_UNIT;
				if(typeof sum[i+1] == "number" ) sum[i+1]--;
				else sum[i+1] = -1;
			}
		}

		//_debug( "ANS sum[" + i + "] = " + sum[i]);

	}

	// 正と負の足し算の結果、打ち消し合って要素数が減る可能性を考慮する
	return bset( bshow( sum ) );
}

function bsub( B1, B2 ) {
	return ( badd( B1, bneg(B2) ) );
}



// bsign 符号を返す
function bsign( B ) {
	if(! isBigInt( B )) return null;

	for( var i=0; i<B.length; i++ ) {
		if(B[i]<0) return -1;
	}

	return 1;
}

// babscmp 2引数の絶対値の大小比較
function babscmp( _bi1, _bi2 ) {
	if(! isBigInt( _bi1 ) || !isBigInt( _bi2 ) ) return null;

	var B1 = new Array();
	var B2 = new Array();

	if(bsign( _bi1 )>=0) B1 = bcopy( _bi1 );
	else B1 = bneg( _bi1 );

	if(bsign( _bi2 )>=0) B2 = bcopy( _bi2 );
	else B2 = bneg( _bi2 );


	if( B1.length != B2.length ) {

		return B1.length - B2.length;
	}

	// 要素数が等しい
	var last_idx = B1.length - 1;

	for( var i = last_idx; i >=0; i-- ) {

		if( B1[i] != B2[i] ) return B1[i] - B2[i];
	}

	return 0;
}

// bcopy BigInt配列をコピー
function bcopy( B ) {
	if( !isBigInt( B ) ) return null;

	var ret = new Array();

	for( var i=0; i<B.length; i++ ) {
		ret[i] = B[i];
	}
	return ret;
}

// bshow BigInt配列を受け取り通常の十進法表示フォーマット文字列を返す
function bshow( B ) {
	if( !isBigInt( B ) ) return null;

	// フォーマットするのでコピーを操作する
	var Work = new Array();

	var sign;
	sign = bsign( B );


	// 非負であることが保証される
	if( sign<0 ) Work = bneg( B );
	else Work = bcopy( B );


	for( var i=0; i < Work.length; i++ ) {
		// 最大要素以外は0パディング
		if( i < Work.length-1 ) Work[i] = ( eval(Work[i]) + BIG_UNIT ).toString().substr( 1 , 5 );
	}

	// 桁区切りのスペースを入れる
	var str = my_reverse(Work).join(" ");

	// マイナスの数なら符号をつける
	if( sign < 0 ) {
		str = "- " + str;
	}

	return str;
}


function _debug( message ) {
	document.write("<p>Debug: " + message + ".<\/p>");
}


// 科学記法を必要最小限のみ認識する
// すべての可能性を扱えるわけでなく主にJavaScript自身の出力形式を
function _canonical( str ) {


//2.2220000222222167e+53
	var part = str.match(/^(\-?)(\d+)\.(\d+)e([\+|\-]\d+)/i);


	if(part) {

/*
_debug("part[1] = " + part[1]);
_debug("part[2] = " + part[2]);
_debug("part[3] = " + part[3]);
_debug("part[4] = " + part[4]);
*/
		var power = eval( part[4] );
		if( power < 0 ) return "0";

		// part[3] の右端に必要なだけ文字0をつなげる
		// もしpart[3]がe10をかけても小数部分があるなら、小数部分は捨てる
		var c;
		var ret = "";
		for( var i=0; i < power; i++ ) {
			c = part[3].charAt(i) || "0" ;
			ret += c;
		}

		ret = part[2].toString() + ret;
		// マイナス符号
		if( part[1] ) ret = part[1] + ret;

		return ret;
	} else {
		return str; // 何もしない
	}
}




// bset 文字列を読んでBigInt配列に格納
function bset( str ) {


	if( !str ) str="0";

	str = _canonical( str );


	// 符号を判定する
	var sign;
	if( str.substr( 0, 1 ) == "-" ) sign = -1;
	else sign = 1;

	// 数字以外のものを無視して正規化
	var canon = "";
	var c;
	for( var i=0; i<str.length; i++ ) {
		c = str.charAt( i );
		if( "0123456789".indexOf( c ) > -1 ) canon += c;
	}


	// 先頭の0を除去
	while( canon.substr( 0, 1 ) == "0" ) {
		canon = canon.substr( 1 , canon.length-1 );
	}


	// 何もなくなってしまったら0とみなす
	if(canon.length==0) {
		canon = "0";
		sign = 1;
	}


	// 要素の個数
	var size = Math.ceil( canon.length / 5 );

	// 最大要素の桁数
	var len0 = canon.length % 5;
	if(len0==0) len0=5;

	// 格納先を作る
	var Work = new Array();
	// とりあえず降順に格納。先頭には0がないので必ず十進法で評価される
	Work[0] = eval( canon.substr( 0, len0 ) );


	var pos = len0;
	var tmp;

	for( var i=1; i<size; i++ ) {
		tmp = canon.substr( pos , 5 );
		pos += 5;

		// 数値に変換。必ず十進法で評価されるよう0を消す
		Work[i] = eval( "1" + tmp ) - BIG_UNIT;

	}

	if( sign < 0 ) Work = bneg( Work );

	// 昇順にする
	return my_reverse( Work );

}

function my_reverse( list ) {
	if(!list || !list.length) return null;

	var ret = new Array();
	var last_idx = list.length-1;

	for( var i=0; i<list.length; i++ ) ret[i] = list[ last_idx - i ];

	return ret;
}


function isBigInt( a ) {
	if( typeof a != "object" ) return false;
	if( typeof a.length != "number" || a.length < 1 ) return false;
	for( var i=0; i<a.length; i++ ) {
		if( typeof a[i] != "number" ) return false;
		if( Math.abs( a[i] ) >= BIG_UNIT || Math.floor( a[i] ) != a[i] ) return false;
		if( i>=1 && a[i]*a[i-1]<0 ) {
			return false;
		}
	}

	return true;
}


// 桁数を返す
function bdigit( B ) {
	if(! isBigInt( B ) ) return null;

	return (B.length-1)*5 + (B[B.length-1]).toString(10).length;
}



// 数値とBigIntに対するラッパー
// 必ず数値を返す
function barg2f( argument ) {

	// 最初から数値なら何もしない
	if( typeof argument == "number" ) {

		if( Math.abs(argument) > Math.pow( 2, 53 ) ) {
			_debug( "[WARNING] float argument, abs value &gt; 2^53 at function barg2f: " + argument );
		}
		return argument;
	} else if( isBitInt( argument ) ) {
		return b2float( argument );
	}

	_debug( "[ERROR] unknown type of argument at function barg2f: " + argument );
	return null;
}

// 必ずBigIntを返す
function barg2b( argument ) {
	if( typeof argument == "number" ) {

		if( Math.abs(argument) > Math.pow( 2, 53 ) ) {
			_debug( "[WARNING] float argument, abs value &gt; 2^53 at function barg2b: " + argument );
		}

		return bset( argument.toString() );

	} else if( isBitInt( argument ) ) {
		// 最初からBigIntなら何もしない
		return argument;
	}

	_debug( "[ERROR] unknown type of argument at function barg2b: " + argument );
	return null;
}

/*
     FILE ARCHIVED ON 07:46:59 Mar 06, 2005 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:07:59 Jun 10, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 939.275 (3)
  esindex: 0.012
  captures_list: 1040.645
  CDXLines.iter: 15.289 (3)
  PetaboxLoader3.datanode: 1102.144 (4)
  exclusion.robots: 0.193
  exclusion.robots.policy: 0.179
  RedisCDXSource: 81.747
  PetaboxLoader3.resolve: 90.912
  load_resource: 279.91
*/
