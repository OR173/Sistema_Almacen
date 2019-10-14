<?php  	require_once '../modelo/costos_otros.php'; session_start();
	
	$costos_otros = new costos_otros();

	switch ($_GET['opcion']) { 

		case '1': // REGISTRAR
			
			$costos_otros->consultar_id();
			$costos_otros->setid($costos_otros->getid()+1);
			$costos_otros->setid_productoDos($_POST['nombre_costo']);
			$costos_otros->setid_tienda($_POST['local_recibir']);
			$costos_otros->setimporte_total($_POST['importeTotal_costo']);

			$fechaB = $_POST['ayo']."-".$_POST['mes']."-".$_POST['dia']; 

			$costos_otros->setfecha($fechaB);
			// $costos_otros->setid_responsable($_POST['responsable']);
			$costos_otros->setcomentario($_POST['comentario_CostoGasto']);

			if($costos_otros->registrar()== true){echo"<script> alert('registro Costo Otros'); </script>";} 
			else{echo"<script>alert('Error al Registrar Costo Otros'); </script>";}
			
			break;

		case '2':
				# code...
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
