import { NextResponse } from "next/server";
import { pool } from "@/libs/mysql";

export const GET = async (request, { params }) => {
  const { idProducto } = params;

  try {
    const [resul] = await pool.query(`select * from productos where id = ?`, [
      idProducto,
    ]);

    /* No existen registros */
    if (resul.length === 0)
      return NextResponse.json({ msj: "No existe producto" }, { status: 404 });

    return NextResponse.json(resul[0]);
  } catch (error) {
    return NextResponse.json({ msj: error.message }, { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { idProducto } = params;

  const { nombre, descripcion, precio } = await request.json();

  try {
    const [res] = await pool.query(
      `update productos set nombre = ?, descripcion = ?, precio = ?, fecha = now() where id = ?`,
      [nombre, descripcion, precio, idProducto]
    );

    /* No existen registros */
    if (res.affectedRows == 0)
      return NextResponse.json({ msj: "Error actualizacion" }, { status: 404 });

    return NextResponse.json(res.affectedRows);
  } catch (error) {
    return NextResponse.json({ msj: error.message }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { idProducto } = params;

  try {
    const [res] = await pool.query(`DELETE FROM productos t WHERE t.id = ?`, [
      idProducto,
    ]);

    /* No existen registros */
    if (res.affectedRows === 0)
      return NextResponse.json({ msj: "Error delete" }, { status: 404 });

    return NextResponse.json(res.affectedRows);
  } catch (error) {
    return NextResponse.json({ msj: error.message }, { status: 500 });
  }
};
