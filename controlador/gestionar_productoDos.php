<?php  	require_once '../modelo/productos_dos.php'; session_start();
	
	$productos_dos = new productos_dos();

	switch ($_GET['opcion']) { 

		case '1': // REGISTRAR
			
			$productos_dos->setid($_POST['id']);
			$productos_dos->setnombre($_POST['nombre']);
			$productos_dos->setid_categoria($_POST['color']);

			if($productos_dos->registrar()== true){echo"<script>  </script>";} 
			else{echo"<script>  </script>";}
			
			break;

		case '2':
			
			$x = $productos_dos->consultar_tdo();	
			$r = pg_num_rows($x);

			if ($r!=0) {
				print'<option value="-1">Seleccione</option>';

				while ($p=pg_fetch_assoc($x)) {

					echo '<option value="'.$p['id'].'">'.$p['nombre'].'</option>';

				}
			}else{
				print'<option value="-1">No existen productos disponibles</option>';
			}
			break;

		case '3':
				# code...
			break;

		case '4':
				# code...
			break;

		default:break;
	}
?>

