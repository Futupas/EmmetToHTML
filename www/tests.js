'use strict';

// console.log('div>id1#ddd'.toHtml());
console.log(window.emmetToPseudoHTML('div>id1#ddd+ff'));

console.log('------------');
console.log('div>id1#ddd+ff>rt>ds^ui+kk');
console.log('0, 3, 11, 14, 17, 20, 23');
console.log('div>id1#ddd+ff>rt>ds^ui+kk+(dkl+(dt>j>d+d)+df+l)^jj');
console.log('0, 3, 11, 14, 17, 20, 23, 27*, 31*, 35, 37, 39, 42, 45, 48');
console.log(window.emmetToPseudoHTML('div>id1#ddd+ff>rt>ds^ui+kk+(dkl+(dt>j>d+d)+df+l)^jj'));
