"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebase_1 = require("../controllers/firebase");
const router = (0, express_1.Router)();
router.post('/', firebase_1.createUser);
// router.delete('/:id', deleteCategory)
exports.default = router;
