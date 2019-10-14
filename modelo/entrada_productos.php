<?php 	require_once 'conexionBD.php';

class entrada_productos{

	private $id_entrada;	private $id_producto;	private $cantidad;	private $fecha_entrada;	

	private $con; function __construct() {$this->con= new conexionbd;}
	public function setid_entrada ($id_entrada) { $this->id_entrada=$id_entrada;}
	public function getid_entrada () { return $this->id_entrada;}
	public function setid_producto ($id_producto) { $this->id_producto=$id_producto;}
	public function getid_producto () { return $this->id_producto;}
	public function setcantidad ($cantidad) { $this->cantidad=$cantidad;}
	public function getcantidad () { return $this->cantidad;}
	public function setfecha_entrada ($fecha_entrada) { $this->fecha_entrada=$fecha_entrada;}
	public function getfecha_entrada () { return $this->fecha_entrada;}

	public function registrar()
		{
			$sql= "INSERT INTO entrada_productos (

			 id_entrada 	,id_producto 	,cantidad 	,fecha_entrada

			)VALUES(

			 '".$this->id_entrada."','".$this->id_producto."','".$this->cantidad."','".$this->fecha_entrada."'

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function registrar_espejo()
		{
			$sql= "INSERT INTO entrada_productos_espejo (

			 id_entrada 	,id_producto 	,cantidad 	,fecha_entrada

			)VALUES(

			 '".$this->id_entrada."','".$this->id_producto."','".$this->cantidad."','".$this->fecha_entrada."'

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function consultar_id_espejo()
		{
			$query = "SELECT id_entrada FROM entrada_productos_espejo ORDER BY id_entrada DESC LIMIT '1';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->id_entrada = $p['id_entrada'];
			}

		}

	public function consultar_id()
		{
			$query = "SELECT id_entrada FROM entrada_productos ORDER BY id_entrada DESC LIMIT '1';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->id_entrada = $p['id_entrada'];
			}

		}

	public function historial_producto()
		{
			$query = "SELECT * FROM entrada_productos WHERE id_producto = '".$this->id_producto."';";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}

	public function consultProd_espejo()
		{
			$query = "SELECT * FROM entrada_productos_espejo ORDER BY id_entrada ASC;";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}

	public function eliminar_espejo()
		{
	   		$query = "DELETE FROM entrada_productos_espejo;";
	
			$aux =$this->con->consultaRetorno($query);
			if(!$aux){ return false; }
       		else{ return true;}
		}

}

?>