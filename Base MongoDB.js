db.usuario.insertOne({
  nombre:"benjamin",
  password: "benjamin",
	presupuesto:20000
});

db.subastas.insertMany([{
  nombre: "Laptop Gamer",
  precio: 10000,
  tiempo: 12,
  categoria: ["tecnologia", "laptops", "gaming", "dell"],
  imagen: "http:Link-Imagen.com",
  ganador: "Benjamin",
  estado: "activa",
  ganada: false,
  fecha: new Date()
},{
  nombre: "Nicol Bolas MTG",
  precio: 10000,
	tiempo: 0,
  categoria: ["cartas", "juego de mesa", "coleccionables", "hasbro"],
	imagen: "http:Link-Imagen.com",
	ganador: "Diony",
	estado: "inactiva",
	ganada: true,
  fecha: new Date()
},{
  nombre: "Armadura de Iron Man Mark 1 Original",
  precio: 1000000,
	tiempo: 200,
  categoria: ["tecnologia", "peliculas", "marvel", "coleccionable"],
	imagen: "http:Link-Imagen.com",
	ganador: null,
	estado: "activa",
	ganada: false,
	fecha: new Date()
},{
}])


db.ganadores.insertOne([{
  nombreProducto: "Nicol Bolas MTG",
  usuarioGanador: "Diony",
  precioFinal:10000,
  fecha: new Date()
}])

db.envios.insertOne({
  subastaId: ObjectId('692793dcc5f3a032926f1f4d'),
  usuario: "Diony",
  nombreProducto: "Nicol Bolas MTG",
  imagen: "https://img.png/",
  precio: 10000,

  direccion: "Calle Falsa 123",
  ciudad: "Santiago",
  region: "RM",
  telefono: "+5691234",
  nombreCompleto: "Diony Peguero De la Cruz",

  estado: "PENDIENTE_ENVIO",
  fechaCreacion: new Date(),
  fechaEnvio: null,
  fechaEntrega: null
});