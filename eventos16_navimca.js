var select_proveedorMateriales, select_proveedorTransporte; 
/* -- -----------------------------------------------------
   -- DEPARTAMENTO DE PROCURA 
-- --------------------------------------------------------  */

    $(document).ready(function() { alert("eventos14");


        $('#aceptar_detalleRequisicion').click(function() {
            var serial = $('#formulario_detalleRequisicion').serialize()+"&numero="+$('#numero_solicitRe').val();
            console.log(serial);
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarPartida.php?opcion=17',
                data: serial,
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            }) .done(function() {$('#modal_DetalleRequisicion').modal('hide'); requisicionesPorAprobar_procura();}); 
        });

        $('#aceptar_presupuesto').click(function() {

            var aux = validar_textArea('textoPrespuesto', 500, 2); 
            if (aux == true) {
                swal({
                    title: "ALERTA",
                    text: "¿Desea Guardar el Presupuesto?", 
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, aceptar",
                    closeOnConfirm: false
                }, function () { $('.sweet-overlay').remove();  $('.sweet-alert').remove();
                    var serial= "partida="+$('#num_partida').val()+"&presupuesto="+$('#num_presupuesto').val()
                    +"&texto="+$('#textoPrespuesto').val();
                    $.ajax({
                        type: 'POST',
                        url: '../../../controlador/gestionarPartida.php?opcion=10',
                        data: serial,
                        success:function(rt){
                            $('#resultado').html(rt);
                            tabla_presupuesto($('#num_partida').val(),1);
                        }  
                    });
                });
            }
        });

        $('#precio_unitario').blur(function() {
            precio = $('#precio_unitario').val(); 
        });
        $('#precio_unitario2').blur(function() {
            precio2 = $('#precio_unitario2').val(); 
        });

        $('#cantidad2').blur(function() {
            cantidad = $('#cantidad2').val();
            total = cantidad * precio;
            $('#precio_total').val(total);
            cantidad = precio = 0;
        });

        $('#cantidad3').blur(function() {
            cantidad3 = $('#cantidad3').val();
            total2 = cantidad3 * precio2;
            $('#precio_total2').val(total2);
            cantidad3 = precio2 = 0;
        });

        $('#nuevo_proveedor').click(function() {
            $('#formulario_proveedor')[0].reset();
            $('#modal_empresa').modal('show');
        });

        $('#aceptar_proveedor').click(function() { aux = true;
            
            if ($('#Rif').val() === '') {toastrNav('Ingrese un Rif',3); aux = false;}
            else{
                if ($('#Nombre').val() === '') {toastrNav('Ingrese una Nombre',3); aux = false;}
                else{
                    if ($('#Direccion').val() === '') {toastrNav('Ingrese la Direccion',3); aux = false;}
                    else{
                        if ($('#Correo').val() === '') {toastrNav('Ingrese un Correo',3); aux = false;}
                        else{
                            if ($('#telefono').val() === '') {toastrNav('Ingrese un Teléfono',3); aux = false;}
                        }
                    }       
                }
            }

            if (aux == true) {
                var serial = $('#formulario_proveedor').serialize()+"&iden="+1;
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarProveedor.php?opcion=1',
                    data: serial,
                    success:function(rt){
                        $('#resultado').html(rt);
                    }  
                });     
            }
        });

        $('#aceptar_proveTransporte').click(function() {
            var serial = $('#formulario_proveedor').serialize()+"&iden="+2;

            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarProveedor.php?opcion=1',
                data: serial,
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            }).done(function() {
                tabla_proveedor(2);
                $('#modal_empresa').modal('hide');
            });    
        });

        $('#aceptar_clasiProve').click(function() {
            var serial = $('#formulario_clasiProve').serialize()+"&rif="+$('#numeroClasiProve').val();
            console.log(serial);
            
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarProveedor.php?opcion=10',
                data: serial,
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            }) .done(function() {
                $('#proveedor_clasificacion').modal('hide');
                detalle_proveedor(1,$('#numeroClasiProve').val());    
            });
        });

        $('#aceptar_vehiculo').click(function() {   var aux = true; 

            if ($('#matricula').val() === '') {toastrNav('Ingrese una Matricula',3); aux = false;}
            else{
                if ($('#marca').val() === '') {toastrNav('Ingrese una Marca',3); aux = false;}
                else{
                    if ($('#modelo').val() === '') {toastrNav('Ingrese un Modelo',3); aux = false;}
                    else{
                        if ($('#tipo').val() === '') {toastrNav('Ingrese un Tipo de Vehiculo',3); aux = false;}
                        else{
                            if ($('#ano_vehiculo').val() === '') {toastrNav('Ingrese año del Vehiculo',3); aux = false;}
                        }
                    }       
                }
            }

            if (aux == true) {
                var serial = $('#formulario_vehiculo').serialize()+"&rif="+$('#rif_vehiculo').val();
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarProveedor.php?opcion=2',
                    data: serial,
                    success:function(rt){
                        $('#resultado').html(rt);
                    }  
                }) .done(function() {
                    $('#new_vehiculo').modal('hide');
                    vehiculo_proveedor(1, $('#rif_vehiculo').val());
                });
            }
            
            
        });


        $('#aceptar_personal').click(function() {   var aux = true; 

            if ($('#cedula').val() === '') {toastrNav('Ingrese una Cédula',3); aux = false;}
            else{
                if ($('#nombre').val() === '') {toastrNav('Ingrese un Nombre',3); aux = false;}
                else{
                    if ($('#apellido').val() === '') {toastrNav('Ingrese un apellido',3); aux = false;}
                    else{
                        if ($('#licencia').val() === '') {toastrNav('Ingrese una Licencia',3); aux = false;}
                    }   
                }
            }
                
            if (aux == true) {
                var serial = $('#formulario_personal').serialize()+"&rif="+$('#rif_personal').val();
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarProveedor.php?opcion=3',
                    data: serial,
                    success:function(rt){
                        $('#resultado').html(rt);
                    }  
                }) .done(function() {
                    $('#new_personal').modal('hide');
                    personal_proveedor(1, $('#rif_personal').val());
                });
            }
  
        });

        $('select#provedor_materiales').on('change',function(){
            select_proveedorMateriales = $(this).val();
            console.log(select_proveedorMateriales);
        });
        $('select#provedor_transporte').on('change',function(){
            select_proveedorTransporte = $(this).val();
            console.log(select_proveedorTransporte);
        });
        $('select#selectPresupuestoClasi').on('change',function(){
            selectPresupuestoClasi = $(this).val();
            console.log(selectPresupuestoClasi);

            if (selectPresupuestoClasi != 0) {
                buscar_material(selectPresupuestoClasi,'materialPresupues');
                $('#materialPresupues').removeAttr('disabled');
                
            }
        }); 

        $('select#materialPresupues').on('change',function(){
            materialPresupues = $(this).val();
            console.log(materialPresupues);
        });


    /* -- -----------------------------------------------------
    -- VALIDATE PROCURA 
    -- --------------------------------------------------------  */

        jQuery.validator.addMethod("lettersonly", function(value, element) {
          return this.optional(element) || /^[a-z]+$/i.test(value);
        }, "Solo letras");

        jQuery.validator.addMethod("EmailAvanzado", function(value, element) {
          return this.optional(element) || /^\b[A-Z0-9_-]+@[A-Z]+\.[A-Z]{3,3}\b$/i.test(value);
        }, 'Correo Inválidooo');

        $("#formulario_Presupuesto").validate({       
            rules: {
                precio_unitario: {
                    required: true, 
                    digits: true, 
                },
                cantidad2: {
                    required: true, 
                    digits: true,
                } 

                // soloLetras: {
                //     EmailAvanzado: true
                // }

            }, messages:{
                precio_unitario:{
                    required: 'Campo Requerido', 
                    digits: 'Solo Números',
                }
            }         
        });

        $("#formulario_proveedor").validate({       
            rules: {
                Rif: {
                    required: true,
                }

            }, messages:{
                Rif:{
                    required: 'Campo Requerido', 
                }
            }         
        });


    });

    function crear_partida() { 
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarPartida.php?opcion=1',
            data: '',
            success:function(rt){
                $('#nueva_partida').html(rt);
            }  
        });
    }

    function listar_partidas() { 

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarPartida.php?opcion=8',
            data: '',
            success:function(rt){
                $('#partidas_pendientes').html(rt);
            }  
        }) .done(function() {
            detalle_partida(2);
        });
    }

    function detalle_partida(a,b) {
        
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarPartida.php?opcion=13',
            data: {numero:b, iden:a},
            beforeSend: function () {
                spinnerFUN('detalles_partida');
            },success:function(rt){
                $('#detalles_partida').html(rt);
            }  
        }) .done(function() {
            
        });
    }

    function ver_presupuesto(a,b,c) {

        if (a == 1 ) {  var serial = "iden="+b+"&partida="+c;

            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarPartida.php?opcion=14',
                data: serial,
                success:function(rt){
                    $('#detalle2_presupuesto').html(rt);
                }  
            }) .done(function() {   $('#index_partidasPendientes').hide(); $('#index_detallePresupuesto').show();
                $('#tab-'+b).addClass('active'); $('.listTbs'+b).addClass('active');
                
            });

            
        }else {

        }
    }

    function aprobarRequisicione_gerencias(a,b) {
        swal({
            title: "Alerta",
            text: "¿Seguro que desea Aprobar esta Requisición?", 
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, aceptar",
            closeOnConfirm: false
        }, function () {    $('.sweet-overlay').remove(); $('.sweet-alert').remove();
            var datos = "requisicion="+a+"&perfil="+b;
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=12',
                data: datos,
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            });
            tabla_TodasRequisiciones();
        });
    }

    function detalleRequisicion(a) {

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarPartida.php?opcion=16',
            data: '',
            success:function(rt){
                $('#select_datelleRequisicion').html(rt);
            }  
        }) .done(function() {   pluggin(7);
            $('.nombre_datelleRequisicion').html("Requisicion Nro: "+a);
            $('#numero_solicitRe').attr('value', a);
            $('#modal_DetalleRequisicion').modal('show');
            
        });
    }


    function tabla_presupuesto(partida, desicion) {

        if   (desicion == 1) { ruta = "../../../controlador/gestionarPartida.php?opcion=4";  }
        if   (desicion == 2) { ruta = "../../../controlador/gestionarPartida.php?opcion=19"; }

        var serial = "partida="+partida; 
        $.ajax({
            type: 'POST',
            url: ruta, 
            data: serial,
            success:function(rt){   

                $('#SiHayPartida').show();
                $('#tabla_presupuesto').html(rt);
                $('#NohayPartida').remove(); 
                $('#BotonesPartida').show();

            }  
        });
    }

    function agregar_presupuesto(a,b,c) {

        $('#index_partida').hide();$('#index_presupuesto').show(); 

        $('.num_presupuesto').html('Presupuesto Número: '+a);$('#num_presupuesto').attr('value', a);
        $('.num_partida').html('Partida Número: '+b);$('#num_partida').attr('value', b);
        $('.fecha_creacionpre').html('Fecha Creación: '+c);$('#fecha_creacionpre').attr('value', c);

        buscar_clasificacion_material('selectPresupuestoClasi');
        tabla_presupuestoITEM(a,b);
 
    }

    var materialPresupues;
    function agg_Presupuesto() { 
        
        var serial= $('#formulario_Presupuesto').serialize()+"&material="+materialPresupues+"&partida="+
                    $('#num_partida').val()+"&presupuesto="+$('#num_presupuesto').val()
                    +"&fecha="+$('#fecha_creacionpre').val();
        var aux = true; 

        if ($('#precio_unitario').val().trim() === '') {
            toastrNav('Ingrese Precio Unitario',3); aux= false;
        }
        if ($('#cantidad2').val().trim() === '') {
            toastrNav('Ingrese Cantidad',3); aux= false;
        }
        if($('#materialPresupues').val()== '0'){
            toastrNav('Seleccione un Material',3); aux= false;
        }

        if (aux == true) {  console.log(serial);
             $.ajax({
                 type: 'POST',
                 url: '../../../controlador/gestionarPartida.php?opcion=6',
                 data: serial,
                 success:function(rt){
                     $('#resultado').html(rt);
                 }  
             }) .done(function() {
                $('#formulario_Presupuesto')[0].reset();
                tabla_presupuestoITEM($('#num_presupuesto').val(),$('#num_partida').val());
            });
        }
    }

    function modificar_presupuesto(desicion,id,partida,fecha) {  

        if (desicion == 1) {    

            select_proveedorMateriales="";
            select_proveedorTransporte="";

            $('#formulario_detalles_presupuesto')[0].reset();
            $('#detallesPresu_Partida').attr('value', partida);
            $('#detallesPresu_item').attr('value', id);
            $('.detallesPresu_item').html('Presupuesto Nro: '+id)
            buscar_proveedor('provedor_materiales', 1);
            buscar_proveedor('provedor_transporte', 2); 
            $('#modal_presupuesto').modal('show'); 
            $('#provedor_materiales > option[value="G-00000005-4"]').attr('selected', 'selected');
        }
            
        if (desicion == 2) {
            var serial = $('#formulario_detalles_presupuesto').serialize()
                +"&materiales="+select_proveedorMateriales+"&transporte="+select_proveedorTransporte
                +"&partida="+$('#detallesPresu_Partida').val()+"&item="+$('#detallesPresu_item').val();
            console.log(serial);
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarPartida.php?opcion=5',
                data: serial,
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            }) .done(function() {   tabla_presupuesto($('#detallesPresu_Partida').val(),1);
                $('#modal_presupuesto').modal('hide');
            });
        }   
    }

    function tabla_presupuestoITEM(a,b) {   

        var serial = "partida="+b+"&presupuesto="+a;

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarPartida.php?opcion=7',
            data: serial,
            success:function(rt){
                $('#tabla_presupuestoITEM').html(rt);
            }  
        });
    }

    function editar_datos_presupuesto(desicion,id, presupuesto,partida) {   

        var serial = "id="+id+"&partida="+partida+"&presupuesto="+presupuesto+"&desicion="+desicion;
        var ruta = '../../../controlador/gestionarPartida.php?opcion=9';
        
        if (desicion == 1) {
            $('#editar_item_presupuesto').modal('show');
            $.ajax({
                type: 'POST',
                url: ruta,
                data: serial,
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            });
        }
        if (desicion == 2) { 
            swal({
                title: "Alerta",
                text: "¿Desea Eliminar este Material?", 
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, aceptar",
                closeOnConfirm: false
            }, function () {    $('.sweet-overlay').remove(); $('.sweet-alert').remove();
                $.ajax({
                    type: 'POST',
                    url: ruta,
                    data: serial,
                    success:function(rt){
                        $('#resultado').html(rt);
                    }  
                });tabla_presupuestoITEM(presupuesto,partida);
            });
        }

        if (desicion == 3) { 
            var serial2 =  $('#form_item_presupuesto').serialize()+"&id="+$('#edit_id').val()
            +"&partida="+$('#edit_par').val()+"&presupuesto="+$('#edit_pres').val()+"&desicion="+desicion;
            console.log(serial2);
            $.ajax({
                    type: 'POST',
                    url: ruta,
                    data: serial2,
                    success:function(rt){
                        $('#resultado').html(rt);
                    }  
                }) .done(function() {
                    $('#form_item_presupuesto')[0].reset();
                    $('#editar_item_presupuesto').modal('hide');
                    tabla_presupuestoITEM($('#edit_pres').val(),$('#edit_par').val());
                });    
        }


        // $.ajax({
        //     type: 'POST',
        //     url: '../../../controlador/gestionarPartida.php?opcion=9',
        //     data: serial,
        //     success:function(rt){
        //         $('#resultado').html(rt);
        //     }  
        // }) .done(function() {
        //     tabla_presupuestoITEM(presupuesto,partida);
        // });
    }

    function detalle_proveedor(a,b) {   var serial = "iden="+a+"&numero="+b; 

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarProveedor.php?opcion=6',
            data: serial,
            beforeSend: function () {
                spinnerFUN('detalle_proveedor');
            },success:function(rt){
                $('#detalle_proveedor').html(rt);
            }  
        });
    }

    function tabla_proveedor(a) { 
        
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarProveedor.php?opcion=7',
            data: {desicion:a},
            success:function(rt){
                $('#tabla_proveedor').html(rt);
            }  
        }) .done(function() {detalle_proveedor(a);
            pluggin(5);
        });                 
    }

    function vehiculo_proveedor(a,b) {

        if (a == 1) {
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarProveedor.php?opcion=9',
                data: {aux:b},
                success:function(rt){
                    $('#tabla_vehiculo').html(rt);
                }  
            }) .done(function() {
                $('#modal_vehiculo').modal('show');  pluggin(5);
            });
        }else{
            if (a == 2) {   $('#formulario_vehiculo')[0].reset();
                $('#modal_vehiculo').modal('hide');
                $('#new_vehiculo').modal('show');

            }
        }
    }

    function personal_proveedor(a,b) {
        
        if (a == 1) {
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarProveedor.php?opcion=4',
                data: {aux:b},
                success:function(rt){
                    $('#tabla_personal').html(rt);
                }  
            }) .done(function() {
                $('#modal_provePersonal').modal('show');    pluggin(5);
            });
        }else{
            if (a == 2) {   $('#formulario_personal')[0].reset();
                $('#modal_provePersonal').modal('hide');
                $('#new_personal').modal('show');
            }
        }
    }

    function proveedor_MaterialTransporte(b) {
        
            swal({
                title: "Alerta",
                text: "¿Este Proveedor Posee Transporte?", 
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, aceptar",
                closeOnConfirm: false
            }, function () {
                $('.sweet-overlay').remove();
                $('.sweet-alert').remove();
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarProveedor.php?opcion=5',
                    data: {aux:b},
                    success:function(rt){
                        $('#resultado').html(rt);
                    }  
                }) .done(function() {
                    
                });
            });
    }

    function buscar_proveedor(div, num) {
        
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarProveedor.php?opcion=8',
            data: {desicion: num},
            success:function(rt){
                $('#'+div).html(rt);
            }  
        });
    }

    function buscar_clasificacion_material(div) {
        
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarMateriales.php?opcion=7',
            data: '',
            success:function(rt){
                $('#'+div).html(rt);
            }  
        });
    }

    function proveedor_clasificacion2(a) { 
        buscar_clasificacion_material('clasificacionProveedor'); 
        $('#numeroClasiProve').attr('value', a); $('#proveedor_clasificacion').modal('show');
        $('.chosen-select').chosen({width: "100%"});
    }

    function valoracion_proveedor(desicion, proveedor) {
        
        if (desicion == 1) {
            $('#modal_valoracionPro').modal('show');
            $('#nombre_valoracion').attr('value', proveedor); 
            $('#tipo_valoracion').attr('value', tipo); 
        }

        if (desicion == 2) {
            var data = $('#formulario_valoracion').serialize()+"&nombre="+$('#nombre_valoracion').val();

            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarProveedor.php?opcion=11',
                data: data,
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            }) .done(function() {
                $('#modal_valoracionPro').modal('hide');
            });

        }
    }


/* -- -----------------------------------------------------
   -- DEPARTAMENTO SALA TECNICA
-- --------------------------------------------------------  */

    function clasificacion_material(a) {

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarMateriales.php?opcion=6',
            data: {tipo:a},
            success:function(rt){
                $('#clasificacionMaterial').html(rt);
            }  
        }) .done(function() {
            pluggin(6);
        });
    }

    function capturar_clasificacion(a) {
        
        if (a != -1) { $('#g16').removeClass('hidden');
            $('#index').hide(); $('#materiales').show();
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarMateriales.php?opcion=2',
                data: {numero:a},
                beforeSend: function () {
                    spinnerFUN('detalles_materiales');
                },
                success:function(rt){
                    $('#detalles_materiales').html(rt);
                    pluggin(5);
                }  
            }) .done(function() {
                
            });
        }else{
            $('#agg_clasificacionMateriales').modal('show');
        }
    }

    function aceptar_clasificacion(a) {
        
        var aux = validar_textArea('textoPaquete', 400, 1); 
            if (aux == true) {

                var serial = "nombre="+$('#textoPaquete').val()+"&tipo="+a;
                console.log(serial);
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarMateriales.php?opcion=5',
                    data: serial,
                    success:function(rt){
                        $('#resultado').html(rt);
                        $('#agg_clasificacionMateriales').modal('hide');
                        clasificacion_material(a);
                    }  
                });
            }
    }

    function guardar_aggMateriales(a) {
        var serial = $('#formulario_aggMateriales').serialize()+"&tipo="+a;
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarMateriales.php?opcion=1',
            data: serial,
            success:function(rt){
                $('#resultado').html(rt);
            }  
        });
    }

/* -- -----------------------------------------------------
   -- PLANIFICADOR 
-- --------------------------------------------------------  */

    function tablaRequisicion() {
        
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSubEntregable.php?opcion=14',
            data: {},
            success:function(rt){
                $('#modificar_edt1').html(rt);
            }  
        }) .done(function() {
            
        });
    }

    function buscar_material(clasificacion, div) {
            
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarMateriales.php?opcion=4',
                data: {aux:clasificacion},
                success:function(rt){
                    $('#'+div).html(rt);
                }  
            });
    }
    
    function detallesActividad(a,e,c,d,b) { 

        $('#actividad_de_paquete').hide(); $('#g14').removeClass('hidden');
        $('#asignar_recursos').show();$('#paquete_actividades').hide();
        
        var serial = "actividad="+a+"&paquete="+b+"&SubEntregable="+c+"&embarcacion="+d+"&proyecto="+e;
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSubEntregable.php?opcion=2',
            data: serial,
            success:function(rt){
                $('.detalles').html(rt);
            }  
        }) .done(function() {$("#num_Recurso").html("Número de Asignacion: #'.$NomenCla.' ");
            $('#form_AsignarRecursos')[0].reset();
            $('#textoRecursosAsig').val("");
            buscar_clasificacion_material('clasificacionRecursos');
            tabla_AsignacionRecursos(00); 
        });
    }

    function tabla_AsignacionRecursos(num_Recurso) {
         
         $.ajax({
             type: 'POST',
             url: '../../../controlador/gestionarSubEntregable.php?opcion=4',
             data: {recurso:num_Recurso}, 
             success:function(rt){
                 $('#tabla_AsigncionRecursos').html(rt);
             }  
         });
     }


    function solicitud_requisicion() {  
       
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=1',
            data: {},
            success:function(rt){
                $('#solicitar_requisicion').html(rt); 
            }  
        }) .done(function() {
            buscar_clasificacion_material('selectMaterialRequisicion');
            $('#selectMaterialRequisicion3')[0].reset(); pluggin(3);
        });
    }

    function planificar_requisicion(desicion, requis, valor) {


        if (desicion == 1) {          

            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=16',
                data: {num:0, requis:requis},
                success:function(rt){
                    $('#requisiciones_actividades').html(rt);
                }  
            });

            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=16',
                data: {num:1, requis:requis},
                success:function(rt){
                    $('#requisiciones_subentregable').html(rt);
                }  
            });

            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=16',
                data: {num:2, requis:requis},
                success:function(rt){
                    $('#requisiciones_embarcaciones').html(rt);
                }  
            }).done(function() {
                pluggin(7);    
                $('#planificar_requisicion').modal('show');
                if (valor != 0 ) {
                   $('#aceptar_planifiRequisi').attr("onClick", "planificar_requisicion(2,'"+requis+"',1)");  
                }else{$('#aceptar_planifiRequisi').attr("onClick", "planificar_requisicion(2,'"+requis+"',0)");}
                
            });
        }

        if (desicion == 2) {

            var datos = $('#formulario_planificacion').serialize()+"&nro_requisicion="+requis;
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=17',
                data: datos,
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            }) .done(function() {
                $('#planificar_requisicion').modal('hide');
                    if (valor == 1) {ver_requisicion(requis);}
            });
        }
    }

    function ver_requisicion(requisicion) {
        
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=10',
            data: {num:requisicion},
            success:function(rt){
                $('#ver_requisicion').html(rt);
                tabla_requisicion(requisicion);
            }  
        }) .done(function() {   

            

            $('#lista_requisicion').hide(); 
            $('#banner_planiRequi').show();
            $('#ver_requisicion').show(); 
        });

        setTimeout(function(){ 
            $('.ocult').addClass('hidden');
            $('.sk-loading ').removeClass('sk-loading')
            }, 2000);
            
            $('#guardar_requisicion').attr('disabled', 'true');
    }

    function modificar_requisicion(a) {
        
        var aux = "numero="+$('#numero_solicitRe').val()+"&item="+a;
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=2',
            data: aux,
            success:function(rt){
                $('#Modificar_Requisicion').html(rt);
            }  
        }) .done(function() {
            $('#Modificar_Requisicion').modal('show');
        });
        
     }

    function requisicionesPorAprobar_procura() { 

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=9',
            data: '',
            success:function(rt){
                $('#tabla_ListaCotizacion').html(rt);
            }  
        });
            pluggin(5);
    }


    function aceptar_requisicion_1(c) {
        var aux = "numero="+$('#numero_solicitRe').val()+"&item="+c+"&cantidad="+$('#cantidadModificada').val();
        $.ajax({
             type: 'POST',
             url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=8',
             data: aux,
             success:function(rt){
                 $('#resultado').html(rt);
             }  
         }) .done(function() {
            tabla_requisicion($('#numero_solicitRe').val());
            $('#Modificar_Requisicion').modal('hide'); 
         }); 
     }

    function cancelar_requisicion() {
        swal({
            title: "ALERTA",
            text: "¿Seguro que deseas cancelar la Requisicion?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, Seguro",
            closeOnConfirm: false
        }, function () {
            $('.sweet-overlay').remove();
            $('.sweet-alert').remove();
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=3',
                data: {},
                success:function(rt){
                    $('#resultado').html(rt);
                    $('#requisicion_materiales').hide(); $('#actividad_de_paquete').show();
                    $('#asignar_recursos').hide();
                }  
            }) .done(function() {
                toastrNav('Cancelada',3);
            });
        });  
     }
     
    function agg_Requisicion(a) {

        var serial=$('#selectMaterialRequisicion3').serialize()+"&numero="+a;
        var aux = true; 

        if ($('#cantidad2').val().trim() === '') { aux= false;
            toastrNav('Ingrese Cantidad',3); 
        }
        if($('#selectMaterialRequisicion').val()== '0'){ aux= false;
            toastrNav('Seleccione un Material',3); 
        }
                console.log(serial);
        if (aux == true) {
             $.ajax({
                 type: 'POST',
                 url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=5',
                 data: serial,
                 success:function(rt){
                     $('#resultado').html(rt);
                 }  
             }) .done(function() {
                 tabla_requisicion(a);
            });
        }           
     }
   
    function tabla_requisicion(requisicion) {
         $.ajax({
             type: 'POST',
             url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=4',
             data: {aux:requisicion}, 
             success:function(rt){
                 $('#tabla_requisicion').html(rt);
             }  
         });
     }

    function tabla_TodasRequisiciones() { 
         $.ajax({
             type: 'POST',
             url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=14',
             data: '',
             success:function(rt){
                 $('#tabla_TodasRequisiciones').html(rt);
             }  
         }) .done(function() {
             pluggin(5);
         });
     }

    function eliminar_datosRequisicion(a) {
         var aux = $('#numero_solicitRe').val();
         swal({
             title: "ALERTA",
             text: "¿Seguro que deseas Eliminar este Material?", 
             showCancelButton: true,
             confirmButtonColor: "#DD6B55",
             confirmButtonText: "Si, aceptar",
             closeOnConfirm: false
         }, function () {
             $('.sweet-overlay').remove();
             $('.sweet-alert').remove();
             $.ajax({
                 type: 'POST',
                 url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=7',
                 data: {a, aux},
                 success:function(rt){
                     $('#resultado').html(rt);
                 }  
             }) .done(function() { 
                tabla_requisicion(aux);
             });
         });
     }

    function agregar_edt(b) { // MODALES PARA LA AGREGAR EDT

        if (b == 1 || b == 3 || b == 2){

            if (b == 1){
                var modal='#agg_sub_entregable';
            }if (b == 2){
                var modal='#Paquete_Trabajo';
            }if (b == 3){
                var modal='#agg_actividades';
            }

            $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarSubEntregable.php?opcion=6',
                    data: {aux:b},
                    success:function(rt){
                        $('#modales_edt').html(rt); $(modal).modal('show');
                        }  
                });

        }if (b < 1 || b > 3){
            swal({
                title: "Alerta de Seguridad",
                text: "Se ha detectado un elemento sospecho en el sistema, vuelva a iniciar session",
                type: "error",
            });
            
            setTimeout(function(){ 
                window.location.href = "../error.php";
            }, 5000);
         }
     }

    function aceptar_edt(d) { // BTN ACEPTAR - AGG EDTS
        
        if (d < 1 || d > 3){
            swal({
                title: "Alerta de Seguridad",
                text: "Se ha detectado un elemento sospecho en el sistema, vuelva a iniciar session",
                type: "error",
            });
            
            setTimeout(function(){ 
                window.location.href = "../error.php";
         }, 5000);
        }else{

            if (d == 1){var formulario2 = '#formulario_subentregable';  var modal='#agg_sub_entregable';}
            if (d == 2){var formulario2 = '#formulario_paquete';        var modal='#Paquete_Trabajo';}
            if (d == 3){var formulario2 = '#formulario_actividades';    var modal='#agg_actividades';}
            
            if (validar_textArea('textoPaquete',400, 1) == true) { var serial = $(formulario2).serialize()+"&num="+d;
                
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarSubEntregable.php?opcion=1', 
                    data: serial,
                    success:function(rt){
                        $('#resultado').html(rt);
                        }  
                })
                .done(function() {
                    $(modal).modal('hide');
                    editar_edt(d,1);
                    mostrar_edt_tabla(d);
                }); 
            }  
        }
     }

    function modif_edt(a,b) { //MODIFICAR EDT

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSubEntregable.php?opcion=8',
            data: {a:a,b:b},
            success:function(rt){
                $('#modificar_edt1').html(rt);
            }  
        })
        .done(function() {
            $('#modificar_edt').modal('show');
        });
     } 

    function delete_edt(a,b) {

        if (a == 1) {$name = "este SubEntregable?";}
        if (a == 2) {$name = "este Paquete de Trabajo?";}
        if (a == 3) {$name = "esta Actividad?";}

        swal({
            title: "Alerta",
            text: "¿Seguro que deseas eliminar "+$name, 
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si, aceptar",
            closeOnConfirm: false
        }, function () {    $('.sweet-overlay').remove(); $('.sweet-alert').remove();
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarSubEntregable.php?opcion=15',
                data: {a:a,b:b},
                success:function(rt){
                    $('#resultado').html(rt);
                }  
            });
        });
    }

    function editar_edt(d) { // EDITAR EDTS

        if (d == 1) {$('#g11').removeClass('hidden');} 
        if (d == 2) {$('#g12').removeClass('hidden');}
        if (d == 3) {$('#g13').removeClass('hidden');} 

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSubEntregable.php?opcion=7',
            data: {variable:d},
            success:function(responseText){
                $('#tabla_edt').html(responseText);
                $('#selectores_edt').hide();
                $('#tabla_edt').show();
            }  
        });
      } 

    function btn_modificar_edt(d) { // ACEPTAR MODIFICACION EDT

        var aux = validar_textArea('textoPaquete', 400, 1); 
        if (aux == true) {
            var serial = $('#formulario_modificar_edt').serialize()+"&aux="+d;
            console.log(serial);
            $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarSubEntregable.php?opcion=9', 
                    data: serial,
                    success:function(rt){
                        $('#resultado').html(rt);
                        }  
                })
                .done(function() {
                    $('#modificar_edt').modal('hide');
                    editar_edt(d,1);
            }); 
        }
     }

    function mostrar_edt_tabla(d) { // MOSTRAR LOS PAQUETES  y ACTIVIDADES DISPONIBLES EN UNA TABLA
        
        if (d == 2) {
            var resp = '#mostrar_paquetes';
        } if (d == 3) {
            var resp = '#mostrar_actividades';
        }

        $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarSubEntregable.php?opcion=5',
                data: {aux:d},
                success:function(rt){ 
                    $(resp).html(rt); pluggin(4, 200);
                    }  
        });
        
        buscar_actividad_paquete('select_Paquetes_trabajo', 2);
        buscar_actividad_paquete('select_actividades', 3);
        buscar_actividad_paquete('select_actividades_2', 3);
     }

    function buscar_actividad_paquete(div, desicion) {
        
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSubEntregable.php?opcion=10',
            data: {aux:desicion},
            success:function(rt){
                $('#'+div).html(rt);
                }  
        });  
     }

    function añadir_actividadesEnPaquete(a) {

        var serial = "id_paquete="+paquete2+"&SubEntregable="+SubEntregable+"&Actividad="+a;
            console.log(serial);
        $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarActividades_Paquete.php?opcion=3',
                data: serial,
                success:function(rt){
                    $('#añadir_actividadEnpaquete').html(rt);
                    }  
        }).done(function() {
            $('#agg_actividadenPaquete').modal('show');
            pluggin(2);
        }); 
    }

    function aceptar_ActividadesEnpaquete() {

        var serial = $('#formulario_ActividadesEnPaquete').serialize(); console.log(serial);
        $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarActividades_Paquete.php?opcion=1',
                data: serial,
                success:function(rt){
                    $('#resultado').html(rt);
                    }  
        }).done(function() {
        });
    }

    function añadir_paquete_actividades(a, decision) { //ARBRI EL MODAL AL AGG UN PAQUETE & ACTIVIDAD
        var serial = "decision="+decision+"&id_paquete="+a+"&SubEntregable="+SubEntregable;

        if (decision == 2) { $(".nombrePaquete-Activi").html("Añadir Paquete de Trabajo");
            var ruta = '../../../controlador/gestionarSubEntregable_Paquete.php?opcion=3';
            
        }if (decision == 3) { $(".nombrePaquete-Activi").html("Añadir Actividades de Trabajo");
            var ruta = '../../../controlador/gestionarSubEntregable_Actividad.php?opcion=3';
        }

        $.ajax({
                type: 'POST',
                url: ruta,
                data: serial,
                success:function(rt){
                    $('#añadir_paquete_actividades').html(rt);
                    }  
        }).done(function() {
            $('#agg_Paquete_Trabajo').modal('show');
            pluggin(2);
        }); 

        mostrar_paquetes_pantalla(decision);
     }

     function mostrar_subEntregable() { //MOSTRAR SUB ENTREGABLES 
        
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarEmbarcacion_subentregable.php?opcion=2', 
            data: '',
            success:function(rt){
                $('#mostrar_subEntregables').html(rt);
            }  
        })
        .done(function() {
            pluggin(2);
        });
     }

    function mostrar_paquetes_pantalla(decision) {

        // var yu = "SubEntregable="+SubEntregable; 
    
        if (decision == 2) {
            var ruta = '../../../controlador/gestionarSubEntregable_Paquete.php?opcion=4';
            $('#g7').removeClass('hidden'); $('#g8').addClass('hidden');
        }else{
            var ruta = '../../../controlador/gestionarSubEntregable_Actividad.php?opcion=4';
            $('#g8').removeClass('hidden'); $('#g7').addClass('hidden');
        }
            $.ajax({
                type: 'POST',
                url: ruta,
                data: {SubEntregable:SubEntregable},
                success:function(rt){
                    $('#mostrar_paquetesActivi_pantalla').html(rt);
                }  
            })
            .done(function() {
                
            }); 
        
     }

     function actividadesPaquetes_pantalla(a) {
        
        var yu = "SubEntregable="+SubEntregable+"&Paquete_Trabajo="+a;

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarActividades_Paquete.php?opcion=4',
            data: yu,
            success:function(rt){
                $('#actividad_de_paquete_pantalla').html(rt);
            }  
        })
        .done(function() {
                
          });  
     }

     function aggActivi_paquet(a) { paquete2 = a;

         $('#paquete_actividades').hide(); 
         $('#actividad_de_paquete').show(); $('#g7, #g9').removeClass('hidden');

        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarSubEntregable.php?opcion=13',
            data: '',
            success:function(rt){   actividadesPaquetes_pantalla(a);
                $('#actividades_paquetes_mostr').html(rt);
            }  
        });         
     }

    function btnEntrarSubEn(a) {
        SubEntregable = a; 
        $('#paquete_actividades').show();
        $('#mostrar_subEntregables').hide();$('#btn-newSubEntregable').hide();
       mostrar_paquetes_pantalla(2);
       $('#g7').removeClass('hidden');
    }

    function aceptar_Paquete_Activi(decision) {

            p = true;
            // if ($('#FechaEstipulada').val().trim() === ''){toastrNav('Seleccione una Fecha', 3); p = false;}
            // if ($('#DiasEstipulados').val().trim() === ''){toastrNav('Ingrese un Dia', 3); p = false;}

        if (p == true) {
            if (decision == 2) {
            var ruta = '../../../controlador/gestionarSubEntregable_Paquete.php?opcion=1';
            var resett = '#agg_formulario_paquete';

            }if (decision == 3) {
                var ruta = '../../../controlador/gestionarSubEntregable_Actividad.php?opcion=1';
                var resett = '#formulario_Paquete_Activi';
            }
                var serial = $('#formulario_Paquete_Activi').serialize();
                $.ajax({
                    type: 'POST',
                    url: ruta,
                    data: serial,
                    success:function(responseText){
                        $('#resultado').html(responseText);
                    }  
                }).done(function() {  mostrar_paquetes_pantalla(decision); $(resett)[0].reset();}); 

        }
    }



    $(document).ready(function() { 

        $('#editar_requisicion').click(function() {
            $('.ocult').removeClass('hidden');
            $('#editar_requisicion').addClass('btnActivo');
            $('.guardar_requisicion').removeAttr('disabled').attr('id', 'guardar_requisicion');
        });
        $('#guardar_requisicion').click(function() {
            $('.ocult').addClass('hidden');
            $('#editar_requisicion').removeClass('btnActivo');
            toastrNav('Requisición Guardada', 1);
            $('#guardar_requisicion').attr('disabled', 'true').removeAttr('id');
        });

        $('#AceptarPaquete').click(function() { // BTN ACEPTAR PAQUETE DE TRABAJO 
           
            var aux = validar_textArea('textoPaquete', 400, 1);

            if (aux == true) {
                var serial = $('#formulario_paquete').serialize()+"&tipo_edt="+$('#tipo_edt').text();
               
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarSubEntregable.php?opcion=2',
                    data: serial,
                    success:function(responseText){
                        $('#resultado').html(responseText);
                        }  
                })
                .done(function() {
                    $('#Paquete_Trabajo').modal('hide');
                    mostrar_paquete();
                }); 
            }  
         });

        $('#agg_AceptarPaquete').click(function() {
          
            var serial = $('#agg_formulario_paquete').serialize()+"&PorcentajeEstipulado=50"+
              "&SubEntregable=2"+"&Paquete=1"+"&Embarcacion=100"+"&Proyecto=1";
            console.log(serial);
            $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarSubEntregable_Paquete.php?opcion=1',
                    data: serial,
                    success:function(responseText){
                        $('#resultado').html(responseText);
                        }  
                })
                .done(function() {
                    $('#agg_Paquete_Trabajo').modal('hide');
                    // mostrar_paquete();
                    $('#agg_formulario_paquete')[0].reset();
                }); 

         });

        $('#btn-newSubEntregable').click(function() { 
            
            $('#form_SubEntregable')[0].reset();

            buscar_actividad_paquete('consultaSubentregable', 1);

            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarEmbarcacion_subentregable.php?opcion=3',
                data: '',
                success:function(rt){
                    $('#resultado').html(rt); pluggin(2);pluggin(3); 
                    $('#select_subentregable').modal('show');
                }  
            });
            
         });

        $('#mostrar_subEntregables').on('click', '#agregar_subEntregable', function() {
 
            if ($('#subAUX').val() == 1) {
                swal({
                    title: "Alerta",
                    text: "No existen sub entregables registrado, ¿desea registrar uno?",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, registrar",
                    cancelButtonText: "No, cancel",
                    closeOnConfirm: false,
                    closeOnCancel: false },
                function (isConfirm) {
                    if (isConfirm) { $('.sweet-alert').remove(); $('.sweet-overlay').remove();
                        agregar_edt(1);
                       $('#subAUX').attr('value', '0'); 
                    } else {$('.sweet-overlay').remove();   $('.sweet-alert').remove();}
                });

            }else{ 

                $('#form_SubEntregable')[0].reset();
                
                buscar_actividad_paquete('consultaSubentregable', 1);             

                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarEmbarcacion_subentregable.php?opcion=3',
                    data: '',
                    success:function(rt){
                        $('#resultado').html(rt); pluggin(2);
                    }  
                }).done(function() {  pluggin(3); 
                    $('#select_subentregable').modal('show');
                });
                
            }
        });


        $('#aceptar_subentregable').click(function() { //BTN ACEPTAR SUB ENTREGABLE A EMBARCACION

            p = true;
            if ($('#consultaSubentregable').val() == ''){toastrNav('Seleccione un SubEntregable', 3); p = false;}
            if ($('#FechaEstipulada').val().trim() === ''){toastrNav('Seleccione una Fecha', 3); p = false;}
            if ($('#DiasEstipulados').val().trim() === ''){toastrNav('Ingrese un Dia', 3); p = false;}

            if (p = true) {
                
                var serial = $('#form_SubEntregable').serialize()+"&SubEntregable="+$('#consultaSubentregable').val();
                console.log(serial);
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarEmbarcacion_subentregable.php?opcion=1',
                    data: serial,
                    success:function(rt){
                        $('#consultaSubentregable').html(rt);
                    }  
                })
                .done(function() {
                    mostrar_subEntregable();
                });
            } 
        });

        $('#anadir_Arecursos').click(function() {
            
            var serial=$('#form_AsignarRecursos').serialize()+"&"+$('#form_AsignarRecursos2').serialize();
            var aux = true; 

            if ($('#cantidad2').val().trim() === '') { aux= false; toastrNav('Ingrese Cantidad',3);}
            if ($('#materialesRecursos').val() == '-1') { aux= false; toastrNav('Ingrese Material',3);}
            
            console.log(serial);

            if (aux == true) {
                 $.ajax({
                     type: 'POST',
                     url: '../../../controlador/gestionarSubEntregable.php?opcion=3',
                     data: serial,
                     success:function(rt){
                         $('#resultado').html(rt);
                     }  
                 }) .done(function() {
                     tabla_AsignacionRecursos($('#num_Recurso').val());
                });
            }     
        });

        $('#aceptar_recursosA').click(function() {
            
            if (validar_textArea('textoRecursosAsig',600, 2) == true){
                swal({
                    title: "Alerta",
                    text: "¿Desea Asignar Estos Recursos a la Actividad?", 
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, aceptar",
                    closeOnConfirm: false
                }, function () {    $('.sweet-overlay').remove(); $('.sweet-alert').remove();
                    
                    var serial =    "recurso="+$('#num_Recurso').val()+"&texto="+
                                    $('#textoRecursosAsig').val();
                    
                    $.ajax({
                        type: 'POST',
                        url: '../../../controlador/gestionarSubEntregable.php?opcion=12',
                        data: serial,
                        success:function(rt){
                            $('#resultado').html(rt);
                        }  
                    }) .done(function() { 
                        $('#asignar_recursos').hide();
                        $('#actividad_de_paquete').show();});

                });
            }


        });

        $('#solicitar_requisicion').on('click', '#aceptar_requisicion', function() {

            var aux = validar_textArea('textoRequisicion', 600, 2); 
            if (aux == true) {
                swal({
                    title: "ALERTA",
                    text: "Seguro que deseas agregar esta requisicion?", 
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, aceptar",
                    closeOnConfirm: false
                }, function () {  $('.sweet-overlay').remove(); $('.sweet-alert').remove();
                    
                    var serial = "numero="+$('#numero_solicitRe').val()+"&texto="+$('#textoRequisicion').val();
                    $.ajax({
                        type: 'POST',
                        url: '../../../controlador/gestionarSolicitud_requisicion.php?opcion=6',
                        data: serial,
                        success:function(rt){
                            $('#resultado').html(rt);solicitud_requisicion();
                        }  
                    });
                });
            }

            
        });

        $('#solicitar_requisicion').on('click', 'select#selectMaterialRequisicion', function() {
            var a = $(this).val();
            if (a != -1) {
                buscar_material(a,'selectMaterialRequisicion2');
                $('#selectMaterialRequisicion2, #cantidad2, #anadir').removeAttr('disabled');
            }else{$('#selectMaterialRequisicion2, #cantidad2, #anadir').attr('disabled', 'true');}
        });


        $('select#selectMaterialRequisicion2').change(function() {
            var a = $(this).val();
            console.log(a);

        });

        $('select#clasificacionRecursos').change(function() {
            var a = $(this).val(); 
            if (a != -1) {
                buscar_material(a, 'materialesRecursos');
                $('#materialesRecursos, #cantidad2, #anadir_Arecursos').removeAttr('disabled');
            }else{$('#materialesRecursos, #cantidad2, #anadir_Arecursos').attr('disabled', 'true');}

            
        });

        $('select#select_Paquetes_trabajo').change(function() {
            var a = $(this).val();
            añadir_paquete_actividades(a,2);
         });
        $('select#select_actividades').change(function() {
            var a = $(this).val();
            añadir_paquete_actividades(a,3);
            console.log("select_actividades");
         });
        $('select#select_actividades_2').change(function() {
            var a = $(this).val();
            añadir_actividadesEnPaquete(a);
         });
    
    });

/* -- -----------------------------------------------------
   -- DEPARTAMENTO DIRECCION DE PROYECTOS 
-- --------------------------------------------------------  */


    $(document).ready(function() {

        $('.close-link').on('click', function () {
            var content = $(this).closest('div.ibox');
            content.remove();
        });

        $('#cerrar_detalles, #cerrar_detalles2').click(function() {
            $('#lista_requisiciones333').hide(); $('#lista_requisiciones').show();
        });
        
    });

/* -- -----------------------------------------------------
   -- DEPARTAMENTO DE GERENCIA GENERAL
-- --------------------------------------------------------  */
   
    $(document).ready(function() {

        $('#registrar_proyecto').on('change', 'select#select_registrarProyecto', function() {
            selectRegistrarProyecto = $(this).val();
            console.log(selectRegistrarProyecto);
        });
        
    });
    

/* -- -----------------------------------------------------
   -- DEPARTAMENTO DE PROCURA PRUEBA
-- --------------------------------------------------------  */

    /*------------AREA PROCURA-------------*/

    $(document).ready(function(){

        $('#materiales').on('click', '#agg_materiales', function() { 
            
            var aux = $('#auxiliar').val()
            $.ajax({
                type: 'POST',
                url: '../../../controlador/gestionarMateriales.php?opcion=3',
                data: {aux},
                success:function(rt){
                    $('#agg_materialesModal').html(rt);
                }  
            }) .done(function() {
                $('#agg_materialesModal').modal('show');
            });
        });

        // $('#agg_materialesModal').on('click', '#guardar_aggMateriales', function() {
        //     var serial = $('#formulario_aggMateriales').serialize();
        //     $.ajax({
        //         type: 'POST',
        //         url: '../../../controlador/gestionarMateriales.php?opcion=1',
        //         data: serial,
        //         success:function(rt){
        //             $('#resultado').html(rt);
        //         }  
        //     });
        // });

        


        $('#aceptar_material').click(function() {
                var form = $('#form05').serialize();
                console.log(form);
            });

        $('#btnModificar01').click(function() {
            $('#modal_aggClasificacion').modal('show');
                 
        });

        $('select#clasificacion_material_1').on('change',function(){
            aux_pb = $(this).val();
        });

        $('#g6').click(function() {
            $('#paquete_actividades').hide(); $('#g7, #g9, #g8, #g14 ').addClass('hidden');$('#btn-newSubEntregable').show();
            $('#mostrar_subEntregables').show(); $('#actividad_de_paquete').hide();
            $('#asignar_recursos').hide();
        });

        $('#g7').click(function() {
            $('#actividad_de_paquete').hide(); $('#paquete_actividades').show();
            $('#g9, #g14' ).addClass('hidden');
            $('#asignar_recursos').hide();
        });

        $('#g9').click(function() {
            console.log($('#esclavo').val());

            $('#g14').addClass('hidden'); 
            $('#actividad_de_paquete').show();$('#asignar_recursos').hide();
            $('#esclavo').attr('value', 'false');
        });

        $('#g10').click(function() {
            $('#selectores_edt').show(); 
            $('#tabla_edt').hide(); $('#g11, #g12, #g13').addClass('hidden');
        });

        $('#g15').click(function() {
            $('#g16').addClass('hidden'); $('#index').show();
        });

        $('#g17').click(function() {
           $('#g18').addClass('hidden'); $('#requisicion').show();
        });

    });
         
    
/* -- -----------------------------------------------------
   -- FUNCIONES COMPARTIDAS
-- --------------------------------------------------------  */

    function botones_opcionales(expresion) {
        
        switch (expresion) {
            
            case 1: 

                $('#ver_requisicion').hide();
                $('#banner_planiRequi').hide();
                $('#lista_requisicion').show();

             break;

            case 2:

                $('#index_presupuesto').hide();
                $('#index_partida').show();

             break;

            case 3:

                var data = "partida="+$('#partidaNumero').val()+"&desicion="+1;
                $.ajax({
                    type: 'POST',
                    url: '../../../controlador/gestionarPartida.php?opcion=20',
                    data: data,
                    success:function(rt){
                        $('#resultado').html(rt);
                    }  
                }) .done(function() { ver_partidas();
                    $('#index_presupuesto').hide();
                    $('#index_partida').show();
                });
             break;

            case 4:

                $('#tabla_edt').hide();
                $('#selectores_edt').show();
                $("[id*=g1]").addClass('hidden');
                $('#g10').removeClass('hidden');

             break;

            case 5:

                $('#materiales').hide();
                $('#index').show();

                $('#g16').addClass('hidden');
                $('#g15').removeClass('hidden');

             break;

            case 6: // NUEVO ARMADOR

                $('#registrar_proyecto').modal('hide');
                $('#registrar_armador').modal('show');

             break;

        default:break;
        
        }   
    }
    

    function cancelar_tabla(expresion){ 
        
        switch (expresion) {
            
            case 1: 

                swal({
                    title: "Alerta",
                    text: "¿Desea Cancelar este Presupuesto?", 
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, aceptar",
                    closeOnConfirm: false
                }, function () {    $('.sweet-overlay').remove(); $('.sweet-alert').remove();
                    var serial= "partida="+$('#num_partida').val()+"&presupuesto="+$('#num_presupuesto').val();
                    $.ajax({
                        type: 'POST',
                        url: '../../../controlador/gestionarPartida.php?opcion=11',
                        data: serial,
                        success:function(rt){
                            $('#resultado').html(rt);
                        }  
                    });
                });
                      
                break;

            case 2:

                swal({
                    title: "Alerta",
                    text: "¿Deseas Cancelar la Partida?",
                    type: "warning", 
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, aceptar",
                    closeOnConfirm: false
                }, function () {    $('.sweet-overlay').remove(); $('.sweet-alert').remove();
                    
                    var serial = "partida="+$('#partidaNumero').val();
                    $.ajax({
                        type: 'POST',
                        url: '../../../controlador/gestionarPartida.php?opcion=22',
                        data: serial,
                        success:function(rt){
                            $('#resultado').html(rt);
                        }  
                    });
                });

                break;
    
            default:break;
        }
    }

    function eliminar_datos(expresion){ 
        
        switch (expresion) {
            
            case 1: 

                $('#modal_presupuesto').modal('hide');

                swal({
                    title: "Alerta",
                    text: "¿Desea eliminar este Presupuesto?", 
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, aceptar",
                    closeOnConfirm: false
                }, function () {    $('.sweet-overlay').remove(); $('.sweet-alert').remove();
                    var serial = "partida="+$('#detallesPresu_Partida').val()+"&iden="+$('#detallesPresu_item').val();
                    $.ajax({
                        type: 'POST',
                        url: '../../../controlador/gestionarPartida.php?opcion=21',
                        data: serial,
                        success:function(rt){
                            $('#resultado').html(rt);
                            tabla_presupuesto($('#detallesPresu_Partida').val(),1);
                        }  
                    });
                });

                

                break;

            case 2:

                break;

            case 3: 
            
                break;

            case 4:

                break;
    
            default:break;
        }
    }


    function navtop(ruta) {
        $.ajax({
            type: 'POST',
            url: '../../../controlador/gestionarNav.php?opcion='+ruta,
            data: {ruta},
            success:function(rt){
                $('.listadoAlertas').html(rt);
            }  
        }) .done(function() {
            
        });
     }  


    function spinnerFUN(div) {
        $.ajax({
            type: 'POST',
            url: '../../../controlador/constructor.php?opcion=8',
            data: '',
            success:function(rt){
                $('#'+div).html(rt);
            }  
        });
     }

    function validar_textArea(id, max, desicion) { // VALIDAR TEXT AREAS. 
        
        var p; var texto = '#'+id;

        if ($(texto).val().length <= max) {p = true;}
            else{toastrNav('El campo requerido tiene que ser menor a '+max+' caracteres', 2); p = false;}

        if ($(texto).val().trim() === '' && desicion == 1){toastrNav('El campo no puede estar vacio', 2);p = false;}

        return p; 
     }
    
    function toastrNav(mensaje, desicion) {
        
        if (desicion == 1) {var desicion = toastr.success(mensaje, '');}
        if (desicion == 2) {var desicion = toastr.warning(mensaje, '');}
        if (desicion == 3) {var desicion = toastr.error(mensaje, '');}
        if (desicion == 4) {var desicion = toastr.info(mensaje, '');}
        
        setTimeout(function() {
            toastr.options = {
                closeButton: true,
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 4000
            };
            desicion;
        }, 1300);
     }

    function pluggin(expresion, num) {
        
        switch (expresion) {
            
            case 1: // DATA PICKERS
                $('#data_1 .input-group.date').datepicker({
                    todayBtn: "linked",
                    keyboardNavigation: false,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true
                });
                break;

            case 2: // DIAL 
                $(".dial").knob({
                      'format' : function (value){
                        return value + '%';
                      } 
                });
                break;

            case 3: // SELECT
                $(".select2_demo_3").select2({
                    placeholder: "buscar",
                     allowClear: true
                });

                $(".select2_demo_2").select2();

                break;

            case 4: 
                $('.scroll_content').slimscroll({
                        height: num+'px'
                })

                break;

            case 5: // FOOTABLE 
                $ ('.footable').footable();
                $ ('.footable2').footable();
                break;

            case 6: // SLICK
                
                $('.slick').fadeIn(3000).slick({
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      autoplay: true,
                      autoplaySpeed: 2000,
                      responsive: [
                        {
                              breakpoint: 1024,
                              settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: true
                            }
                        },
                        {
                          breakpoint: 700,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                        }
                      ]
                });

                break;

            case 7:

                $('.chosen-select').chosen({width: "100%"});
                $('.chosen-select').val('').trigger("chosen:updated");

                break;

            case 8:
                
                $('.slick_demo_2').slick({
                      dots: true,
                      infinite: true,
                      autoplay: true,
                      autoplaySpeed: 2000,
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                    });
                

                
                break;
                
            default:break;
        }
    }


