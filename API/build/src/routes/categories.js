"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = require("../controllers/category");
const router = (0, express_1.Router)();
router.get('/', category_1.getCategories);
router.get('/:id', category_1.getCategory);
router.post('/', category_1.postCategory);
router.put('/:id', category_1.updateCategory);
// router.delete('/:id', deleteCategory)
exports.default = router;
