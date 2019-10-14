<?php  	require_once '../modelo/unidad_medida.php'; session_start();
	
	$unidad_medida = new unidad_medida();

	switch ($_GET['opcion']) { 

		case '1': // REGISTRAR
			
			$unidad_medida->setid($_POST['id']);
			$unidad_medida->setnombre($_POST['nombre']);

			if($unidad_medida->registrar()== true){echo"<script> toastrNav('Solicitud Registrada', 1); </script>";} 
			else{echo"<script> toastrNav('Error al Registrar', 3); </script>";}
			
			break;

		case '2':
				
			$x = $unidad_medida->consultar_tdo();	
			$r = pg_num_rows($x);

			if ($r!=0) {
				print'<option value="-1">Seleccione</option>';

				while ($p=pg_fetch_assoc($x)) {

					echo '<option value="'.$p['id'].'">'.$p['nombre'].'</option>';

				}
			}else{
				print'<option value="-1">No existen unidad medida disponibles</option>';
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
