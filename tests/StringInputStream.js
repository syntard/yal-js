dojo.provide("yal-js.tests.StringInputStream");

doh.registerGroup("tests.StringInputStream",
    new TFRunGroup({
        "create":
            function () {
                doh.assertTrue(stream["peek-char"]);
            },
        "peek-char":
            function () {
                doh.assertEqual("a", stream["peek-char"]());
            },
        "read-char":
            function () {
                doh.assertEqual("a", stream["read-char"]());
            },
        "not eof":
            function () {
                doh.assertEqual("b", stream["peek-char"]());
                doh.assertFalse(stream["eof-value-p"](stream["read-char"]()));
            },
        "eof":
            function () {
                stream["read-char"]();
                doh.assertEqual("d", stream["read-char"]());
                doh.assertTrue(stream["eof-value-p"](stream["read-char"]()));
            },
        "at-eof-p":
            function () {
                doh.t(stream["at-eof-p"]());
            },
        "make-string-input-stream":
            function () {
                var stream = yal["make-string-input-stream"]("12345", 2, 4);
                doh.assertEqual("3", stream["read-char"]());
                stream["read-char"]();
                doh.assertTrue(stream["eof-value-p"](stream["read-char"]()));
            }
    }),
    function () {
        stream = new yal["StringInputStream"]("abcd");
    }
);

