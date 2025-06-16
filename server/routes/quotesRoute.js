"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quotesController_1 = require("../controllers/quotesController");
const router = (0, express_1.Router)();
router.get('/', quotesController_1.getAQuote);
exports.default = router;
