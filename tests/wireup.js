dojo.provide("yal-js.tests.wireup");

function TF(name,setup,test,teardown) {
    this["name"]=name||"_no name_";
    this["runTest"]=test;
    this["setUp"]=setup||function() {};
    this["tearDown"]=teardown||function() {};
}

function TFRunGroup(obj) {
    var group=[];
    for(var p in obj) {
        if(obj.hasOwnProperty(p)) {
            group.push(new TF(p,null,obj[p],null));
        }
    }
    return group;
}
