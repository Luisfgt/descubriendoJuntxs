import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { PrismaClient, State } from "@prisma/client";
import { ZodError } from "zod";
import { programSchema } from "../schemas/program.schema";
import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: 'dtxdureym',
    api_key: '656236662953285',
    api_secret: 'fUuhkv5Yuiz_c5i0NNZ42rrsDIo'
});



const prisma = new PrismaClient();



const getPrograms = async (req: Request, res: Response) => {
    const { name } = req.query;

    try {
        const programs = await prisma.program.findMany({
            where: {
                state: "Activo",
            },
            include: {
                commentary: true,
            },
        });

        const names = name
            ? programs.filter((program) => {
                return program.name
                    .toLowerCase()
                    .includes(name.toString().toLowerCase());
            })
            : programs;

        res.status(200).json(names);
    } catch (error) {
        console.log(error);
        handleHttp(res, "ERROR_GET_Programs");
    }
};

const getProgramsByCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    try {
        const programs = await prisma.program.findMany({
            where: {
                state: "Activo",
                categoryId: Number(categoryId),
            },
        });
        res.status(200).json(programs);
    } catch (error) {
        console.log(error);
        handleHttp(res, "ERROR_GET_Programs");
    }
};


const getProgramById = async (req: Request, res: Response) => {


    const { id } = req.params;

    try {
        const program = await prisma.program.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                donation: true,
            }
        });

        res.status(200).json(program);
    } catch (error) {
        handleHttp(res, 'ERROR_GET_CATEGORYS')
    }
}


const postProgram = async (req: Request, res: Response) => {
    const form = new IncomingForm();
    try {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: "Error al procesar el formulario" });
            }
            console.log(files)
            const imageFile = files[''] ? files[''][0].filepath : undefined;
            if (!imageFile) {
                return res.status(400).json({ error: "No image file provided" });
            }
            let resultUpload;
            try {
                resultUpload = await cloudinary.uploader.upload(imageFile);
            } catch (error) {
                console.error("Error uploading file to Cloudinary:", error);
                return res.status(500).json({ error: "Error uploading file to Cloudinary" });
            }

            const newProgram = await prisma.program.create({
                data: {
                    name: fields.name ? fields.name[0] : '',
                    description: fields.description ? fields.description[0] : '',
                    urlYoutube: fields.urlYoutube ? fields.urlYoutube[0] : '',
                    objective: fields.objective ? fields.objective[0] : '',
                    syllabus: fields.syllabus ? fields.syllabus[0] : '',
                    state: fields.state ? fields.state[0] as State : undefined,
                    image: resultUpload.secure_url,
                    categoryId: Number(fields.categoryId ? fields.categoryId[0] : undefined),
                },
            });

            return res.status(200).json(newProgram);
        });
    } catch (error) {
        console.log(error);
    }

};

const updateProgram = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { state } = req.body; //* restricciones en la DB Enum
        const result = programSchema.parse(req.body);
        //Datos validados por Zod
        const { name, description, image, urlYoutube, objective, syllabus, categoryId } = result;
        const updatedProgram = await prisma.program.update({
            where: { id: Number(id) },
            data: {
                name: name && name as string,
                description: description && description as string,
                image: image && image as string,
                urlYoutube: urlYoutube && urlYoutube as string,
                objective: objective && objective as string,
                syllabus: syllabus && syllabus as string,
                state: state && state as State,
                categoryId: categoryId && categoryId
            },
        });

        return res.status(200).json(updatedProgram);
    } catch (error) {
        if (error instanceof ZodError) {
            return res
                .status(400)
                .json(error.issues.map((issue) => ({ message: `${issue.path}: ${issue.message}` })));
        }

        return res.status(400).json({ error: "Bad request" });
    }
};

const paginationProgram = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1; //*Número de página
        const pageSize = Number(req.query.pageSize) || 10; //* Tamaño de la página

        console.log("page: " + page);
        console.log("pageSize: " + pageSize);

        //* calcular el indice de inicio y limitar la consulta a la página
        const startIndex = (page - 1) * pageSize;

        const programs = await prisma.program.findMany({
            skip: startIndex,
            take: pageSize,
            include: {
                commentary: true,
            }
        });


        res.status(200).json(programs);
    } catch (error) {
        console.log("Error al obtener programas ", error);
        res.status(500).json({ error: "error interno del servidor" });
    }
};

const paginationProgramWithName = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1; //*Número de página
    const pageSize = Number(req.query.pageSize) || 10; //* Tamaño de la página
    const name = req.query.name ? String(req.query.name) : null; //* Nombre del programa

    console.log("page: " + page);
    console.log("pageSize: " + pageSize);
    console.log("name: " + name);

    //* Calcular el índice de inicio y limitar la consulta a la página
    const startIndex = (page - 1) * pageSize;

    let programs;
    let totalPrograms;

    if (name) {
      //* Si se proporciona un nombre, buscar programas por nombre y contar el total
      programs = await prisma.program.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive', //* Case-insensitive search
          },
        },
        skip: startIndex,
        take: pageSize,
        include: {
          commentary: true,
        }
      });

      totalPrograms = await prisma.program.count({
        where: {
          name: {
            contains: name,
            mode: 'insensitive', //* Case-insensitive search
          },
        },
      });
    } else {
      //* Si no se proporciona un nombre, simplemente paginar los programas
      programs = await prisma.program.findMany({
        skip: startIndex,
        take: pageSize,
        include: {
          commentary: true,
        }
      });

      totalPrograms = await prisma.program.count();
    }

    res.status(200).json({ programs, totalPrograms });
  } catch (error) {
    console.log("Error al obtener programas ", error);
    res.status(500).json({ error: "error interno del servidor" });
  }
};


export {

  getPrograms,
  getProgramById,
  postProgram,
  updateProgram,
  getProgramsByCategory,
  paginationProgram,
  paginationProgramWithName

};
