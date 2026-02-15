import rateLimit from "express-rate-limit";

const windowMs = Number(process.env.WINDOW_MS) || 15 * 60 * 1000;
const maxLogin = Number(process.env.MAX_LOGIN_REQUESTS) || 5;
const maxGeneral = Number(process.env.MAX_GENERAL_REQUESTS) || 100;
const maxCreation = Number(process.env.MAX_CREATION_REQUESTS) || 10;
const creationWindowMs = 15 * 60 * 1000;

export const authLimiter = rateLimit({
  windowMs,
  max: maxLogin,
  message: "Too many login attempts, please try again",
});

export const creationLimiter = rateLimit({
  windowMs: creationWindowMs,
  max: maxCreation,
  message: "Too many creation requests, please try again",
});

export const generalLimiter = rateLimit({
  windowMs,
  max: maxGeneral,
});
