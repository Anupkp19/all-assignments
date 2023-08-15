"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const router = express_1.default.Router();
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await db_1.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new db_1.User({ username, password });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, middleware_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, middleware_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});
router.get('/me', middleware_1.authenticateJwt, async (req, res) => {
    const user = await db_1.User.findOne({ _id: req.headers["userId"] });
    if (user) {
        res.json({ username: user.username });
    }
    else {
        res.status(403).json({ message: 'User not logged in' });
    }
});
exports.default = router;
