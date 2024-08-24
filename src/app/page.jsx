import axios from "axios";
import Link from "next/link";

const fetchDatos = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/productos`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Principal = async () => {
  const prod = await fetchDatos();

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6">
          <h1>PAgina principal</h1>
        </div>
      </div>
      <div className="row mt-4">
        {prod?.map((p, index) => (
          <div className="col-3 my-2" key={index}>
            <div className="card">
              <Link href={`/producto/${p.id}`}>
                <img
                  src={`http://localhost:3000/img/${p.img}`}
                  className="card-img-top"
                  alt="..."
                />
              </Link>
              <div className="card-body">{p.nombre}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Principal;
