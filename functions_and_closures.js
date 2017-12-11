// Functions  and  Closures  together  
function getMeAClosure() {
    var canYouSeeMe = "here I am";
    return (function theClosure() {
        return {canYouSeeIt: canYouSeeMe ? "yes!": "no"}; 
    });
}
 
var closure = getMeAClosure();
closure().canYouSeeIt; //"yes!"

//Create an array of functions that add 1,2 and 3 respectively 
var createAdders = function() {
    var fns = [];
    for (var i=1; i<4; i++) { 
        (function(i) {
            fns[i] = (function(n) {
                return i+n;
            });
        })(i)    
    }
    return fns;
}
 
var adders = createAdders();
adders[1](7); 
adders[2](7); 
adders[3](7); 
