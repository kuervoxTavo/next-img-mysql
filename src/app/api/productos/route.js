import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

import path from "path";
import { writeFile } from "fs/promises";

export const GET = async () => {
  try {
    const [resul] = await pool.query(`SELECT * from productos ORDER BY id desc limit 10;`);

    /* No existen registros */
    if (resul.length === 0)
      return NextResponse.json(
        { msj: "No existen productos" },
        { status: 404 }
      );

    return NextResponse.json(resul);
  } catch (error) {
    return NextResponse.json({ msj: error.message }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    // Recibe el formdate
    const data = await request.formData();

    const nombre = data.get("nombre");
    const descripcion = data.get("descripcion");
    const precio = data.get("precio");

    // Imagen para subir al servidor
    const img = data.get("imagen");

    // converti arreglo de bytes
    const bytes = await img.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Path para guardar
    const filePath = path.join(process.cwd(), "public/img", img.name);

    // Crea el archivo de conexion
    writeFile(filePath, buffer);

    const [res] = await pool.query(
      `INSERT INTO productos values(0,?,?,?,NOW(),?);`,
      [nombre, descripcion, precio, img.name]
    );

    // No existen registros
    if (res.affectedRows === 0)
      return NextResponse.json(
        { msj: "Error al agregar registro" },
        { status: 404 }
      );

    return NextResponse.json(res.insertId);
  } catch (error) {
    return NextResponse.json({ msj: error.message }, { status: 500 });
  }
};
