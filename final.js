
document.getElementById("ins").addEventListener("click", insertar);
document.getElementById("gua").addEventListener("click", guardar);


document.getElementById("ins").hidden = false;
document.getElementById("gua").hidden = true;


mostrar();


async function insertar() {
  await axios.post("https://62c9ab104795d2d81f800fb7.mockapi.io/Peliculas", {
    Titulo: document.getElementById("tit").value,
    Descripcion: document.getElementById("desc").value,
    Estreno: document.getElementById("est").value,
    Portada: document.getElementById("port").value,
    Puntaje: document.getElementById("punt").value,
  });
  
  alert ('Se agrego la pelicula correctamente')

  document.getElementById("tit").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("est").value = "";
  document.getElementById("port").value = "";
  document.getElementById("punt").value = "";
  mostrar();
}

async function mostrar() {
  const datos = await axios.get(
    "https://62c9ab104795d2d81f800fb7.mockapi.io/Peliculas"
  );
  let listado =
    '<table class="table table-striped"><thead><tr><th scope="col">Titulo</th><th scope="col">Descripcion</th><th scope="col">Estreno</th><th scope="col">Puntaje</th><th scope="col">Portada</th></tr></thead><tbody>';
  for (let i = 0; i < datos.data.length; i++) {
    listado +=
      "<tr><td>" +
      datos.data[i].Titulo +
      "</td><td>" +
      datos.data[i].Descripcion +
      "</td><td>" +
      datos.data[i].Estreno +
      "</td><td>" +
      datos.data[i].Puntaje +
      "</td><td>" + 
      "<img src="+ datos.data[i].Portada+ " alt='foto' width=100%></img>"+
      '</td><td> <button class="btn btn-danger" onclick = "borrar('+ datos.data[i].id +')">Borrar</button></td><td> <button class="btn btn-success" onclick = "modificar(' +datos.data[i].id +')">Modificar</button></td><td></td></tr>'
  }
  
  listado += "</tbody></table>";
  document.getElementById("lis").innerHTML = listado;
 
}


async function borrar(id) {
  await axios.delete(
    "https://62c9ab104795d2d81f800fb7.mockapi.io/Peliculas/" + id
  );
  mostrar();
}

async function modificar(id) {
  document.getElementById("ins").hidden = true;
  document.getElementById("gua").hidden = false;
  const dato = await axios.get(
    "https://62c9ab104795d2d81f800fb7.mockapi.io/Peliculas/" + id
  );
  document.getElementById("tit").value = dato.data.Titulo;
  document.getElementById("desc").value = dato.data.Descripcion;
  document.getElementById("est").value = dato.data.Estreno;
  document.getElementById("port").value = dato.data.Portada;
  document.getElementById("punt").value = dato.data.Puntaje;
  localStorage.setItem("id", id);
  
  
}



async function guardar() {
  const id = localStorage.getItem("id");
  await axios.put(
    "https://62c9ab104795d2d81f800fb7.mockapi.io/Peliculas/" + id,
    {
      Titulo: document.getElementById("tit").value,
      Descripcion: document.getElementById("desc").value,
      Estreno: document.getElementById("est").value,
      Portada: document.getElementById("port").value,
      Puntaje: document.getElementById("punt").value,
    }
  );
  document.getElementById("tit").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("est").value = "";
  document.getElementById("port").value = "";
  document.getElementById("punt").value = "";
  mostrar();
  document.getElementById("ins").hidden = false;
  document.getElementById("gua").hidden = true;
 
}


