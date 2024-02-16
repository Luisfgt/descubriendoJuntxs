"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_1 = require("../controllers/payments");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.send("Descubriendo Juntxs 🦄🌈✨👋🌎🌍🌏✨🌈🦄");
});
router.post('/', payments_1.postCreatePayment);
router.get('/success', (_req, res) => {
    res.send("Success");
});
router.get('/failure', (_req, res) => {
    res.send("Failure");
});
router.get('/pending', (_req, res) => {
    res.send("pending");
});
router.post('/webhook', payments_1.reciveWebhook);
exports.default = router;
