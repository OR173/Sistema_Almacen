<?php  	require_once '../modelo/entrada_productos.php'; session_start();
		require_once '../modelo/productos.php';
		require_once '../modelo/costos_gastos.php';
		require_once '../modelo/unidad_medida.php';

	$unidad_medida = new unidad_medida();
	$costos_gastos = new costos_gastos();
	$entrada_productos = new entrada_productos();
	$productos = new productos();

	switch ($_GET['opcion']) { 

		case '1': // REGISTRAR

			ini_set('date.timezone', 'America/Caracas');
			$fecha = date('d / m / 20y', time());
			
			$entrada_productos->consultar_id_espejo();
			$entrada_productos->setid_entrada($entrada_productos->getid_entrada()+1);
			$entrada_productos->setid_producto($_POST['nombre_producto']);
			$entrada_productos->setcantidad($_POST['cantidad_EntradaProducto']);
			$entrada_productos->setfecha_entrada($fecha);
			
			if($entrada_productos->registrar_espejo() == false){
				echo"<script> alert('error'); </script>";
			} 
			
			break;

		case '2':

				$productos->consultar_uno("nombre", "id" ,$_POST['nombre_producto']);
					 $entrada_productos->setid_producto($_POST['nombre_producto']);
				$x = $entrada_productos->historial_producto();

				while ($p=pg_fetch_assoc($x)) {

					$k = explode('-', $p['fecha_entrada']);
	                $fechaA = ($k[2].'-'.$k[1].'-'.$k[0]);

				echo '
					<tr>
						<td>'.$productos->getnombre().'</td>
						<td>'.$p['cantidad'].'</td>
						<td>'.$fechaA.'</td>
					</tr>';
				}

			break;

		case '3':
				
				$x = $costos_gastos->consultProd_espejo();
				
				while ($p=pg_fetch_assoc($x)) {

						$productos->consultar_uno("nombre", "id" ,$p['id_producto']);
						$productos->consultar_uno("id_unidad_medida", "id" ,$p['id_producto']);
						$unidad_medida->consultar_uno("nombre", "id" ,$productos->getid_unidad_medida());

						$k = explode('-', $p['fecha']);
		                $fechaA = ($k[2].'-'.$k[1].'-'.$k[0]);

					echo '
						<tr>
							<td>'.$productos->getnombre().'</td>
							<td>'.$unidad_medida->getnombre().'</td>
							<td>'.$p['cantidad'].'</td>
							<td>'.$p['precio_unitario'].'</td>
							<td>'.$p['importe_total'].'</td>
							<td>'.$fechaA.'</td>
							<td><span class="label label-info float-right">NEW</span></td>
						</tr>';
					
				}

			break;

		case '4':

				ini_set('date.timezone', 'America/Caracas');
				$fecha = date('d / m / 20y', time());
				$x = $costos_gastos->consultProd_espejo();
				$compuerta_x = false; 
				$compuerta_y = false; 
				while ($p=pg_fetch_assoc($x)) {
					$costos_gastos->consultar_id();
					$costos_gastos->setid($costos_gastos->getid()+1);
					$costos_gastos->setid_producto($p['id_producto']);
					$costos_gastos->setfecha($fecha);
					$costos_gastos->setprecio_unitario($p['precio_unitario']);
					$costos_gastos->setcantidad($p['cantidad']);
					$costos_gastos->setimporte_total($p['cantidad'] * $p['precio_unitario']);
					// $costos_gastos->setid_responsable($_POST['marca']);
					$costos_gastos->setcomentario($p['comentario']);
					if($costos_gastos->registrar()== true){
						if($costos_gastos->eliminar_espejo() == true){
							$compuerta_x = true; 
						}else{echo"<script> alert('error al eliminar el espejo costo');</script>";}
					}else{echo"<script> alert('error al ingresar el costo');</script>";}
				}

				if ($compuerta_x == true) {
					$q = $entrada_productos->consultProd_espejo();
					while ($t=pg_fetch_assoc($q)) {
						$entrada_productos->consultar_id();
						$entrada_productos->setid_entrada($entrada_productos->getid_entrada()+1);
						$entrada_productos->setid_producto($t['id_producto']);
						$entrada_productos->setcantidad($t['cantidad']);
						$entrada_productos->setfecha_entrada($fecha);
				
						if($entrada_productos->registrar() == true){

							$productos->consultar_uno("stock", "id" ,$t['id_producto']); 
							$productos->setid($t['id_producto']);
							if ($productos->actualizar("stock", $productos->getstock()+$t['cantidad']) != true) {
								$compuerta_y = true; 
								echo"<script> alert('error al actualizar los montos en el stock'); </script>";
							}

						}else{echo"<script> alert('error'); </script>";}

						if ($compuerta_y == false ) {
							if ($entrada_productos->eliminar_espejo() == false) {
								echo"<script> alert('Error al eliminar el espejo entrada'); </script>";
							}else{ echo"<script> location.reload(); </script>"; }
						}
					}
				}

			break;

		default:break;
	}
?>