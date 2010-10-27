dojo.provide("yal-js.tests.javascript");

function evaltest() {
    var dis = this;
    // it works now... returns 2 on call and apply
    return eval("(function() {return this.testValue;}).call(dis);");
    // this, however, didn't work: it returned 1, not 2
    //return eval("(function() {return this.testValue;})();");
}
function controltest() {
    return this.testValue;
}

var testValue=1;
var testObj={testValue: 2};

doh.register("tests.javascript",
    new TFRunGroup(

        "direct",
            function () {doh.assertEqual(1,controltest());} ,
        "call",
            function() {doh.assertEqual(2, controltest.call(testObj) );},
        "apply",
            function() {doh.assertEqual(2, controltest.apply(testObj) );},
        "eval direct",
            function () {doh.assertEqual(1,evaltest());} ,
        "eval call",
            function() {doh.assertEqual(2, evaltest.call(testObj) );},
        "eval apply",
            function() {doh.assertEqual(2, evaltest.apply(testObj) );}
        ));

