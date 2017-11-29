//*----Ejecuccion de las funciones ----*
$(function(){
  obtnCiudad();
  obtnTipo();
})

//Funcion para mostrar todas las propiedades sin filtro.
$('#mostrarTodos').on('click', function(){
  buscarItem(false);
})

//Funcion para utilizar filtro de busqueda.
$('#formulario').on('submit', function(event){
  event.preventDefault();
  buscarItem(true);
})

//Funcion para obtener las ciudades en el input
function obtnCiudad(){
  $.ajax({
    url:'./ciudad.php',
    type: 'GET',
    data:{},
    success:function(ListaCiudades){
      ListaCiudades = validarJson(ListaCiudades, 'Ciudad')
      $.each(ListaCiudades, function( index, value ) {
        $('#selectCiudad').append('<option value="'+value+'">'+value+'</option>')
      });
    }
  })
}

//Funcion que trae el tipo de propiedad a buscar para los filtros.
function obtnTipo(){
  $.ajax({
    url:'./tipo.php',
    type: 'GET',
    data:{},
    success:function(tipoList){
      tipoList = validarJson(tipoList, 'Tipo')
      $.each(tipoList, function( index, value ) {
        $('#selectTipo').append('<option value="'+value+'">'+value+'</option>')
      });
    },
  }).done(function(){
    $('select').material_select(); //Funcion que habilita el select
  })
}

function validarJson(validarJson, lista){
  try {
    var validarJson = JSON.parse(validarJson)
    return validarJson
  } catch (e) {
    obtnError('','SyntaxError '+lista);
    }
}

function buscarItem(filtrar){
  if($('.colContenido > .item') != 0){
    $('.colContenido > .item').detach()
  }
  var filtro = obtFiltros(filtrar)
  $.ajax({
    url:'./buscador.php',
    type: 'GET',
    data:{filtro},
    success:function(items, textStatus, errorThrown ){

      try {
        item = JSON.parse(items);
      } catch (e) {
        obtnError(500,'SyntaxError');
      }

      $.each(item, function(index, item){
        $('.colContenido').append(
          '<div class="col s12 item">'+
            '<div class="card itemMostrado">'+
              '<img src="./img/home.jpg">'+

                  '<div class="card-content">'+
                    '<p><b>Direccion: </b>'+item.Direccion+'</p>'+ //Obtener el valor de la propiedad Direccion del objeto
                    '<p><b>Ciudad: </b>'+item.Ciudad+'</p>'+ //Obtener el valor de la propiedad Ciudad del objeto
                    '<p><b>Teléfono: </b>'+item.Telefono+'</p>'+ //Obtener el valor de la propiedad Teléfono del objeto
                    '<p><b>Código postal: </b>'+item.Codigo_Postal+'</p>'+ //Obtener el valor de la propiedad Código Postal del objeto
                    '<p><b>Tipo: </b>'+item.Tipo+'</p>'+ //Obtener el valor Tipo del  objeto
                    '<p><b>Precio: </b><span class="precioTexto">'+item.Precio+'</span></p>'+ //Obtener el valor de la propiedad Precio del objeto
                  '</div>'+
                  '<div class="card-content" >'+ 
                  '<span class="card-title activator grey-text text-darken-4">Ver Más<i class="material-icons right">more_vert</i></span>'+
                  '</div>'+
                  '<div class="card-reveal">'+
                  '<span class="card-title grey-text text-darken-4">Informacón Adicional<i class="material-icons right">close</i></span>'+
                  '<p>Todas nuestras propiedades pueden ser habitables de inmediato, se encuentran en los lugares mas privilegiados  y listas para la entrega, esperamos cumplir con sus espectativas.</p>'+
                  '</div>'+
                '</div>'+
            '</div>'+
          '</div>'
        )
      })
    },
  }).done(function(){ //Acciones a realizar si la información fue procesada correcatmente
    var totalItems = $('.colContenido > .item').length //Contar cuantos items devuelve la consulta
    $('.tituloContenido.card > h5').text("Resultados de la búsqueda: "+ totalItems + " items" ) //Mostrar la cantidad de items devueltos por la consulta
  }).fail(function( jqXHR, textStatus, errorThrown ){ //Acciones a realizar si existen errores en el envío de la información
      obtnError(jqXHR, textStatus) //Mostrar mensaje de error al usuario
  })
}

function obtFiltros(filtrar){
  var rango = $('#rangoPrecio').val(), //Obtener los valores maximos y minimos del input
  rango = rango.split(";") //separar los valores en un array

  if (filtrar == false){ //Verificar si no se aplicaran filtros Asignar valores vacios
    var obtnCiudad = '',
        obtnTipo = '',
        obtnPrecio = ''
  }else{
    var obtnPrecio = rango,
        obtnCiudad = $('#selectCiudad option:selected').val(),
        obtnTipo = $('#selectTipo option:selected').val()
  }

    var filtro = {
      Precio:obtnPrecio,
      Ciudad: obtnCiudad,
      Tipo: obtnTipo
    }

  return filtro;
}
