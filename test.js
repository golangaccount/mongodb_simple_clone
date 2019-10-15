var clone = require("./mongo");

const sourceurl = "mongodb://power:power@192.168.31.200:27017";
const desturl = "mongodb://power:power@192.168.31.200:27017";
const sourcedb = "audit-embed";
const destdb = "audit-embed-clone";

clone(sourceurl, desturl, sourcedb, destdb).then(function () {
    console.log("success");
}, function (err) {
    console.log("fail");
});