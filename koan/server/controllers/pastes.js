'use strict';

var route = require('koa-route'),
    mongo = require('../config/mongo'),
    ws = require('../config/ws'),
    ObjectID = mongo.ObjectID;

exports.init = function (app) {
    global.mongo = global.mongo || mongo;
    mongo.savedPastes = mongo.savedPastes || mongo.db.collection('savedPastes');

    app.use(route.get('/api/pastes/:id', getPaste));
    app.use(route.post('/api/pastes', createPaste));
};

async function getPaste(ctx, id) {
    var paste = await mongo.savedPastes.findOne({_id: ObjectID(id)});
    ctx.body = paste;
    ctx.status = 200;
}

async function createPaste(ctx) {
    console.log(ctx.request);
    var pasteInput = ctx.request.body.paste;
    var pasteInsert = await mongo.savedPastes.insertOne({paste: pasteInput});
    var paste = await mongo.savedPastes.findOne({paste: pasteInput});
    ctx.body = paste._id;
    ctx.status = 201;
}