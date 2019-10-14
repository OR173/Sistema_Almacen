<?php  

class conexionbd 
{
		private $bd_nombre;
		private $bd_hostname;
		private $bd_usuario;
		private $bd_password;
		private $puerto;
		private $con;
	
	public function __construct(){
		
		$this->bd_hostname="localhost";
		$this->bd_usuario="postgres";
		$this->bd_password="24401278";
		// $this->bd_nombre="restobar";
		$this->bd_nombre="stock_costos";
		$this->puerto=5432;
		$this->con= pg_connect("host='".$this->bd_hostname."'port='".$this->puerto."'dbname='".$this->bd_nombre."'user='".$this->bd_usuario."'password='".$this->bd_password."'");
	}	
	public function consultaSimple($sql){
		pg_query($sql,$this->con);
	}
	public function consultaRetorno($sql){
		$res=pg_query($sql);
		return $res;
	}
}
?>