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

try {
    dojo.provide("yal-js.yal");
} catch (e) {
    // we're not in dojo anymore
}

var yal={};

(function ($) {

$["StringInputStream"] = function (source) {
    this["str"]=source||"";
    this["pos"]=0;
    this["len"]=source.length;
};
$["StringInputStream"].prototype={
    "eof" : false,
    "eof-value" : -1,
    "eof-value-p" : function (value) {
        return (value === this["eof-value"]);
    },
    "read-char" : function () {
        this["eof"] = (this.pos >= this.len);
        var char=this["peek-char"]();
        this.pos=this.pos+1;
        return char;
    },
    "peek-char" : function () {
        var eof= ( this.pos >= this.len );
        return eof ? this["eof-value"]
                   : this.str[this.pos];
    }
};

$["*standard-input*"]={};

$["*readtable*"]={};

$["make-string-input-stream"] = function (source, start, end) {
    var s=source||"";
    var n=start||0;
    var m=end||str.length;
    return new $["StringInputStream"](s.substring(n,m));
}

$["get-macro-character"] = function (char, readtable) {
    var t=readtable || $["*readtable*"];
    return t[char];
}

$["read"] = function(input_stream, eof_error_p, eof_value, recursive_p) {
    var stream = input_stream || $["*standard-input*"];
    var eofp = eof_error_p || true;
    var eofv = eof_value || null;
    var recp = recursive_p || false;
}

})(yal);