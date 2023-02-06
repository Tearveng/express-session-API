import { Request, Response } from "express";
import { app_datasource } from "../datasource/database";
import { Product } from "../entities";
import { Like } from "typeorm";
const manager = app_datasource.manager;

export const fecthProducts = async (req: Request, res: Response) => {
  const products = await manager.find(Product, { take: 10, skip: 2 });

  if (!products) {
    throw new Error("empty posts");
  }

  return res.status(200).json(products);
};

export const fetchProductsPagainate = async (req: Request, res: Response) => {
  const { page } = req.query;
  let limit = 10;
  let offset = 0;
  let current_page = 1;
  let next_page = 0;
  let prev_page = 0;
  if (page && typeof page === "string") {
    if (parseInt(page) > 1) {
      current_page = parseInt(page);
      offset = current_page * limit - limit;
    }
  }

  const products = await manager.findAndCount(Product, {
    take: limit,
    skip: offset,
  });
  if (!products[0]) throw new Error("somthing went wrong");

  if (products[0].length < 1)
    return res.status(200).json({
      data: "empty products",
    });

  if (offset > 1) {
    next_page = products[1] - (offset + limit);
    prev_page = current_page - 1;
  } else {
    next_page = products[1] - limit;
  }

  return res.status(200).send({
    current_page: current_page,
    prev: prev_page > 0 ? prev_page : null,
    next: next_page > 0 ? (next_page = current_page + 1) : null,
    data: products[0],
  });
};

export const searchProduct = async (req: Request, res: Response) => {
  const { page, q } = req.query;
  let limit = 10;
  let offset = 0;
  let current_page = 1;
  let next_page = 0;
  let prev_page = 0;
  if (page && typeof page === "string") {
    if (parseInt(page) > 1) {
      current_page = parseInt(page);
      offset = current_page * limit - limit;
    }
  }

  const products = await manager.findAndCount(Product, {
    where: {
      product_name: Like(`%${q}%`),
    },
    take: limit,
    skip: offset,
    cache: 6000,
  });
  if (!products[0]) throw new Error("somthing went wrong");

  if (products[0].length < 1)
    return res.status(200).json({
      data: "empty products",
    });

  if (offset > 1) {
    next_page = products[1] - (offset + limit);
    prev_page = current_page - 1;
  } else {
    next_page = products[1] - limit;
  }

  return res.status(200).send({
    current_page: current_page,
    prev: prev_page > 0 ? prev_page : null,
    next: next_page > 0 ? (next_page = current_page + 1) : null,
    data: products[0],
  });
};
