<?php  	require_once '../modelo/productos.php'; session_start();
		require_once '../modelo/categorias.php';
		require_once '../modelo/unidad_medida.php';

	$productos = new productos();	$unidad_medida = new unidad_medida();
	$categorias = new categorias();

	switch ($_GET['opcion']) { 

		case '1': // REGISTRAR

			if (empty($_POST['stock_producto'])) {
				$stock_prod=0;
			}else{
				$stock_prod=$_POST['stock_producto'];
			}

			$productos->consultar_id();
			$productos->setid($productos->getid()+1);
			$productos->setnombre($_POST['nombre_producto']);
			$productos->setid_unidad_medida($_POST['unidad_medida2']);
			$productos->setid_categoria($_POST['categoria_producto']);
			$productos->setstock($stock_prod);
			$productos->setstock_ideal($_POST['stockIdeal_producto']);

			if($productos->registrar()== true){echo"<script> alert('registrado'); </script>";} 
			else{echo"<script> alert('error')</script>";}
			
			break;

		case '2': //consultar productos

			$x = $productos->consultar_tdo();
			$r = pg_num_rows($x);

				if ($r!=0) {

					while ($p=pg_fetch_assoc($x)) {

					$categorias->consultar_uno('nombre', 'id', $p['id_categoria'] );
					$unidad_medida->consultar_uno('nombre', 'id', $p['id_unidad_medida'] );

					echo '
						<tr>
							<td>'.$p['nombre'].'</td>
							<td>'.$unidad_medida->getnombre().'</td>
							<td>'.$p['stock'].'</td>
							<td>'.$p['stock_ideal'].'</td>
							<td>'.$categorias->getnombre().'</td>

							';

						$porciento70 = $p['stock_ideal'] * 0.7; 
						$porciento50 = $p['stock_ideal'] * 0.99;

						if ($p['stock'] < $porciento70 ) {
							print"<td><div style='width: 100px;' class='btn btn-danger btn-icon-split'>
				                    <span>Urgente</span>
				                  </div>
                  			</td>";
						}elseif ($p['stock'] < $porciento50) {
							print"<td><div style='width: 100px;' class='btn btn-warning btn-icon-split'>
				                    <span>Pendiente</span>
				                  </div>
                  			</td>";
						}elseif ($p['stock'] >= $p['stock_ideal']) {
							print"<td><div style='width: 100px;' class='btn btn-success btn-icon-split'>
				                    <span>Abastecido</span>
				                  </div>
                  			</td>";
						}

					print'
						<tr>
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
				
			$x = $productos->consultar_tdo();	
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

		case '4':
					
				$productos->consultar_uno("stock", "id" ,$_POST['data']);
				echo $productos->getstock();

			break;

		case '5':
				
				$productos->consultar_uno("id_unidad_medida", "id" ,$_POST['data']);
				$unidad_medida->consultar_uno("nombre", "id" ,$productos->getid_unidad_medida());

				echo $unidad_medida->getnombre();


			break;

		case '6':

			require_once '../modelo/costos_gastos.php';
			$costos_gastos = new costos_gastos();

			$x = $productos->consultar_producto($_POST['nombre_producto']);
			$costos_gastos->setid_producto($_POST['nombre_producto']);
			$costos_gastos->consultar_precioUnitario();

			while ($p=pg_fetch_assoc($x)) {

				$categorias->consultar_uno('nombre', 'id', $p['id_categoria'] );
				$unidad_medida->consultar_uno('nombre', 'id', $p['id_unidad_medida'] );
			
			print'
				<div class="col-lg-6">
					<dl class="row mb-0">
						<div class="col-sm-4 text-sm-right"><dt>Nombre:</dt> </div>
						<div class="col-sm-8 text-sm-left"><dd class="mb-1">'.$p['nombre'].'</dd></div>
					</dl>
					<dl class="row mb-0">
						<div class="col-sm-4 text-sm-right"><dt>Unidad de Medida:</dt> </div>
						<div class="col-sm-8 text-sm-left"><dd class="mb-1">'.$unidad_medida->getnombre().'</dd> </div>
					</dl>
					<dl class="row mb-0">
						<div class="col-sm-4 text-sm-right"><dt>Categoria:</dt> </div>
						<div class="col-sm-8 text-sm-left"> <dd class="mb-1">'.$categorias->getnombre().'</dd></div>
					</dl>
					<dl class="row mb-0">
						<div class="col-sm-4 text-sm-right"><dt>Stock:</dt> </div>
						<div class="col-sm-8 text-sm-left"> <dd class="mb-1">'.$p['stock'].'</dd></div>
					</dl>
					<dl class="row mb-0">
						<div class="col-sm-4 text-sm-right"> <dt>Stock Ideal:</dt></div>
						<div class="col-sm-8 text-sm-left"> <dd class="mb-1">'.$p['stock_ideal'].'</dd></div>
					</dl>
				</div>
				<div class="col-lg-6">
					<dl class="row mb-0">
						<div class="col-sm-4 text-sm-right">
							<dt>Costo por Unidad:</dt>
						</div>
						<div class="col-sm-8 text-sm-left">
							<dd class="mb-1">'.$costos_gastos->getprecio_unitario().'</dd>
						</div>
					</dl>
				</div>
			';
			}

			break;

		default:break;
	}
?>