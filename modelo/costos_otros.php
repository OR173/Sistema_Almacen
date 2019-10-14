<?php 	require_once 'conexionBD.php';

class costos_otros{

	private $id;				private $id_productoDos;	private $importe_total;	
	private $id_responsable;	private $comentario;		private $fecha;
	

	private $con; function __construct() {$this->con= new conexionbd;}
	public function setid ($id) { $this->id=$id;}
	public function getid () { return $this->id;}
	public function setid_tienda ($id_tienda) { $this->id_tienda=$id_tienda;}
	public function getid_tienda () { return $this->id_tienda;}
	public function setid_productoDos ($id_productoDos) { $this->id_productoDos=$id_productoDos;}
	public function getid_productoDos () { return $this->id_productoDos;}
	public function setimporte_total ($importe_total) { $this->importe_total=$importe_total;}
	public function getimporte_total () { return $this->importe_total;}
	public function setfecha ($fecha) { $this->fecha=$fecha;}
	public function getfecha () { return $this->fecha;}
	public function setid_responsable ($id_responsable) { $this->id_responsable=$id_responsable;}
	public function getid_responsable () { return $this->id_responsable;}
	public function setcomentario ($comentario) { $this->comentario=$comentario;}
	public function getcomentario () { return $this->comentario;}

	public function registrar()
		{
			$sql= "INSERT INTO costos_otros (

			 id 	,id_productoDos 	,id_tienda, importe_total 	,fecha
			,id_responsable 	,comentario

			)VALUES(

			 '".$this->id."','".$this->id_productoDos."','".$this->id_tienda."','".$this->importe_total."','".$this->fecha."'
			,'2','".$this->comentario."'
			

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function consultar_id()
		{
			$query = "SELECT id FROM costos_otros ORDER BY id DESC LIMIT '1';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->id = $p['id'];
			}

		}

}

?>