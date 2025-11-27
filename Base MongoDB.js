use Subastas

db.usuario.insertOne({
  nombre:"Juan",
  apellido: "Perez",
  password: "4321",
	presupuesto:20000
});

db.usuario.insertOne({
  nombre:"Benjamin",
  apellido: "Polanco",
  password: "1234",
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
	tiempo: 10,
  categoria: ["cartas", "juego de mesa", "coleccionables", "hasbro"],
	imagen: "http:Link-Imagen.com",
	ganador: "Benjamin",
	estado: "activa",
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

// Simulacion de puja
db.subastas.updateOne(
  { nombre: "Nicol Bolas MTG" },
  { $inc: { precio: 1000 } }
)

db.subastas.updateOne(
  { nombre: "Nicol Bolas MTG" },
  { $inc: { tiempo : -10 } }
)

db.subastas.updateOne(
  { nombre: "Nicol Bolas MTG" },
  { $set: { ganador : "juan" } }
)

db.subastas.find({ ganada: true })


db.ganadores.insertOne([{
  nombreProducto: "Nicol Bolas MTG",
  usuarioGanador: "Juan",
  precioFinal:10000,
  fecha: new Date()
}])

db.envios.insertOne({
  subastaId: ObjectId('692793dcc5f3a032926f1f4d'),
  usuario: "Juan",
  nombreProducto: "Nicol Bolas MTG",
  imagen: "https://img.png/",
  precio: 10000,

  direccion: "Calle Portugal 123",
  ciudad: "Santiago",
  region: "RM",
  telefono: "+5691234",
  nombreCompleto: "Juan Perez",

  estado: "PENDIENTE_ENVIO",
  fechaCreacion: new Date(),
  fechaEnvio: null,
  fechaEntrega: null
});


