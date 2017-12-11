// Multidimensional Array Object.
var a = new Array(4);
for (i = 0; i < 4; i++) {
  a[i] = new Array(4);
  for (j = 0; j < 4; j++) {
    a[i][j] = "[" + i + "," + j + "]";
  }
}

//Date  Object.
var   today = new Date();
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); 
endYear.setFullYear(today.getFullYear());
var msPerDay = 24 * 60 * 60 * 1000;
var daysLeft = (endYear.getTime() - today.getTime());
var daysLeft = Math.round(daysLeft);

// Math Object         
var math = require('math');
math.round(math.e, 3);        
math.atan2(3, -3) / math.pi;      
math.log(10000, 10);              
math.sqrt(-4);                   
math.pow([[-1, 2], [3, 1]], 2);   
math.derivative('x^2 + x', 'x');  

// expressions
math.eval('12 / (2.3 + 0.7)');   
math.eval('12.7 cm to inch');    
math.eval('sin(45 deg) ^ 2');    
math.eval('9 / 3 + 2i');         
math.eval('det([-1, 2; 3, 1])');  

// chaining
math.chain(3)
    .add(4)
    .multiply(2)
    .done(); // 14
