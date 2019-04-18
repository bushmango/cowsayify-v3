"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support").install();
const aws_serverless_express_1 = require("aws-serverless-express");
const app_1 = require("./app");
// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)
const binaryMimeTypes = [
// "application/javascript",
// "application/json",
// 'application/octet-stream',
// 'application/xml',
// "font/eot",
// "font/opentype",
// "font/otf",
// "image/jpeg",
// "image/png",
// "image/svg+xml",
// 'text/comma-separated-values',
// "text/css",
// "text/html",
// "text/javascript",
// "text/plain",
// "text/text"
// 'text/xml',
];
const app = app_1.configureApp();
const server = aws_serverless_express_1.createServer(app, undefined, undefined /*binaryMimeTypes*/);
exports.http = (event, context) => aws_serverless_express_1.proxy(server, event, context);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDeEMsbUVBQTZEO0FBRTdELCtCQUFxQztBQUVyQywrRUFBK0U7QUFDL0UsZ0ZBQWdGO0FBQ2hGLGdGQUFnRjtBQUNoRixrRUFBa0U7QUFDbEUsTUFBTSxlQUFlLEdBQWE7QUFDaEMsNEJBQTRCO0FBQzVCLHNCQUFzQjtBQUN0Qiw4QkFBOEI7QUFDOUIscUJBQXFCO0FBQ3JCLGNBQWM7QUFDZCxtQkFBbUI7QUFDbkIsY0FBYztBQUNkLGdCQUFnQjtBQUNoQixlQUFlO0FBQ2YsbUJBQW1CO0FBQ25CLGlDQUFpQztBQUNqQyxjQUFjO0FBQ2QsZUFBZTtBQUNmLHFCQUFxQjtBQUNyQixnQkFBZ0I7QUFDaEIsY0FBYztBQUNkLGNBQWM7Q0FDZixDQUFDO0FBQ0YsTUFBTSxHQUFHLEdBQUcsa0JBQVksRUFBRSxDQUFDO0FBQzNCLE1BQU0sTUFBTSxHQUFHLHFDQUFZLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUEsbUJBQW1CLENBQUUsQ0FBQztBQUU5RCxRQUFBLElBQUksR0FBRyxDQUFDLEtBQVUsRUFBRSxPQUFnQixFQUFFLEVBQUUsQ0FDbkQsOEJBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDIn0=