import {Request, Response} from "express";
import sql from '../db';
import { AuthRequest } from "../middleware/authMiddleware";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const supplier = typeof req.query.supplier === 'string' ? req.query.supplier.trim() : '';
    const result = supplier
      ? await sql`SELECT * FROM products WHERE LOWER(supplier) = LOWER(${supplier}) ORDER BY product_name`
      : await sql`SELECT * FROM products ORDER BY product_name`;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
    try {
    const result = await sql`SELECT * FROM suppliers WHERE supplier_id = ${id}`;
    if (result.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(result[0]);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
    try {
    const { name, contact_person, email, phone } = req.body;
    const result = await sql`
      INSERT INTO suppliers (name, contact_person, email, phone)
      VALUES (${name}, ${contact_person}, ${email}, ${phone})
        RETURNING *;
    `;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, contact_person, email, phone } = req.body;  
  const parsedId = Number(id);
  try {
    const result = await sql`
      UPDATE suppliers
      SET name = ${name}, contact_person = ${contact_person}, email = ${email}, phone = ${phone}
        WHERE supplier_id = ${parsedId}
        RETURNING *;
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const parsedId = Number(id);
    try {
    const result = await sql`
      DELETE FROM suppliers
      WHERE supplier_id = ${parsedId}
        RETURNING *;
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
