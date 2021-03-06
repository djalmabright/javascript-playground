// JSON Stringfying  Type  coercions
var o = { };

var a = {
    b: 42,
    c: o,
    d: function(){}
};

// create a circular reference inside `a`
o.e = a;

// would throw an error on the circular reference
// JSON.stringify( a );

// define a custom JSON value serialization
a.toJSON = function() {
    // only include the `b` property for serialization
    return { b: this.b };
};

JSON.stringify( a );
