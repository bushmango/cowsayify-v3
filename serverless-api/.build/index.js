var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import 'source-map-support/register';
var serverless = require('serverless-http');
var bodyParser = require('body-parser');
// const express = require('express')
import * as express from 'express';
import * as moment from 'moment';
var app = express();
var cors = require('cors');
var AWS = require('aws-sdk');
//const USERS_TABLE = process.env.USERS_TABLE
var COWS_TABLE = process.env.COWS_TABLE || 'cow-dev';
// const IS_OFFLINE = process.env.IS_OFFLINE
// let dynamoDb
// if (IS_OFFLINE === 'true') {
//   dynamoDb = new AWS.DynamoDB.DocumentClient({
//     region: 'localhost',
//     endpoint: 'http://localhost:8000',
//   })
//   console.log(dynamoDb)
// } else {
//   dynamoDb = new AWS.DynamoDB.DocumentClient()
// }
var dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
});
app.use(cors());
app.use(bodyParser.json({ strict: false }));
app.get('/', function (req, res) {
    res.send('Hello Cow World - Serverless API!');
});
// Save cow
app.post('/cows', function (req, res) {
    var _a = req.body, key = _a.key, text = _a.text, options = _a.options;
    if (typeof key !== 'string') {
        res.status(400).json({ error: '"key" must be a string' });
    }
    else if (typeof text !== 'string') {
        res.status(400).json({ error: '"text" must be a string' });
    }
    else if (typeof options !== 'string') {
        res.status(400).json({ error: '"options" must be a string' });
    }
    var created = moment().format();
    var item = {
        key: key,
        text: text,
        options: options,
        created: created,
    };
    var params = {
        TableName: COWS_TABLE,
        Item: item,
    };
    dynamoDb.put(params, function (error) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not create cow' });
        }
        res.json(item);
    });
});
// Get cow
app.get('/cows/:key', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var params, result, _a, key, text, options, created, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                params = {
                    TableName: COWS_TABLE,
                    Key: {
                        key: req.params.key,
                    },
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dynamoDb.get(params).promise()];
            case 2:
                result = _b.sent();
                if (result.Item) {
                    _a = result.Item, key = _a.key, text = _a.text, options = _a.options, created = _a.created;
                    res.json({
                        key: key,
                        text: text,
                        options: options,
                        created: created,
                    });
                }
                else {
                    res.status(404).json({ error: 'Cow not found' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(400).json({ error: 'Could not get cow' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// List cows
app.get('/cows-list', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var params, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: COWS_TABLE,
                    ProjectionExpression: '#k, #t, options, created',
                    ExpressionAttributeNames: { '#k': 'key', '#t': 'text' },
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dynamoDb.scan(params).promise()];
            case 2:
                data = _a.sent();
                res.json({ data: data });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(400).json({ errorMessage: 'Could not list cows', error: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var handler = serverless(app);
export default handler;
export { app, handler };
module.exports.handler = serverless(app);
//# sourceMappingURL=index.js.map