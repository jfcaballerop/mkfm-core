var Joi = require('joi');

/*

    input validation service

*/

const isGoodArray = Joi.array().items(Joi.string(), Joi.number()).min(1);  //
const isGoodNumber = Joi.number().min(-100000000000).max(100000000000);    //

const isGoodString = Joi.string().regex(/^[a-zA-Z0-9]{1,1000}$/);          //

// const isGoodElem = {
//     elem : joi.string().required(),
//     elem.properties : joi.string().required(),
//     elem.properties.name : joi.string().required()

    // _id: Joi.string().min(1),
    // type: Joi.string().min(1),
    //         properties: {
    //             coordTimes: Joi.array().min(1),
    //             time: Joi.string().min(1),
    //             name: Joi.string().min(1).required()
    // //         },
    // updated_at: Joi.string().min(1),
    // created_at: Joi.string().min(1),
    // proccessed: Joi.boolean(),
    // geometry:{
    //     type: Joi.string().min(1),
    //     coordinates: Joi.array().min(1).min(1)
//     // }
// };
const isGoodElem = Joi.object().keys({
    _id: Joi,
    $__: Joi,
    isNew: Joi,
    errors: Joi,
    _doc: Joi,
    type: Joi.required(),
    $init: Joi,
    properties: {
        name: Joi.required(),
        time: Joi,
        video_roads: Joi,
        coordTimes: Joi.array().min(1).required(),
    }
});

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
    // return true;
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

