<?php  	require_once '../modelo/costos_gastos.php'; session_start();
	
	$costos_gastos = new costos_gastos();

	switch ($_GET['opcion']) { 

		case '1': // REGISTRAR

			ini_set('date.timezone', 'America/Caracas');
			$fecha = date('d / m / 20y', time());

			$costos_gastos->consultar_id_espejo();
			$costos_gastos->setid($costos_gastos->getid()+1);
			$costos_gastos->setid_producto($_POST['nombre_producto']);
			$costos_gastos->setfecha($fecha);
			$costos_gastos->setprecio_unitario($_POST['precioU_producto']);
			$costos_gastos->setcantidad($_POST['cantidad_EntradaProducto']);

			$importe_tot = $_POST['cantidad_EntradaProducto'] * $_POST['precioU_producto'];

			$costos_gastos->setimporte_total($importe_tot);
			// $costos_gastos->setid_responsable($_POST['marca']);
			$costos_gastos->setcomentario($_POST['comentario_ingresoP']);

			if($costos_gastos->registrar_espejo()== true){
				// echo"<script> alert('registrado costo'); </script>";
			}else{echo"<script> alert('error al ingresar el costo'); </script>";}
			
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

