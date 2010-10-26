dojo.provide("yal-js.tests.StringInputStream");

//(function () {
var stream=new yal["StringInputStream"]("abcd");
doh.register("tests.StringInputStream",
    new TFRunGroup(
        ["create",
            function () {doh.assertTrue(stream["peek-char"]);}],
        ["peek-char",
            function() {doh.assertEqual("a",stream["peek-char"]());}],
        ["read-char",
            function() {doh.assertEqual("a",stream["read-char"]());}],
        ["not eof",
            function() {doh.assertEqual("b",stream["peek-char"]());
                        doh.assertFalse(stream["eof-value-p"](stream["read-char"]()));}],
        ["eof",
            function() {stream["read-char"]();
                        doh.assertEqual("d",stream["read-char"]());
                        doh.assertTrue(stream["eof-value-p"](stream["read-char"]()));}]

        ));
//})();
