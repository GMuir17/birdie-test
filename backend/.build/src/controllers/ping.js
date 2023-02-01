"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingController = void 0;
const express = require("express");
exports.pingController = express.Router();
exports.pingController.get('/hello', (_, res) => {
    res.status(200).json({
        greetings: 'Thank you for spending some time on this test. All the best 🙌'
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVycy9waW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUV0QixRQUFBLGNBQWMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFL0Msc0JBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ3RDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ25CLFNBQVMsRUFBRSxnRUFBZ0U7S0FDNUUsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5cbmV4cG9ydCBjb25zdCBwaW5nQ29udHJvbGxlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbnBpbmdDb250cm9sbGVyLmdldCgnL2hlbGxvJywgKF8sIHJlcykgPT4ge1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgZ3JlZXRpbmdzOiAnVGhhbmsgeW91IGZvciBzcGVuZGluZyBzb21lIHRpbWUgb24gdGhpcyB0ZXN0LiBBbGwgdGhlIGJlc3Qg8J+ZjCdcbiAgfSk7XG59KTtcbiJdfQ==