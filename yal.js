/*
 * Author: Dmitri Pavlenkov
 * Copyright: Copyright 2010 by Dmitri Pavlenkov.  All rights reserved.
 * License: MIT License
 * Homepage: http://github.com/syntard/yal-js/blob/master/README
 * Source: http://github.com/syntard/yal-js/blob/master/yal.js
 * Changes: http://github.com/syntard/yal-js/blob/master/CHANGES
 * Created: 2010-10-26
 * Version: 0.01
 *
 *
 * This file defines a lisp interpreter
 */


var yal={};

(function ($) {

$["Stream"]=function () {}
$["Stream"].prototype={};

$["InputStream"] = function () {
    this["read-char"]=true;
}
$["InputStream"].prototype = new $["Stream"]();

$["StringInputStream"] = function (source) {
    var str=source;
    var pos=0;
    var len=source.length;
    this["eof"]=false;
    this["eof-value"]=-1;
    this["eof-value-p"]=function (value) {
        return (value === this["eof-value"]);
    };
    this["read-char"]=function () {
        this["eof"] = (pos >= len);
        return this["eof"] ? this["eof-value"]
                          : str[pos++];
    };
    this["peek-char"]=function () {
        var eof= ( pos+1 >= len );
        return eof ? this["eof-value"]
                   : str[pos+1];
    };
}
$["StringInputStream"].prototype=new $["InputStream"]();


})(yal);

