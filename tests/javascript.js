dojo.provide("yal-js.tests.javascript");


doh.registerGroup("tests.javascript-eval",
    new TFRunGroup({

        "direct":
            function () {doh.assertEqual(1,controltest());} ,
        "call":
            function() {doh.assertEqual(2, controltest.call(testObj) );},
        "apply":
            function() {doh.assertEqual(2, controltest.apply(testObj) );},
        "eval direct":
            function () {doh.assertEqual(1,evaltest());} ,
        "eval call":
            function() {doh.assertEqual(2, evaltest.call(testObj) );},
        "eval apply":
            function() {doh.assertEqual(2, evaltest.apply(testObj) );}
    }),
        function() {
            testValue=1;
            testObj={testValue: 2};

            evaltest = function () {
                var dis = this;
                // it works now... returns 2 on call and apply
                return eval("(function() {return this.testValue;}).call(dis);");
                // this, however, didn't work: it returned 1, not 2
                //return eval("(function() {return this.testValue;})();");
            }
            controltest = function () {
                return this.testValue;
            }
        }
    );


doh.registerGroup("tests.javascript-closure",
    new TFRunGroup({
        "capture":
            function () {doh.assertEqual(3,testFun1());}
    }),
    function () {
        testValue = 3;

        testFun1 = (function () {
            var val = testValue;
            function testFun1 () {
               return val;
            };
            return testFun1;
        })();
        testValue = 4;
    }
    );
