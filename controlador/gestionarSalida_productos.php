<?php  	require_once '../modelo/salida_productos.php'; session_start();
		require_once '../modelo/costos_gastos.php';		require_once '../modelo/tienda.php';	
		require_once '../modelo/productos.php';	
		require_once '../modelo/unidad_medida.php';	

	$salida_productos = new salida_productos();		$unidad_medida = new unidad_medida();
	$costos_gastos = new costos_gastos();			$tienda = new tienda();
	$productos = new productos();

	ini_set('date.timezone', 'America/Caracas');
	// $fecha = date('d / m / 20y', time());
	$fecha = '2019-09-22';

	switch ($_GET['opcion']) { 

		case '1': // REGISTRAR
			
			$salida_productos->consultar_id('salida_productos_espejo');
			$salida_productos->setid_salida($salida_productos->getid_salida()+1);
			$salida_productos->setid_producto($_POST['nombre_producto']);
			$salida_productos->setcantidad($_POST['cantidad_SalidaProducto']);
			$salida_productos->setfecha_salida($fecha);
			$salida_productos->setid_tienda('3');

			$costos_gastos->setid_producto($_POST['nombre_producto']);
			$costos_gastos->consultar_precioUnitario();

			$salida_productos->setimporte_parcial($costos_gastos->getprecio_unitario()*$_POST['cantidad_SalidaProducto']);

			if($salida_productos->registrar('salida_productos_espejo') == false){
				echo"<script> alert('error al registrar salida'); </script>";
			} 
			
			break;

		case '2':
				
			$salida_productos->setid_tienda($_POST['local_recibir']);

			$q = $salida_productos->consultar_reporteSalida($_POST['fecha_desde'], $_POST['fecha_hasta']);
			$r = pg_num_rows($q);

			if ($r!=0) {
				
				while ($p=pg_fetch_assoc($q)) {

					$productos->consultar_uno("nombre", "id" ,$p['id_producto']);
					$tienda->consultar_uno("nombre", "id" ,$p['id_tienda']);
					$productos->consultar_uno("id_unidad_medida", "id" ,$p['id_producto']);
					$unidad_medida->consultar_uno('nombre', 'id', $productos->getid_unidad_medida());

					echo '
						<tr>
							<td>'.$productos->getnombre().'</td>
							<td>'.$unidad_medida->getnombre().'</td>
							<td>'.$p['cantidad'].'</td>
							<td>'.$p['fecha_salida'].'</td>
							<td>'.$p['importe_parcial'].'</td>
							<td>'.$tienda->getnombre().'</td>

							';
				}

			}else{
					echo'<tr>
						<td colspan="5" style=" color:red; text-align:center;">
								No hay productos Disponibles
						</td>
					</tr>';
			}


			break;

		case '3':
				
				$x = $salida_productos->consultProd_espejo();
				
				while ($p=pg_fetch_assoc($x)) {

						$productos->consultar_uno("nombre", "id" ,$p['id_producto']);
						$productos->consultar_uno("id_unidad_medida", "id" ,$p['id_producto']);
						$unidad_medida->consultar_uno("nombre", "id" ,$productos->getid_unidad_medida());
						$tienda->consultar_uno("nombre", "id" ,$p['id_tienda']);

						$costos_gastos->setid_producto($p['id_producto']);
						$costos_gastos->consultar_precioUnitario();

						$k = explode('-', $p['fecha_salida']);
		                $fechaA = ($k[2].'-'.$k[1].'-'.$k[0]);

					echo '
						<tr>
							<td>'.$productos->getnombre().'</td>
							<td>'.$unidad_medida->getnombre().'</td>
							<td>'.$p['cantidad'].'</td>
							<td>'.round($costos_gastos->getprecio_unitario(),2).'</td>
							<td>'.round($p['importe_parcial'],2).'</td>
							<td>'.$fechaA.'</td>
							<td>'.$tienda->getnombre().'</td>
						</tr>';
					
				}

			break;

		case '4':
				
				$x = $salida_productos->consultProd_espejo(); 

				while ($p=pg_fetch_assoc($x)) {	
					$salida_productos->consultar_id('salida_productos');
					$salida_productos->setid_salida($salida_productos->getid_salida()+1);
					$salida_productos->setid_producto($p['id_producto']);
					$salida_productos->setcantidad($p['cantidad']);
					$salida_productos->setfecha_salida($fecha);
					$salida_productos->setid_tienda($p['id_tienda']);
					$costos_gastos->setid_producto($p['id_producto']);
					$costos_gastos->consultar_precioUnitario();
					$salida_productos->setimporte_parcial($costos_gastos->getprecio_unitario()*$p['cantidad']);

					if($salida_productos->registrar('salida_productos') == true){	
						$productos->consultar_uno("stock", "id" ,$p['id_producto']);
						$productos->setid($p['id_producto']);
					
						if ($productos->actualizar("stock", $productos->getstock()-$p['cantidad']) != true) {
							echo"<script> alert('error al actualizar los montos en el stock'); </script>";
						}else{
							if ($salida_productos->eliminar_espejo() == false) {
								echo"<script> alert('Error al eliminar el espejo entrada'); </script>";
							}else{ echo"<script> location.reload(); </script>"; }
						}
					} 
					else{echo"<script> alert('error al registrar salida'); </script>";}
				}

			break;

		case '5':

				$productos->consultar_uno("nombre", "id" ,$_POST['nombre_producto']);
				$salida_productos->setid_producto($_POST['nombre_producto']);
				$x = $salida_productos->historial_producto();

				while ($p=pg_fetch_assoc($x)) {

					$tienda->consultar_uno("nombre", "id" ,$p['id_tienda']);

					$k = explode('-', $p['fecha_salida']);
	                $fechaA = ($k[2].'-'.$k[1].'-'.$k[0]);

				echo '
					<tr>
						<td>'.$productos->getnombre().'</td>
						<td>'.$p['cantidad'].'</td>
						<td>'.$fechaA.'</td>
						<td>'.$tienda->getnombre().'</td>
					</tr>';
				}

			break;

		default:break;
	}
?>

