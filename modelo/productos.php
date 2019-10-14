<?php 	require_once 'conexionBD.php';

class productos{

	private $id;	private $nombre;		private $id_unidad_medida;	private $id_categoria;
	private $stock;	private $stock_ideal;	
	

	private $con; function __construct() {$this->con= new conexionbd;}
	public function setid ($id) { $this->id=$id;}
	public function getid () { return $this->id;}
	public function setnombre ($nombre) { $this->nombre=$nombre;}
	public function getnombre () { return $this->nombre;}
	public function setid_unidad_medida ($id_unidad_medida) { $this->id_unidad_medida=$id_unidad_medida;}
	public function getid_unidad_medida () { return $this->id_unidad_medida;}
	public function setid_categoria ($id_categoria) { $this->id_categoria=$id_categoria;}
	public function getid_categoria () { return $this->id_categoria;}
	public function setstock ($stock) { $this->stock=$stock;}
	public function getstock () { return $this->stock;}
	public function setstock_ideal ($stock_ideal) { $this->stock_ideal=$stock_ideal;}
	public function getstock_ideal () { return $this->stock_ideal;}

	public function registrar()
		{
			$sql= "INSERT INTO productos (

			 id 	,nombre 	,id_unidad_medida 	,id_categoria
			,stock 	,stock_ideal

			)VALUES(

			 '".$this->id."','".$this->nombre."','".$this->id_unidad_medida."','".$this->id_categoria."'
			,'".$this->stock."','".$this->stock_ideal."'
			

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function consultar_id()
		{
			$query = "SELECT id FROM productos ORDER BY id DESC LIMIT '1';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->id = $p['id'];
			}

		}

	public function consultar_uno($buscar, $indicador, $valor)
		{
			$query = "SELECT ".$buscar." FROM productos WHERE ".$indicador." = '".$valor."';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->$buscar = $p[$buscar];
			}
		}

	public function consultar_producto($aux1)
		{
			$query = "SELECT * FROM productos WHERE id = ".$aux1.";";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}		

	public function consultar_tdo()
		{
			$query = "SELECT * FROM productos ORDER BY id ASC;";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}

	public function actualizar($aux1, $aux2)
		{
	   		$query = "UPDATE productos SET ".$aux1." = '".$aux2."' WHERE id = '".$this->id."';";
	
			$aux =$this->con->consultaRetorno($query);
			if(!$aux){ return false;}
		    else{ return true;}
		}




}
?>