"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_1 = __importDefault(require("./categories"));
const programs_1 = __importDefault(require("./programs"));
const users_1 = __importDefault(require("./users"));
const services_1 = __importDefault(require("./services"));
const payments_1 = __importDefault(require("./payments"));
const auth_1 = __importDefault(require("./auth"));
// import path from "path";
// const PATH_ROUTER = path.resolve('./src/routes') 
const router = express_1.default.Router();
// const loadedRoutes: string[] = [];
// const cleanFileName = (fileName: string) => {
//     const file = fileName.split('.').shift()
//     return file ? file : '';
// }
// readdirSync(PATH_ROUTER).filter((fileName) => {
//     const cleanName = cleanFileName(fileName)
//     if(cleanName !== 'index'){
//         import(`./${cleanName}`).then((moduleRouter) => {
//             console.log(`Loading router: /${cleanName}`)
//             router.use(`/${cleanName}`, moduleRouter.router)
//             loadedRoutes.push(cleanName);
//         })
//     }
// })
router.get('/', (_req, res) => {
    res.json({
        "message": "Descubriendo Juntxs 🦄🌈✨👋🌎🌍🌏✨🌈🦄"
    });
});
router.use('/categories', categories_1.default);
router.use('/programs', programs_1.default);
router.use('/services', services_1.default);
router.use('/users', users_1.default);
router.use('/payments', payments_1.default);
router.use('/auth', auth_1.default);
exports.default = router;
