"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccesstoken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ""; // use .env
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const generateAccessToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
const createAccesstoken = (req, res, role) => {
    const refreshWithRole = `${role}_refreshToken`;
    const refreshToken = req.cookies[refreshWithRole];
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token not found' });
    }
    jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        }
        const user = decoded;
        const { id, role } = user;
        const newAccessToken = (0, exports.generateAccessToken)(id, role);
        res.json({ accessToken: newAccessToken });
    });
};
exports.createAccesstoken = createAccesstoken;
