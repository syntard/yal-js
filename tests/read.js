dojo.provide("yal-js.tests.read");


doh.registerGroup("tests.read",
    new TFRunGroup({
        "integer":
            function () {
                var res = yal.read(stream);
                doh.assertEqual("number", typeof res);
                doh.assertEqual(56, res);
            },
        "float":
            function () {
                var res = yal.read(stream);
                doh.assertEqual("number", typeof res);
                doh.assertEqual(56.1, res);
            },
        "symbol":
            function () {
                var res = yal.read(stream);
                doh.assertEqual("object", typeof res);
                doh.assertTrue(res.length && res.length === 2);
                doh.assertEqual("symbol", res[0]);
                doh.assertEqual("abcd", res[1]);
            },
         "eof-p false" :
            function () {
                var res = yal.read(stream, false, "end");
                doh.assertEqual("end", res);
            },
         "eof-p true" :
            function () {
                this.read = function () {return yal.read(stream); };
                doh.assertError(yal.exceptions.StreamReachedEnd, this, "read");
            },
         "recursive-p true" :
            function () {
                this.read = function () {return yal.read(stream, true, "end", true); };
                doh.assertError(yal.exceptions.EndsWithinObject, this, "read");
            }



    }),
    function () {
        stream = new yal["StringInputStream"](" 56 56.1 abcd");
    }
);

