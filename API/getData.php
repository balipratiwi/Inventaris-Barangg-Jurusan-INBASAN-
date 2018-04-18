<?php
	include_once "connect.php";
	
	$sql = "SELECT * FROM inventaris";
	$query = mysqli_query($conn, $sql);

	$arrayinventaris  = array();
	while ($row = mysqli_fetch_array($query)){
		$arrayinventaris[] = $row; 
	}
	echo json_encode($arrayinventaris);
	mysqli_close($conn);
?>