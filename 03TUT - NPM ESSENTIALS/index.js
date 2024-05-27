const { format } = require("date-fns");

console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

const { v4: uuid } = require("uuid");

console.log(uuid());