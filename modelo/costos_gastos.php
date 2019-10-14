<?php 	require_once 'conexionBD.php';

class costos_gastos{

	private $id;		private $id_producto;	private $fecha;			private $precio_unitario;
	private $cantidad;	private $importe_total;	private $comentario;	private $id_responsable;
	

	private $con; function __construct() {$this->con= new conexionbd;}
	public function setid ($id) { $this->id=$id;}
	public function getid () { return $this->id;}
	public function setid_producto ($id_producto) { $this->id_producto=$id_producto;}
	public function getid_producto () { return $this->id_producto;}
	public function setfecha ($fecha) { $this->fecha=$fecha;}
	public function getfecha () { return $this->fecha;}
	public function setprecio_unitario ($precio_unitario) { $this->precio_unitario=$precio_unitario;}
	public function getprecio_unitario () { return $this->precio_unitario;}
	public function setcantidad ($cantidad) { $this->cantidad=$cantidad;}
	public function getcantidad () { return $this->cantidad;}
	public function setimporte_total ($importe_total) { $this->importe_total=$importe_total;}
	public function getimporte_total () { return $this->importe_total;}
	public function setcomentario ($comentario) { $this->comentario=$comentario;}
	public function getcomentario () { return $this->comentario;}
	public function setid_responsable ($id_responsable) { $this->id_responsable=$id_responsable;}
	public function getid_responsable () { return $this->id_responsable;}

	public function registrar()
		{
			$sql= "INSERT INTO costos_gastos (

			 id 	,id_producto 	,fecha 	,precio_unitario
			,cantidad 	,importe_total, 	 comentario		,id_responsable  

			)VALUES(

			 '".$this->id."','".$this->id_producto."','".$this->fecha."','".$this->precio_unitario."'
			,'".$this->cantidad."','".$this->importe_total."','".$this->comentario."','2'
			

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function registrar_espejo()
		{
			$sql= "INSERT INTO costos_gastos_espejo (

			 id 	,id_producto 	,fecha 	,precio_unitario
			,cantidad 	,importe_total, 	 comentario		,id_responsable  

			)VALUES(

			 '".$this->id."','".$this->id_producto."','".$this->fecha."','".$this->precio_unitario."'
			,'".$this->cantidad."','".$this->importe_total."','".$this->comentario."','2'
			

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function consultar_id()
		{
			$query = "SELECT id FROM costos_gastos ORDER BY id DESC LIMIT '1';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->id = $p['id'];
			}

		}

	public function consultar_id_espejo()
		{
			$query = "SELECT id FROM costos_gastos_espejo ORDER BY id DESC LIMIT '1';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->id = $p['id'];
			}

		}

	public function consultar_precioUnitario()
		{
			$query = "SELECT precio_unitario FROM costos_gastos WHERE id_producto = '".$this->id_producto."' ORDER BY id DESC LIMIT '1';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->precio_unitario = $p['precio_unitario'];
			}

			return $aux; 

		}

	public function consultProd_espejo()
		{
			$query = "SELECT * FROM costos_gastos_espejo ORDER BY id DESC;";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}

	public function eliminar_espejo()
		{
	   		$query = "DELETE FROM costos_gastos_espejo;";
	
			$aux =$this->con->consultaRetorno($query);
			if(!$aux){ return false; }
       		else{ return true;}
		}

}

?>