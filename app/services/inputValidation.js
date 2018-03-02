var Joi = require('joi');

/*

    input validation service

*/

const isGoodArray = Joi.array().items(Joi.string(), Joi.number()).min(1);  //
const isGoodNumber = Joi.number().min(-100000000000).max(100000000000);    //
const isGoodString = Joi.string().regex(/^[a-zA-Z0-9]{1,1000}$/);          //
const isGoodElem = {
    name: Joi.string().min(1).required(),
    time: Joi.string().min(1).required(),
    coordTimes: Joi.array().items(Joi.string(), Joi.number()).min(1).required()
};

exports.arrayIsGood = function (x) {
    const arrayIsGood = Joi.validate(x, isGoodArray);
    return arrayIsGood.error == null;
}

exports.numberIsGood = function (x) {
    const numberIsGood = Joi.validate(x, isGoodNumber);
    return numberIsGood.error == null;
}

exports.stringIsGood = function (x) {
    const stringIsGood = Joi.validate(x, isGoodString);
    return stringIsGood.error == null;
}

exports.elemtIsGood = function (x) {
    const elemIsGood = Joi.validate(x, isGoodElem);
    return elemIsGood.error == null;
}





// Example of use:


// x = [1, 2, 3, 4, 5, 56];
// y = [];
// z = -23423323424.001;

// console.log(x);
// const arrayIsGood = Joi.validate(x, isGoodArray);
// console.log('arrayIsGood: ');
// console.log(arrayIsGood.error == null);

// console.log(y);
// const arrayIsGood2 = Joi.validate(y, isGoodArray);
// console.log('arrayIsGood2: ');
// console.log(arrayIsGood2.error == null);


// console.log(z);
// const numberIsGood = Joi.validate(z, isGoodNumber);
// console.log('numberIsGood: ');
// console.log(numberIsGood.error == null);

