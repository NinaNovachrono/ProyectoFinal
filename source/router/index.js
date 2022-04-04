const express = require("express");
const dbContactos = require('../models/contactos.js');
const router = express.Router();
const mysql = require("mysql");

//dbContactos.Contactos.insertar({nombre:'Melani',domicilio:'Avenida Eje 2A', telefono:'6692257715'})
//dbContactos.Contactos.mostrarTodos();
//dbContactos.Contactos.buscarId(1);
// dbContactos.Contactos.borrar(1);
//Routers
router.get('/',(req,res)=>{
    res.send("Iniciamos Servidor");
});

router.get('/index',(req,res)=>{
	res.render('index.html',{titulo:'Index'})
});
router.get('/acercade',(req,res)=>{
	res.render('acercade.html',{titulo:'Acerca de'})
});
router.get('/contactos',(req,res)=>{
	res.render('contactos.html',{titulo:'Contactos'})
});
router.get('/menu',(req,res)=>{
	res.render('Menu.html',{titulo:'Menu'})
});

router.get('/agenda',(req,res) => {
	res.render('agenda.html', { titulo : 'Agenda de Contactos', contactos: [], contacto: null })
});

router.post('/agenda', async (req,res) => {
	let contactos = await dbContactos.Contactos.mostrarTodos();
	if (!contactos.length) return res.render('agenda.html', { titulo : 'Agenda de Contactos', contactos: [], contacto: null });

	res.render('agenda.html', { titulo : 'Agenda de Contactos', contactos: contactos, contacto: null })
});

router.post('/agenda/nuevo', async (req,res) => {
	const { nombre, domicilio, telefono } = req.body;

	await dbContactos.Contactos.insertar({nombre, domicilio, telefono});

	res.redirect('/agenda')
});

router.get('/agenda/id', async (req,res) => {
	const { idContactos } = req.query;
	if (!idContactos) return res.redirect('/agenda');

	const contacto = await dbContactos.Contactos.buscarId(idContactos);

	res.render('agenda.html', { titulo: 'Agenda de Contactos', contactos: [], contacto: contacto[0]});
});

router.post('/agenda/id', async (req,res) => {
	const { idContactos, nombre, domicilio, telefono } = req.body;
	if (!idContactos) return res.redirect('/agenda');

	await dbContactos.Contactos.actualizar({nombre, domicilio, telefono, idContactos});

	res.redirect('/agenda');
})

router.post('/agenda/id/borrar', async (req,res) => {

	const { idContactos } = req.body;
	
	if (!idContactos) return res.redirect('/agenda');
	
	await dbContactos.Contactos.borrar(idContactos);

	res.redirect('/agenda');
})


router.get('*',(req,res)=>{
	res.send("No existe la pagina");
})
module.exports=router;