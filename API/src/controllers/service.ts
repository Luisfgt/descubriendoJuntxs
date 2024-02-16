import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { ServiceType, PrismaClient, ServiceState } from "@prisma/client";
import { ZodError } from "zod"
import { serviceSchema } from "../schemas/service.schema"

const prisma = new PrismaClient();

const getServices = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    const services = await prisma.service.findMany({
      where: {
        state: "Activo",
      },
    });


    const names = name
      ? services.filter((service) => {
        return service.name.toLowerCase().includes(name.toString().toLowerCase());
      })
      : services

    res.status(200).json(names);

  } catch (error) {
    handleHttp(res, "ERROR_GET_SERVICES");
  }
};

const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const service = await prisma.service.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(service);
  } catch (error) {
    handleHttp(res, "ERROR_GET_SERVICE_BY_ID");
  }
};

const getServicesByType = async (req: Request, res: Response) => {
  const { type } = req.params;

  try {
    const service = await prisma.service.findMany({
      where: {
        type: (type as string).toLowerCase() as ServiceType,
        state: "Activo",
      },
    });
    res.status(200).json(service);
  } catch (error) {
    handleHttp(res, "ERROR_GET_SERVICES_BY_TYPE");
  }
};

const getServicesByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const service = await prisma.service.findMany({
      where: {
        userId: userId as unknown as number,
        state: "Activo",
      },
    });
    res.status(200).json(service);
  } catch (error) {
    handleHttp(res, "ERROR_GET_SERVICES_BY_TYPE");
  }
};

const postService = async (req: Request, res: Response) => {

  try {
    const { type } = req.body;
    const result = serviceSchema.parse(req.body);
    //* Datos validados por Zod

    const {
      name,
      description,
      userId,
      categoryId,
      dateIn,
      dateOut,
      hourIn,
      hourOut,
      amount,
      objective,
      syllabus,

    } = result;
    const newService = await prisma.service.create({
      data: {
        name: name && (name as string),
        description: description && (description as string),
        dateIn: dateIn && (dateIn as Date),
        dateOut: dateOut && (dateOut as Date),
        hourIn: hourIn && (hourIn as string),
        hourOut: hourOut && (hourOut as string),
        amount: amount && (amount as number),
        objective: objective && (objective as string),
        syllabus: syllabus && (syllabus as string),
        userId: userId && (userId as number),
        categoryId: categoryId && (categoryId as number),
        type: type && (type as ServiceType),
        state: "Activo"
      },
    });

    return res.status(200).json(newService);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: `${issue.path}: ${issue.message}` })));
    }

    return res.status(400).json({ error: "Bad request" });
  }
};

const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const { type, state } = req.body;
    const result = serviceSchema.parse(req.body);
    //* Datos validados por Zod

    const {
      name,
      description,
      userId,
      categoryId,
      dateIn,
      dateOut,
      hourIn,
      hourOut,
      amount,
      objective,
      syllabus,

    } = result;

    const updatedService = await prisma.service.update({
      where: { id: Number(id) },

      data: {
        name: name && (name as string),
        description: description && (description as string),
        dateIn: dateIn && (dateIn as Date),
        dateOut: dateOut && (dateOut as Date),
        hourIn: hourIn && (hourIn as string),
        hourOut: hourOut && (hourOut as string),
        amount: amount && (amount as number),
        objective: objective && (objective as string),
        syllabus: syllabus && (syllabus as string),
        userId: userId && (userId as number),
        categoryId: categoryId && (categoryId as number),
        type: type && (type as ServiceType),
        state: state && (state as ServiceState),
      },
    });

    return res.status(200).json(updatedService);
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json(error.issues.map((issue) => ({ message: `${issue.path}: ${issue.message}` })));
    }

    return res.status(400).json({ error: "Bad request" });
  }
};

const paginationService = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1; //*Número de página
    const pageSize = Number(req.query.pageSize) || 10; //* Tamaño de la página

    //* calcular el indice de inicio y limitar la consulta a la página
    const startIndex = (page - 1) * pageSize;

    const services = await prisma.service.findMany({
      skip: startIndex,
      take: pageSize,
    });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "error interno del servidor" });
  }
};



export {
  getServices,
  getServiceById,
  getServicesByType,
  getServicesByUser,
  postService,
  updateService,
  paginationService,
};
