dojo.provide("yal-js.tests.module");

//This file loads in all the test definitions.

try{
     //Load in the demoFunctions module test.
     dojo.require("yal-js.yal");
     dojo.require("yal-js.tests.InputStream");
}catch(e){
     doh.debug(e);
}
