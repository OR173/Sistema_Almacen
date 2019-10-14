<?php 	require_once 'conexionBD.php';

class salida_productos{

	private $id_salida;	private $id_producto;		private $cantidad;	
	private $id_tienda;	private $importe_parcial;	private $fecha_salida;
	
	private $con; function __construct() {$this->con= new conexionbd;}
	public function setid_salida ($id_salida) { $this->id_salida=$id_salida;}
	public function getid_salida () { return $this->id_salida;}
	public function setid_producto ($id_producto) { $this->id_producto=$id_producto;}
	public function getid_producto () { return $this->id_producto;}
	public function setcantidad ($cantidad) { $this->cantidad=$cantidad;}
	public function getcantidad () { return $this->cantidad;}
	public function setfecha_salida ($fecha_salida) { $this->fecha_salida=$fecha_salida;}
	public function getfecha_salida () { return $this->fecha_salida;}
	public function setid_tienda ($id_tienda) { $this->id_tienda=$id_tienda;}
	public function getid_tienda () { return $this->id_tienda;}
	public function setimporte_parcial ($importe_parcial) { $this->importe_parcial=$importe_parcial;}
	public function getimporte_parcial () { return $this->importe_parcial;}

	public function registrar($tabla)
		{
			$sql= "INSERT INTO ".$tabla." (

			 id_salida 	,id_producto 	,cantidad 	,fecha_salida
			,id_tienda 	,importe_parcial 

			)VALUES(

			 '".$this->id_salida."','".$this->id_producto."','".$this->cantidad."','".$this->fecha_salida."'
			,'".$this->id_tienda."','".$this->importe_parcial."'
			

			);"; $aux = $this->con->consultaRetorno($sql);
		       	  if(!$aux){ return false; }
		       	  else{ return true;}
		}

	public function consultar_id($tabla)
		{
			$query = "SELECT id_salida FROM ".$tabla." ORDER BY id_salida DESC LIMIT '1';";
			$aux = $this->con->consultaRetorno($query);

			while ($p=pg_fetch_assoc($aux)) {
				$this->id_salida = $p['id_salida'];
			}
		}


	public function consultar_reporteSalida($desde, $hasta)
		{
			

			$query = "
						SELECT *
						FROM salida_productos
						WHERE id_tienda = '".$this->id_tienda."' 
						AND fecha_salida 
						BETWEEN '".$desde."' AND '".$hasta."' 
						ORDER BY fecha_salida ASC;
					";
			
			$aux =$this->con->consultaRetorno($query);
			return $aux; 

		}

	public function consultProd_espejo()
		{
			$query = "SELECT * FROM salida_productos_espejo ORDER BY id_salida DESC;";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}

	public function eliminar_espejo()
		{
	   		$query = "DELETE FROM salida_productos_espejo;";
	
			$aux =$this->con->consultaRetorno($query);
			if(!$aux){ return false; }
       		else{ return true;}
		}

	public function historial_producto()
		{
			$query = "SELECT * FROM salida_productos WHERE id_producto = '".$this->id_producto."';";
			$aux = $this->con->consultaRetorno($query);
			return $aux;
		}

}

?>