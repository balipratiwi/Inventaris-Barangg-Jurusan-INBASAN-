<?php
 
	// Importing DBConfig.php file.
	include 'connect.php';
	 
	 // Getting the received JSON into $json variable.
	 $json = file_get_contents('php://input');
	 
	 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	$Kode = $obj['Kode'];
	$Nama = $obj['Nama'];
	$Jumlah = $obj['Jumlah'];
	$Kondisi = $obj['Kondisi'];

	 // Creating SQL query and insert the record into MySQL database table.
	$Sql_Query = "INSERT INTO inventaris (Kode,Nama,Jumlah,Kondisi) values ('$Kode','$Nama','$Jumlah','$Kondisi')";
	 
	 if(mysqli_query($conn,$Sql_Query)){
			$MSG = 'Inventaris berhasil diinput!' ;
			$json = json_encode($MSG);

			 echo $json ;
	 }
	 else{
			$MSG = 'Input gagal!' ;
			$json = json_encode($MSG);

			 echo $json ;
			
	 
	 }
	mysqli_close($con);
	
?>