const socket = io.connect();

function enviarMensaje() {
  const mail = document.getElementById("mail");
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const edad = document.getElementById("edad");
  const alias = document.getElementById("alias");
  const avatar = document.getElementById("avatar");
  const mensaje = document.getElementById("mensaje");
  const author = {id:mail.value, nombre:nombre.value, apellido:apellido.value, edad:edad.value, alias:alias.value, avatar:avatar.value}

  if (!nombre.value || !mensaje.value) {
    alert("Debe completar los campos");
    return false;
  }

  socket.emit("mensajeNuevo", {author, text: mensaje.value});
  mensaje.value = "";
  return false;
}

socket.on("mensajes", (mensajes) => {
  let mensajesHtml = mensajes
    .map(
      (mensaje) =>
        `<span>[${mensaje.date}] <img src="${mensaje.author.avatar}" alt="avatar" <b>${mensaje.author.alias}: </b>${mensaje.text}</span>`
    )
    .join("<br>");

  document.getElementById("listaMensajes").innerHTML = mensajesHtml;
});

const createProductTable = async (products) => {
  const template = await fetch("views/tabla.hbs");
  const templateText = await template.text();
  const templateCompiled = Handlebars.compile(templateText);
  return templateCompiled({ products });
};

const addProduct = () => {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");

  if (!title.value || !price.value) {
    alert("Debe completar los campos");
    return false
  }

  socket.emit("add-product", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });
};

document.getElementById("add-product").addEventListener("click", addProduct);

socket.on("products", async (products) => {
  const template = await createProductTable(products);
  document.getElementById("products").innerHTML = template;
});