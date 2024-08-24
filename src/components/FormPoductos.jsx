"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const FormPoductos = () => {
  const { reset, handleSubmit, register } = useForm();

  const [file, setFile] = useState(null);

  const onSubmit = handleSubmit(async (values) => {

    // Si no existe el archivo retorna
    if (!!!file) return;

    // Crea un formualario para agregar la imagen
    const formDate = new FormData();

    // Agregan los atributos
    formDate.append("nombre", values.nombre);
    formDate.append("descripcion", values.descripcion);
    formDate.append("precio", values.precio);
    formDate.append("imagen", file);

    // Realiza la peticion enviando el formulario con la imagen
    const res = await axios.post("/api/productos", formDate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.status);

    setFile(null);
    reset();
  });

  return (
    <div className="d-flex justify-content-between">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <input
              type="text"
              className="form-control form-control-lg "
              autoComplete="off"
              placeholder="Producto"
              {...register("nombre", { required: true })}
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              className="form-control form-control-lg "
              autoComplete="off"
              placeholder="Descripcion"
              {...register("descripcion", { required: true })}
            />
          </div>

          <div className="mt-3">
            <input
              type="text"
              className="form-control form-control-lg "
              autoComplete="off"
              placeholder="$ 0.00"
              {...register("precio", { required: true, pattern: /^\d*\.\d+$/ })}
            />
          </div>

          <div className="mt-3">
            <input
              type="file"
              className="form-control form-control-lg "
              {...register("imagen", { required: true })}
              onChange={(e) => {
                /* Guarda la informacion del archivo */
                setFile(e.target.files[0]);
              }}
            />
          </div>

          <div className="mt-3">
            <button className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
      <div className="">
        {file && (
          <img
            className="img-thumbnail"
            src={URL.createObjectURL(file)}
            alt=""
            width="200"
          />
        )}
      </div>
    </div>
  );
};

export default FormPoductos;
