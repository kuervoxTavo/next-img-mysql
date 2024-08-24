import axios from "axios";

const fetchDato = async (idPrd) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/productos/${idPrd}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const ProductoPage = async ({ params }) => {
  const { idPrd } = params;

  const info = await fetchDato(idPrd);

  console.log(info);

  /* 
  
  
  id: 100,
  nombre: 'Hironobu',
  descripcion: 'Haraldson',
  precio: 10100,
  fecha: '1953-04-21T06:00:00.000Z',
  img: 'ine_vero_rev.jpg'


  */
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6">
          <div className="card">
            <img src={`http://localhost:3000/img/${info.img}`} alt="" />
          </div>
        </div>
        <div className="col-6 text-end">
            <h2>{info.nombre}</h2>
            <h3>{info.descripcion}</h3>
            <h3>$ {info.precio}</h3>

        </div>
      </div>
    </div>
  );
};

export default ProductoPage;
