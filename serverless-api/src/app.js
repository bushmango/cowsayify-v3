"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = require("body-parser");
//import * as compression from 'compression';
const cors = require("cors");
const middleware_1 = require("aws-serverless-express/middleware");
const moment = require("moment");
const AWS = require('aws-sdk');
const COWS_TABLE = process.env.COWS_TABLE || 'cow-dev';
function configureApp() {
    const app = express();
    // app.set('view engine', 'pug')
    // app.set('views', join(__dirname, '/views'))
    //app.use(compression());
    app.use(cors());
    app.use(body_parser_1.json());
    app.use(body_parser_1.urlencoded({ extended: true }));
    app.use(middleware_1.eventContext());
    let dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1',
    });
    app.get('/', (req, res) => {
        res.send('Hello Cow World - Serverless API! - TS');
    });
    app.get('/test', (req, res) => {
        res.send('Test!');
    });
    app.get('/ping', (req, res) => {
        res.send('pong');
    });
    // Save cow
    app.post('/cows', function (req, res) {
        const { key, text, options } = req.body;
        if (typeof key !== 'string') {
            res.status(400).json({ error: '"key" must be a string' });
        }
        else if (typeof text !== 'string') {
            res.status(400).json({ error: '"text" must be a string' });
        }
        else if (typeof options !== 'string') {
            res.status(400).json({ error: '"options" must be a string' });
        }
        let created = moment().format();
        let item = {
            key,
            text,
            options,
            created,
        };
        const params = {
            TableName: COWS_TABLE,
            Item: item,
        };
        dynamoDb.put(params, error => {
            if (error) {
                console.log(error);
                res.status(400).json({ error: 'Could not create cow' });
            }
            res.json(item);
        });
    });
    // Get cow
    app.get('/cows/:key', async (req, res) => {
        const params = {
            TableName: COWS_TABLE,
            Key: {
                key: req.params.key,
            },
        };
        // Async await
        try {
            let result = await dynamoDb.get(params).promise();
            if (result.Item) {
                const { key, text, options, created } = result.Item;
                res.json({
                    key,
                    text,
                    options,
                    created,
                });
            }
            else {
                res.status(404).json({ error: 'Cow not found' });
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ error: 'Could not get cow' });
        }
        // Was
        // dynamoDb.get(params, (error, result) => {
        //   if (error) {
        //     console.log(error)
        //     res.status(400).json({ error: 'Could not get cow' })
        //   }
        //   if (result.Item) {
        //     const { key, text, options, created } = result.Item
        //     res.json({
        //       key,
        //       text,
        //       options,
        //       created,
        //     })
        //   } else {
        //     res.status(404).json({ error: 'Cow not found' })
        //   }
        // })
    });
    // List cows
    app.get('/cows-list', async (req, res) => {
        const params = {
            TableName: COWS_TABLE,
            ProjectionExpression: '#k, #t, options, created',
            ExpressionAttributeNames: { '#k': 'key', '#t': 'text' },
        };
        try {
            let data = await dynamoDb.scan(params).promise();
            res.json({ data });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ errorMessage: 'Could not list cows', error });
        }
    });
    return app;
}
exports.configureApp = configureApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWtDO0FBQ2xDLDZDQUE4QztBQUM5Qyw2Q0FBNkM7QUFDN0MsNkJBQTRCO0FBQzVCLGtFQUFnRTtBQUVoRSxpQ0FBZ0M7QUFDaEMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBRTlCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQTtBQUV0RCxTQUFnQixZQUFZO0lBQzFCLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFBO0lBQ3JCLGdDQUFnQztJQUNoQyw4Q0FBOEM7SUFDOUMseUJBQXlCO0lBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQUksRUFBRSxDQUFDLENBQUE7SUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQVksRUFBRSxDQUFDLENBQUE7SUFFdkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztRQUM3QyxNQUFNLEVBQUUsV0FBVztLQUNwQixDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUE7SUFDcEQsQ0FBQyxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8s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