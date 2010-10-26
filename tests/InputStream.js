dojo.provide("yal-js.tests.InputStream");

function TF(name,setup,test,teardown) {
    this["name"]=name||"_no name_";
    this["runTest"]=test;
    this["setUp"]=setup||function() {};
    this["tearDown"]=teardown||function() {};
}

doh.register("tests.InputStream",
[   new TF( "create",
            function () {
                this["stream"]=new yal["InputStream"]();
            },
             function () {
                doh.assertTrue(this["stream"]["read-char"]);
            },null)
]);
doh.run();

