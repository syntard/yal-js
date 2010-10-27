dojo.provide("yal-js.tests.wireup");

function TF(name,setup,test,teardown) {
    this["name"]=name||"_no name_";
    this["runTest"]=test;
    this["setUp"]=setup||function() {};
    this["tearDown"]=teardown||function() {};
}

function TFRunGroup() {
    var group=[];
    for(var i=0;i<arguments.length;i+=2) {
        group.push(new TF(arguments[i],null,arguments[i+1],null));
    }
    return group;
}
