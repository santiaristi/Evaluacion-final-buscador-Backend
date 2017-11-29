<?php
  require('./libreria.php');
  $filtroCiudad = $_GET['filtro']['Ciudad'];
  $filtroTipo = $_GET['filtro']['Tipo'];
  $filtroPrecio =  $_GET['filtro']['Precio'];
  $getData = leerDatos(); //Leer los datos

  filtrarDatos($filtroCiudad, $filtroTipo, $filtroPrecio,$getData);
 ?>
