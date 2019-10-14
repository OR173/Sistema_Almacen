<?php 	require_once 'conexionBD.php';

class categorias{

	private $id;	private $nombre;	

	private $con; function __construct() {$this->con= new conexionbd;}
	public function setid ($id) { $this->id=$id;}
	public function getid () { return $this->id;}
	public function setnombre ($nombre) { $this->nombre=$nombre;}
	public function getnombre () { return $this->nombre;}

	public function registrar()
		{
			$sql= "INSERT INTO categorias (

			 id 	,nombre 	 

			)VALUES(

			 '".$this->id."','".$this->nombre."'

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function consultar_tdo()
		{
			$query = "SELECT * FROM categorias;";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}

	
	public function consultar_uno($buscar, $indicador, $valor)
		{
			$query = "SELECT ".$buscar." FROM categorias WHERE ".$indicador." = '".$valor."';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->$buscar = $p[$buscar];
			}
		}	

}

?>