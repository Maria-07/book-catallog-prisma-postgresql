"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Create a user through sign up
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data: user, // Pass the user object directly
    });
    return result;
});
// log in user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // Check if the user exists in the database
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    console.log('password 🔑', password);
    console.log('user 🔑', user.password);
    // Verify the password
    const isPasswordMatch = password === (user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // Create accessToken and refreshToken
    const { email: userEmail, role } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        userEmail,
        role,
        userId: user.id,
    }, config_1.default.jwt.secret, '1y');
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        userEmail,
        role,
        userId: user.id,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expire_in);
    return { accessToken, refreshToken };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userEmail } = verifiedToken;
    // Check if the user exists in the database
    const user = yield prisma_1.default.user.findUnique({
        where: { email: userEmail },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Generate a new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ email: user.email, role: user.role }, config_1.default.jwt.secret, config_1.default.jwt.expire_in);
    return { accessToken: newAccessToken };
});
exports.AuthService = {
    loginUser,
    refreshToken,
    createUser,
};
