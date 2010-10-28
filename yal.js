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

var yal = {};

(function ($) {

    $["StringInputStream"] = function (source) {
        this["str"] = source || "";
        this["pos"] = 0;
        this["len"] = source.length;
    };
    $["StringInputStream"].prototype = {
        "eof" : false,
        "eof-value" : -1,
        "eof-value-p" : function (value) {
            return (value === this["eof-value"]);
        },
        "read-char" : function () {
            this["eof"] = (this.pos >= this.len);
            var char = this["peek-char"]();
            this.pos = this.pos + 1;
            return char;
        },
        "peek-char" : function () {
            var eof = (this.pos >= this.len);
            return eof ? this["eof-value"]
                       : this.str[this.pos];
        },
        "at-eof-p"  : function () {
            return this["eof-value-p"](this["peek-char"]());
        }
    };

    $["*standard-input*"] = {};

    $["*readtable*"] = {
        " "     : " ",
        "\t"    : " ",
        "\n"    : " ",
        "\r"    : " ",
        "#"     : "dispatch",
        "#\\"   : null
    };

    $["make-string-input-stream"] = function (source, start, end) {
        var s = source || "",
            n = start || 0,
            m = end || str.length;
        return new $["StringInputStream"](s.substring(n, m));
    };

    $["get-macro-character"] = function (char, readtable) {
        var t = readtable || $["*readtable*"];
        return t[char];
    };
    function EndsWithinObject() {};
    EndsWithinObject.prototype = Error;

    $.exceptions = {};
    function makeException () {
        for (var i=0; i<arguments.length; i++) {
            eval("function "+arguments[i]+" () {}; $.exceptions[arguments[i]] = " + arguments[i] + ";");
            $.exceptions[arguments[i]].prototype = Error;
        }
    }
    makeException("EndsWithinObject","StreamReachedEnd");

    $["read"] = function (input_stream, eof_error_p, eof_value, recursive_p) {
        var stream = input_stream || $["*standard-input*"],
            eofp = eof_error_p === false ? false : true,
            eofv = eof_value || null,
            recp = recursive_p || false,
            str = "",
            rt = $["*readtable*"],
            char = "",
            cont = null,
            rc = function () { return stream["read-char"](); },
            pc = function () { return stream["peek-char"](); },
            atp = function () { return stream["at-eof-p"](); },
            wcp = function () {
                return rt[pc()] === " ";
            },
            rtf, mc, mcf,
            nint = 0,
            nfloat = 0;
        while (wcp()) {
            rc();
        }

        if (atp()) {
            if (recp) {
                throw new $.exceptions.EndsWithinObject("ends within object");
            }
            if (eofp) {
                throw new $.exceptions.StreamReachedEnd("stream reached its end");
            }
            return eofv;
        }
        char = pc();
        rtf = rt[char];
        if (rtf === "dispatch") {
            mc = rc();
            mcf = rt[char + mc];
            return mcf(stream, char, mc);
        }
        if (typeof rt === "function") {
            return rt(stream, char);
        }
        while (! (atp() || wcp())) {
            str = str + rc();
        }
        nint = parseInt(str);
        nfloat = parseFloat(str);
        if (isNaN(nfloat)) {
            return ["symbol", str];
        }
        return Math.abs(nfloat) > Math.abs(nint) ? nfloat : nint;
    };

})(yal);
