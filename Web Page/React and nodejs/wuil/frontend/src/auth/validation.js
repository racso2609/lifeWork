exports.isValidEmail =(val) => /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,10})$/.test(val);
exports.isValidphone = (val)=> /^[0-9]+$/.test(val);
exports.isValidname = (val)=> /^[a-zA-Z]+$/.test(val);
exports.required = (val)=> val && val.length;
exports.isValidNamelarge = (val)=> /^[a-zA-Z]{3,15}$/.test(val);

