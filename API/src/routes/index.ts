import express from "express";
// import { readdirSync } from "fs";
import MessageResponse from "../interfaces/MessageResponse";
import categories from "./categories";
import programsRouter from "./programs";
import users from "./users";
import services from "./services";
import participants from "./participants";
import payments from "./payments";
import favorites from "./favorites";
import commentaries from "./commentaries";
import createUser from "./auth";
import nodemailer from "./mail";
import upload from "./upload";


import donations from "./donationsRoute";



// import path from "path";

// const PATH_ROUTER = path.resolve('./src/routes') 
const router = express.Router()

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

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    "message": "Descubriendo Juntxs 🦄🌈✨👋🌎🌍🌏✨🌈🦄"
  });
});

router.use('/categories', categories);
router.use('/programs', programsRouter);
router.use('/services', services);
router.use('/users', users);
router.use('/participants', participants);
router.use('/payments', payments);
router.use('/favorites', favorites);
router.use('/commentaries', commentaries);
router.use('/donations', donations);
router.use('/upload', upload)
router.use('/nodemailer', nodemailer);






router.use('/auth', createUser)



export default router;