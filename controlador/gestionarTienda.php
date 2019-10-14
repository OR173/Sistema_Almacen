<?php  	require_once '../modelo/tienda.php'; session_start();
	
	$tienda = new tienda();

	switch ($_GET['opcion']) { 

		case '1': // REGISTRAR
			
			$tienda->setid($_POST['id']);
			$tienda->setnombre($_POST['nombre']);

			if($tienda->registrar()== true){echo"<script> toastrNav('Solicitud Registrada', 1); </script>";} 
			else{echo"<script> toastrNav('Error al Registrar', 3); </script>";}
			
			break;

		case '2':
			
			$x = $tienda->consultar_tdo();	
			$r = pg_num_rows($x);

			if ($r!=0) {
				print'<option value="-1">Seleccione</option>';

				while ($p=pg_fetch_assoc($x)) {

					echo '<option value="'.$p['id'].'">'.$p['nombre'].'</option>';

				}
			}else{
				print'<option value="-1">No existen tiendas disponibles</option>';
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
