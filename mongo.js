const mongo = require("mongodb");
const mongoclient = require("mongodb").MongoClient;
const promise = require("promise");

function getdata(sourceurl, mongodb, name) {
    return mongoclient.connect(sourceurl).then(function (client) {
        return client.db(mongodb).collection(name).find({}).toArray();
    })
}

function setdata(desturl, mongodb, name, data) {
    return mongoclient.connect(desturl).then(function (client) {
        if (!data || data.length == 0) {
            return client.db(mongodb).createCollection(name);
        } else {
            return client.db(mongodb).collection(name).insertMany(data)
        }
    })
}

function clonedata(sourceurl, desturl, sourcedb, destdb, name) {
    return getdata(sourceurl, sourcedb, name).then(function (rows) {
        return setdata(desturl, destdb, name, rows);
    })
}

function clone(sourceurl, desturl, sourcedb, destdb) {
    return mongoclient.connect(sourceurl).then(function (client) {
        client.db(sourcedb).listCollections().toArray().then(function (arr) {
            var pros = [];
            arr.forEach(function (value, index, colls) {
                pros[index] = clonedata(sourceurl, desturl, sourcedb, destdb, value.name);
            })
            return promise.all(pros);
        })
    })
}

module.exports = clone;