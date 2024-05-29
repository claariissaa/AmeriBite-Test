fetch('../json/vending-machine.json')
    .then(response => response.json())
    .then(data => {
        // Menginisialisasi DataTables dengan data yang diperoleh
        $('#dataset').DataTable({
            data: data,
            "columns": [
                { "data": "Status" },
                { "data": "Device_ID" },
                { "data": "Machine" },
                { "data": "Location" },
                { "data": "Product" },
                { "data": "Transaction" },
                { "data": "TransDate" },
                { "data": "Type" },
                { "data": "RCoil" },
                { "data": "RPrice" },
                { "data": "RQty" },
                { "data": "MCoil" },
                { "data": "MPrice" },
                { "data": "MQty" },
                { "data": "LineTotal" },
                { "data": "TransTotal" },
                { "data": "Prcd_Date" }
            ]
        });
    })
    .catch(error => console.error('Error fetching data:', error));
