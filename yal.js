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
    this["str"]=source;
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


})(yal);