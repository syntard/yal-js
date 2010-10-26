dojo.provide("yal-js.tests.module");

//This file loads in all the test definitions.

try{
     dojo.require("yal-js.yal");
     dojo.require("yal-js.tests.wireup");
     dojo.require("yal-js.tests.StringInputStream");
}catch(e){
     doh.debug(e);
}
