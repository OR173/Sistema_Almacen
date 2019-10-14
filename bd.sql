
	CREATE TABLE categorias (
		id integer,
		nombre varchar (20) NOT NULL,

		PRIMARY KEY (id));

	CREATE TABLE unidad_medida (

		id integer,
		nombre varchar(20),

		PRIMARY KEY (id));

	CREATE TABLE productos (
		id integer,
		nombre varchar (100) NOT NULL,
		id_unidad_medida integer,
		id_categoria integer,
		stock double precision, 
		stock_ideal double precision,

		PRIMARY KEY (id),
		FOREIGN KEY (id_categoria) REFERENCES categorias (id) ON UPDATE CASCADE ON DELETE CASCADE,
		FOREIGN KEY (id_unidad_medida) REFERENCES unidad_medida (id) ON UPDATE CASCADE ON DELETE CASCADE);

	CREATE TABLE entrada_productos (

		id_entrada integer,
		id_producto integer,
		cantidad double precision,
		fecha_entrada date, 

		PRIMARY KEY (id_entrada, id_producto),
		FOREIGN KEY (id_producto) REFERENCES productos (id) ON UPDATE CASCADE ON DELETE CASCADE);

	CREATE TABLE entrada_productos_ESPEJO (

		id_entrada integer,
		id_producto integer,
		cantidad double precision,
		fecha_entrada date, 

		PRIMARY KEY (id_entrada, id_producto),
		FOREIGN KEY (id_producto) REFERENCES productos (id) ON UPDATE CASCADE ON DELETE CASCADE);

	CREATE TABLE tienda (
		id integer,
		nombre varchar(20) NOT NULL,

		PRIMARY KEY (id));

	CREATE TABLE salida_productos (

		id_salida integer,
		id_producto integer,
		cantidad double precision,
		fecha_salida date, 
		id_tienda integer,
		importe_parcial double precision, 


		PRIMARY KEY (id_salida, id_producto),
		FOREIGN KEY (id_tienda) REFERENCES tienda (id) ON UPDATE CASCADE ON DELETE CASCADE,
		FOREIGN KEY (id_producto) REFERENCES productos (id) ON UPDATE CASCADE ON DELETE CASCADE);

	CREATE TABLE salida_productos_ESPEJO (

		id_salida integer,
		id_producto integer,
		cantidad double precision,
		fecha_salida date, 
		id_tienda integer,
		importe_parcial double precision, 


		PRIMARY KEY (id_salida, id_producto),
		FOREIGN KEY (id_tienda) REFERENCES tienda (id) ON UPDATE CASCADE ON DELETE CASCADE,
		FOREIGN KEY (id_producto) REFERENCES productos (id) ON UPDATE CASCADE ON DELETE CASCADE);


	CREATE TABLE responsables_compras(
		id integer,
		nombre varchar(15) NOT NULL,

		PRIMARY KEY (id));

	CREATE TABLE costos_gastos(

		id integer,
		id_producto integer,
		fecha date,
		precio_unitario double precision, 
		cantidad integer,
		importe_total double precision,
		comentario varchar (150),
		id_responsable integer,

		PRIMARY KEY (id),
		FOREIGN KEY (id_responsable) REFERENCES responsables_compras (id) ON UPDATE CASCADE ON DELETE CASCADE,
		FOREIGN KEY (id_producto) REFERENCES productos (id) ON UPDATE CASCADE ON DELETE CASCADE

		);

	CREATE TABLE costos_gastos_ESPEJO(

		id integer,
		id_producto integer,
		fecha date,
		precio_unitario double precision, 
		cantidad integer,
		importe_total double precision,
		comentario varchar (150),
		id_responsable integer,

		PRIMARY KEY (id),
		FOREIGN KEY (id_responsable) REFERENCES responsables_compras (id) ON UPDATE CASCADE ON DELETE CASCADE,
		FOREIGN KEY (id_producto) REFERENCES productos (id) ON UPDATE CASCADE ON DELETE CASCADE

		);

	CREATE TABLE productos_dos(

		id integer,
		nombre varchar(30) NOT NULL,
		id_categoria integer,

		PRIMARY KEY (id),
		FOREIGN KEY (id_categoria) REFERENCES categorias (id) ON UPDATE CASCADE ON DELETE CASCADE);


	CREATE TABLE costos_otros(
		id integer,
		id_productoDos integer NOT NULL,
		id_tienda integer,
		importe_total double precision, 
		fecha date,
		id_responsable integer,
		comentario varchar(150),

		PRIMARY KEY (id),
		FOREIGN KEY (id_tienda) REFERENCES tienda (id) ON UPDATE CASCADE ON DELETE CASCADE,
		FOREIGN KEY (id_responsable) REFERENCES responsables_compras (id) ON UPDATE CASCADE ON DELETE CASCADE,
		FOREIGN KEY (id_productoDos) REFERENCES productos_dos (id) ON UPDATE CASCADE ON DELETE CASCADE

		);














	