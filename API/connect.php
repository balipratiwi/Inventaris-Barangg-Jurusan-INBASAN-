<?php
$servername = "localhost"; 
$username = "id5294925_inventaris";
$password = "inventaris"; 
$dbname = "id5294925_inventaris";
 
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname); 
// Check connection
if (!$conn) { 
    die("Connection failed: " . mysqli_connect_error());
}else{
	//echo "Koneksi berhasil";
} 
?> 