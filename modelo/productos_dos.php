<?php 	require_once 'conexionBD.php';

class productos_dos{

	private $id;	private $nombre;	private $id_categoria;		

	private $con; function __construct() {$this->con= new conexionbd;}
	public function setid ($id) { $this->id=$id;}
	public function getid () { return $this->id;}
	public function setnombre ($nombre) { $this->nombre=$nombre;}
	public function getnombre () { return $this->nombre;}
	public function setid_categoria ($id_categoria) { $this->id_categoria=$id_categoria;}
	public function getid_categoria () { return $this->id_categoria;}

	public function registrar()
		{
			$sql= "INSERT INTO productos_dos (

			 id 	,nombre 	,id_categoria 	

			)VALUES(

			 '".$this->id."','".$this->nombre."','".$this->id_categoria."'			

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function consultar_tdo()
		{
			$query = "SELECT * FROM productos_dos;";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}

}

?>