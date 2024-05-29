// Lakukan pengambilan data vending machine dan proses grafik
fetch("../json/vending-machine.json")
  .then((response) => response.json())
  .then((data) => {
    //--------------------------------------------SCORECARD---------------------------------------------------------
    // Transaction Count
    const dataTransaction = data.length;

    const dataProduct = data.map(function (row) {
      return row.Product;
    });
    const countProduct = new Set(dataProduct).size;

    // Category Count
    const dataCategory = data.map(function (row) {
      return row.Category;
    });
    const countCategory = new Set(dataCategory).size;

    // Machine Count
    const dataMachine = data.map(function (row) {
      return row.Machine;
    });
    const countMachine = new Set(dataMachine).size;

    // Location Count
    const dataLokasi = data.map(function (row) {
      return row.Location;
    });
    const countLocation = new Set(dataLokasi).size;

    // Mendapatkan elemen HTML tempat kita akan menyisipkan nilai
    const countTransactionElement = document.getElementById("transaction");
    const countProductElement = document.getElementById("product");
    const countCategoryElement = document.getElementById("category");
    const countMachineElement = document.getElementById("machine");
    const countLocationElement = document.getElementById("location");

    // Menyisipkan nilai ke dalam elemen HTML
    countTransactionElement.textContent = dataTransaction;
    countProductElement.textContent = countProduct;
    countCategoryElement.textContent = countCategory;
    countMachineElement.textContent = countMachine;
    countLocationElement.textContent = countLocation;

    //--------------------------------------CHART-------------------------------------------------------------------
    // Grafik Number Of Products Per Machine
    const ctx2 = document.getElementById("myChart2").getContext("2d");
    const productCounts = {};
    data.forEach((item) => {
      const machineID = item.Machine;
      productCounts[machineID] = (productCounts[machineID] || 0) + 1;
    });
    const productLabels = Object.keys(productCounts);
    const productCountsValues = Object.values(productCounts);
    const chart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: productLabels,
        datasets: [
          {
            label: "Products per Machine",
            data: productCountsValues,
            backgroundColor: "rgba(255, 193, 7, 0.5)",
            borderColor: "rgba(255, 193, 7, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Number of Products per Machine",
            font: {
              size: 18,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });

    // Grafik Number of Products Per Category
    const ctx3 = document.getElementById("myChart3").getContext("2d");
    const categoryCounts = {};
    data.forEach((item) => {
      const category = item.Category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    const categoryLabels = Object.keys(categoryCounts);
    const categoryCountsValues = Object.values(categoryCounts);
    const chart3 = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Products per Category",
            data: categoryCountsValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              // "rgba(54, 162, 235, 0.5)",
              // "rgba(255, 206, 86, 0.5)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              // "rgba(54, 162, 235, 1)",
              // "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Number of Products per Category",
            font: {
              size: 18,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });

    // Grafik Number Of Distinct Product Per Location
    const productsPerLocation = {};
    data.forEach((item) => {
      const location = item.Location;
      productsPerLocation[location] = new Set(productsPerLocation[location]);
      productsPerLocation[location].add(item.Product);
    });

    const locationLabels = Object.keys(productsPerLocation);
    const productsCountPerLocation = Object.values(productsPerLocation).map(
      (set) => set.size
    );

    const ctx4 = document.getElementById("myChart4").getContext("2d");
    const chart4 = new Chart(ctx4, {
      type: "bar",
      data: {
        labels: locationLabels,
        datasets: [
          {
            label: "Number of Distinct Products per Location",
            data: productsCountPerLocation,
            backgroundColor: "rgba(144, 238, 144, 0.5)",
            borderColor: "rgba(144, 238, 144, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Number of Distinct Products per Location",
            font: {
              size: 18,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });

    // Grafik Average Transtotal Per Location
    const ctx5 = document.getElementById("myChart5").getContext("2d");
    const averageTransTotalPerLocation = {};
    const locationCount = {};
    data.forEach((item) => {
      const location = item.Location;
      const transTotal = parseFloat(item.TransTotal);
      averageTransTotalPerLocation[location] =
        (averageTransTotalPerLocation[location] || 0) + transTotal;
      locationCount[location] = (locationCount[location] || 0) + 1;
    });
    Object.keys(averageTransTotalPerLocation).forEach((location) => {
      averageTransTotalPerLocation[location] /= locationCount[location];
    });
    const locationLabels5 = Object.keys(averageTransTotalPerLocation);
    const averageTransTotalValues = Object.values(averageTransTotalPerLocation);
    const chart5 = new Chart(ctx5, {
      type: "bar",
      data: {
        labels: locationLabels5,
        datasets: [
          {
            label: "Average TransTotal per Location",
            data: averageTransTotalValues,
            backgroundColor: "rgba(230, 230, 250, 0.5)",
            borderColor: "rgba(230, 230, 250, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Average TransTotal per Location",
            font: {
              size: 18,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });

    //Grafik Sales Trend
    const salesTrendData = {};
    // Proses pengumpulan data sales trend
    data.forEach((item) => {
      const date = new Date(item.Prcd_Date);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const category = item.Category;
      const price = parseFloat(item.MPrice);
      const monthYear = `${month} ${year}`;

      if (!salesTrendData[category]) {
        salesTrendData[category] = {};
      }

      if (!salesTrendData[category][monthYear]) {
        salesTrendData[category][monthYear] = [];
      }

      salesTrendData[category][monthYear].push(price);
    });

    // Membuat list bulan dan tahun dalam urutan yang benar
    const monthsInOrder = [];
    for (let year = 2022; year <= 2023; year++) {
      for (let month = 0; month < 12; month++) {
        const monthName = new Date(year, month).toLocaleString("default", {
          month: "long",
        });
        monthsInOrder.push(`${monthName} ${year}`);
        // Memeriksa apakah sudah mencapai Januari 2023
        if (year === 2023 && month === 0) {
          break; // Keluar dari loop jika sudah mencapai Januari 2023
        }
      }
    }

    // Menghitung rata-rata harga produk per kategori per bulan
    const salesTrendLabels = Object.keys(salesTrendData);
    const salesTrendValues = {};
    salesTrendLabels.forEach((category) => {
      salesTrendValues[category] = [];
      monthsInOrder.forEach((monthYear) => {
        const prices = salesTrendData[category][monthYear] || [];
        const sum = prices.reduce((total, price) => total + price, 0);
        const averagePrice = prices.length ? sum / prices.length : 0;
        salesTrendValues[category].push(averagePrice);
      });
    });

    // Membuat grafik sales trend per kategori dengan tipe "line"
    const ctx6 = document.getElementById("myChart6").getContext("2d");
    const chart6 = new Chart(ctx6, {
      type: "line",
      data: {
        labels: monthsInOrder,
        datasets: Object.keys(salesTrendData).map((category, index) => ({
          label: category,
          data: salesTrendValues[category],
          fill: "origin",
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(0, 191, 255, 0.2)",
          ][index % 3],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(0, 191, 255, 1)",
          ][index % 3],
          borderWidth: 2,
        })),
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Sales Trend",
            font: {
              size: 18,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            precision: 2,
          },
        },
      },
    });

    //Grafik Transaction Count Per Mounth    
        // Mengumpulkan data transaksi per bulan dari Januari 2022 hingga Januari 2023
        const transactionDataPerMonth = {};
        for (let year = 2022; year <= 2023; year++) {
          const endMonth = year === 2023 ? 1 : 12; // Jika tahun 2023, berhenti di Januari
          for (let month = 0; month < endMonth; month++) {
            const date = new Date(year, month, 1);
            const monthName = date.toLocaleString("default", { month: "long" });
            const formattedMonth = `${monthName} ${year}`;
            // Inisialisasi jumlah transaksi untuk setiap bulan
            transactionDataPerMonth[formattedMonth] = 0;
          }
        }

        // Mengisi data transaksi yang sebenarnya
        data.forEach((item) => {
          const date = new Date(item.TransDate);
          const month = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear();
          // Mengecek apakah bulan dan tahun sesuai dengan rentang yang diinginkan
          if (year === 2022 || (year === 2023 && date.getMonth() === 0)) {
            const formattedMonth = `${month} ${year}`;
            // Meningkatkan jumlah transaksi untuk bulan yang sesuai
            transactionDataPerMonth[formattedMonth]++;
          }
        });

        // Memisahkan label bulan dan jumlah transaksi
        const labels = Object.keys(transactionDataPerMonth);
        const values = Object.values(transactionDataPerMonth);

        // Mendapatkan konteks dari elemen canvas pada HTML
        const ctx = document.getElementById("myChart7").getContext("2d");

        // Membuat grafik garis
        const transactionPerformanceChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Transaction Count Per Month",
                data: values,
                fill: false,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Transaction Count Per Month", // Judul grafik
                font: {
                  size: 18,
                  weight: "bold",
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  // text: "Month", // sumbu x
                },
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  // text: "Number of Transactions", // sumbu y
                },
              },
            },
          },
        });

      //Grafik tabel
    // Tabel: Performa penjualan produk per mesin dan per kategori serta total keseluruhan
    // const salesTableContainer = document.getElementById("salesTable");
    // const salesPerformance = {};
    // let totalSales = 0;
    // data.forEach((item) => {
    //   const machine = item.Machine;
    //   const category = item.Category;
    //   const sales = parseFloat(item.LineTotal);
    //   totalSales += sales;
    //   salesPerformance[machine] = salesPerformance[machine] || {};
    //   salesPerformance[machine][category] =
    //     (salesPerformance[machine][category] || 0) + sales;
    // });
    // let salesTableHTML = `<h2 style="font-size: 18px; text-align: center;">Product Sales Performance by Category</h2><table><tr><th>Machine</th><th>Category</th><th>Total Sales</th></tr>`;
    // Object.entries(salesPerformance).forEach(([machine, categories]) => {
    //   Object.entries(categories).forEach(([category, sales]) => {
    //     salesTableHTML += `<tr><td>${machine}</td><td>${category}</td><td>${sales.toFixed(
    //       2
    //     )}</td></tr>`;
    //   });
    // });
    // salesTableHTML += `<tr><td colspan="2"><strong>Total Overall Sales</strong></td><td><strong>${totalSales.toFixed(
    //   2
    // )}</strong></td></tr></table>`;
    // salesTableContainer.innerHTML = salesTableHTML;

    //---------------------------------------FILTER DATE-----------------------------------------------------------------

    //Fungsi untuk filter chart Number Of Product Per Machine
   function filterChartNumberOfProductPerMachine() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;

      // Filter data JSON berdasarkan tanggal transaksi
      const filteredData = data.filter(
        (item) => item.TransDate >= startDate && item.TransDate <= endDate
      );

      // Hitung jumlah produk per mesin pada data yang difilter
      const productCounts = {};
      filteredData.forEach((item) => {
        const machineID = item.Machine;
        productCounts[machineID] = (productCounts[machineID] || 0) + 1;
      });

      // Perbarui grafik 2 dengan data yang sudah difilter
      const productLabels = Object.keys(productCounts);
      const productCountsValues = Object.values(productCounts);
      chart2.data.labels = productLabels;
      chart2.data.datasets[0].data = productCountsValues;
      chart2.update();
    }

    

    //Fungsi untuk filter chart Number Of Product Per Category
    function filterChartNumberOfProductPerCategory() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
    
      // Filter data JSON berdasarkan tanggal transaksi
      const filteredData = data.filter(
        (item) =>
          item.TransDate >= startDate && item.TransDate <= endDate
      );
    
      // Hitung jumlah produk per kategori pada data yang difilter
      const categoryCounts = {};
      filteredData.forEach((item) => {
        const category = item.Category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    
      // Perbarui grafik dengan data yang sudah difilter
      const categoryLabels = Object.keys(categoryCounts);
      const categoryCountsValues = Object.values(categoryCounts);
      chart3.data.labels = categoryLabels;
      chart3.data.datasets[0].data = categoryCountsValues;
      chart3.update();
    }



    // Fungsi untuk filter chart Number Of Distinct Product Per Location
    function filterChartNumberOfDisctinctProductPerLoacation() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
    
      // Filter data JSON berdasarkan tanggal transaksi
      const filteredData = data.filter(
        (item) =>
          item.TransDate >= startDate && item.TransDate <= endDate
      );
    
      // Hitung jumlah produk yang berbeda per lokasi pada data yang difilter
      const productsPerLocation = {};
      filteredData.forEach((item) => {
        const location = item.Location;
        productsPerLocation[location] = new Set(
          productsPerLocation[location]
        );
        productsPerLocation[location].add(item.Product);
      });
    
      // Perbarui data pada chart 
      const locationLabels = Object.keys(productsPerLocation);
      const productsCountPerLoc = Object.values(
        productsPerLocation
      ).map((set) => set.size);
      chart4.data.labels = locationLabels;
      chart4.data.datasets[0].data = productsCountPerLoc;
      chart4.update();
    }



    //Fungsi untuk filter chart Average Transtotal Per Location
    function filterChartAverageTranstotalPerLocation() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
    
      // Filter data JSON berdasarkan tanggal transaksi
      const filteredData = data.filter(
        (item) =>
          item.TransDate >= startDate && item.TransDate <= endDate
      );
    
      // Hitung rata-rata TransTotal per lokasi pada data yang difilter
      const averageTransTotalPerLocation = {};
      const locationCount = {};
      filteredData.forEach((item) => {
        const location = item.Location;
        const transTotal = parseFloat(item.TransTotal);
        averageTransTotalPerLocation[location] =
          (averageTransTotalPerLocation[location] || 0) + transTotal;
        locationCount[location] = (locationCount[location] || 0) + 1;
      });
      Object.keys(averageTransTotalPerLocation).forEach((location) => {
        averageTransTotalPerLocation[location] /= locationCount[location];
      });
    
      // Perbarui data pada chart
      const locationLabels5 = Object.keys(averageTransTotalPerLocation);
      const averageTransTotalValues = Object.values(averageTransTotalPerLocation);
      chart5.data.labels = locationLabels5;
      chart5.data.datasets[0].data = averageTransTotalValues;
      chart5.update();
    }


    
    //Fungsi untuk filter chart Sales Trend
    function filterChartSalesTrend() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
    
      // Filter data JSON berdasarkan tanggal transaksi
      const filteredData = data.filter(
        (item) =>
          new Date(item.Prcd_Date) >= new Date(startDate) &&
          new Date(item.Prcd_Date) <= new Date(endDate)
      );
    
      // Proses pengumpulan data sales trend dari data yang difilter
      const salesTrendData = {};
      filteredData.forEach((item) => {
        const date = new Date(item.Prcd_Date);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const category = item.Category;
        const price = parseFloat(item.MPrice);
        const monthYear = `${month} ${year}`;
    
        if (!salesTrendData[category]) {
          salesTrendData[category] = {};
        }
    
        if (!salesTrendData[category][monthYear]) {
          salesTrendData[category][monthYear] = [];
        }
    
        salesTrendData[category][monthYear].push(price);
      });
    
      // Membuat list bulan dan tahun dalam urutan yang benar
      const monthsInOrder = [];
      for (let year = 2022; year <= 2023; year++) {
        for (let month = 0; month < 12; month++) {
          const monthName = new Date(year, month).toLocaleString("default", {
            month: "long",
          });
          monthsInOrder.push(`${monthName} ${year}`);
          // Memeriksa apakah sudah mencapai Januari 2023
          if (year === 2023 && month === 0) {
            break; // Keluar dari loop jika sudah mencapai Januari 2023
          }
        }
      }
    
      // Menghitung rata-rata harga produk per kategori per bulan
      const salesTrendLabels = Object.keys(salesTrendData);
      const salesTrendValues = {};
      salesTrendLabels.forEach((category) => {
        salesTrendValues[category] = [];
        monthsInOrder.forEach((monthYear) => {
          const prices = salesTrendData[category][monthYear] || [];
          const sum = prices.reduce((total, price) => total + price, 0);
          const averagePrice = prices.length ? sum / prices.length : 0;
          salesTrendValues[category].push(averagePrice);
        });
      });
    
      // Perbarui data pada chart 
      chart6.data.labels = monthsInOrder;
      chart6.data.datasets = Object.keys(salesTrendData).map((category, index) => ({
        label: category,
        data: salesTrendValues[category],
        fill: "origin",
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(0, 191, 255, 0.2)",
        ][index % 3],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(0, 191, 255, 1)",
        ][index % 3],
        borderWidth: 2,
      }));
      chart6.update();
    }



    function filterChartTransactionCountPerMounth() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
    
      // Mengumpulkan data transaksi per bulan sesuai rentang tanggal
      const filteredTransactionDataPerMonth = {};
      for (let year = 2022; year <= 2022; year++) {
        const endMonth = 12; // Hanya tahun 2022, sehingga berhenti di Desember
        for (let month = 0; month < endMonth; month++) {
          const date = new Date(year, month, 1);
          const monthName = date.toLocaleString("default", { month: "long" });
          const formattedMonth = `${monthName} ${year}`;
    
          // Filter data transaksi berdasarkan rentang tanggal
          const filteredData = data.filter((item) => {
            const transDate = new Date(item.TransDate);
            return transDate >= new Date(startDate) && transDate <= new Date(endDate);
          });
    
          // Hitung jumlah transaksi untuk bulan yang sesuai
          filteredTransactionDataPerMonth[formattedMonth] = filteredData.filter((item) => {
            const transDate = new Date(item.TransDate);
            return transDate.getFullYear() === date.getFullYear() && transDate.getMonth() === date.getMonth();
          }).length;
        }
      }
    
      // Memisahkan label bulan dan jumlah transaksi
      const labels = Object.keys(filteredTransactionDataPerMonth);
      const values = Object.values(filteredTransactionDataPerMonth);
    
      // Update data pada chart
      transactionPerformanceChart.data.labels = labels;
      transactionPerformanceChart.data.datasets[0].data = values;
      transactionPerformanceChart.update();
    }
    
      // // Function to confirm and filter charts
      // function confirmAndFilterCharts() {
      //   if (confirm("Apakah yakin untuk memfilter?")) {
      //     filterChart2();
      //     filterChart3();
      //     filterChart4();
      //     filterChart5();
      //     filterChart6();
      //   }
      // }

      // // Add event listener to filter button
      // document.getElementById("filterBtn").addEventListener("click", confirmAndFilterCharts);


    //FILTER BERDASARKAN MACHINE
    // Saat memproses data, isi dropdown dengan opsi machine
    const machineFilter = document.getElementById("machineFilter");
    const uniqueMachines = [...new Set(data.map(item => item.Machine))];
    uniqueMachines.forEach(machine => {
      const option = document.createElement("option");
      option.value = machine;
      option.text = machine;
      machineFilter.add(option);
    });

    machineFilter.addEventListener("change", () => {
      updateChart(machineFilter.value);
    });

    function updateChart(selectedMachine) {
      // Perbarui chart 2 (Jumlah produk per mesin)
      const filteredData2 = selectedMachine
        ? data.filter(item => item.Machine === selectedMachine)
        : data;
    
      const productCounts = {};
      filteredData2.forEach((item) => {
        const machineID = item.Machine;
        productCounts[machineID] = (productCounts[machineID] || 0) + 1;
      });
    
      const productLabels = Object.keys(productCounts);
      const productCountsValues = Object.values(productCounts);
    
      chart2.data.labels = productLabels;
      chart2.data.datasets[0].data = productCountsValues;
      chart2.update();
    
      // Perbarui chart 3 (Jumlah produk per kategori)
      const filteredData3 = selectedMachine
        ? data.filter(item => item.Machine === selectedMachine)
        : data;
    
      const categoryCounts = {};
      filteredData3.forEach((item) => {
        const category = item.Category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    
      const categoryLabels = Object.keys(categoryCounts);
      const categoryCountsValues = Object.values(categoryCounts);
    
      chart3.data.labels = categoryLabels;
      chart3.data.datasets[0].data = categoryCountsValues;
      chart3.data.datasets[0].backgroundColor = colors.slice(0, categoryLabels.length);
      chart3.update();

      //Perbarui chart 4 (Jumlah produk per lokasi)
      const filteredData4 = selectedMachine
    ? data.filter(item => item.Machine === selectedMachine)
    : data;

      const productsPerLocation = {};
      filteredData4.forEach((item) => {
        const location = item.Location;
        productsPerLocation[location] = new Set(productsPerLocation[location]);
        productsPerLocation[location].add(item.Product);
      });

      const locationLabels = Object.keys(productsPerLocation);
      const productsCountPerLocation = Object.values(productsPerLocation).map(
        (set) => set.size
      );

      chart4.data.labels = locationLabels;
      chart4.data.datasets[0].data = productsCountPerLocation;
      chart4.update();

      // Perbarui chart 5 (Rata-rata transTotal per lokasi)
      const filteredData5 = selectedMachine
      ? data.filter(item => item.Machine === selectedMachine)
      : data;

    const averageTransTotalPerLocation = {};
    const locationCount = {};
    filteredData5.forEach((item) => {
      const location = item.Location;
      const transTotal = parseFloat(item.TransTotal);
      averageTransTotalPerLocation[location] =
        (averageTransTotalPerLocation[location] || 0) + transTotal;
      locationCount[location] = (locationCount[location] || 0) + 1;
    });
    Object.keys(averageTransTotalPerLocation).forEach((location) => {
      averageTransTotalPerLocation[location] /= locationCount[location];
    });
    const locationLabels5 = Object.keys(averageTransTotalPerLocation);
    const averageTransTotalValues = Object.values(averageTransTotalPerLocation);

    chart5.data.labels = locationLabels5;
    chart5.data.datasets[0].data = averageTransTotalValues;
    chart5.update();

      // Perbarui chart 6 (Sales Trend)
      const filteredData6 = selectedMachine
        ? data.filter(item => item.Machine === selectedMachine)
        : data;

      const salesTrendData = {};
      filteredData6.forEach((item) => {
        const date = new Date(item.Prcd_Date);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const category = item.Category;
        const price = parseFloat(item.MPrice);
        const monthYear = `${month} ${year}`;

        if (!salesTrendData[category]) {
          salesTrendData[category] = {};
        }

        if (!salesTrendData[category][monthYear]) {
          salesTrendData[category][monthYear] = [];
        }

        salesTrendData[category][monthYear].push(price);
      });

      // Membuat list bulan dan tahun dalam urutan yang benar
      const monthsInOrder = [];
      for (let year = 2022; year <= 2023; year++) {
        for (let month = 0; month < 12; month++) {
          const monthName = new Date(year, month).toLocaleString("default", {
            month: "long",
          });
          monthsInOrder.push(`${monthName} ${year}`);
          // Memeriksa apakah sudah mencapai Januari 2023
          if (year === 2023 && month === 0) {
            break; // Keluar dari loop jika sudah mencapai Januari 2023
          }
        }
      }

      // Menghitung rata-rata harga produk per kategori per bulan
      const salesTrendLabels = Object.keys(salesTrendData);
      const salesTrendValues = {};
      salesTrendLabels.forEach((category) => {
        salesTrendValues[category] = [];
        monthsInOrder.forEach((monthYear) => {
          const prices = salesTrendData[category][monthYear] || [];
          const sum = prices.reduce((total, price) => total + price, 0);
          const averagePrice = prices.length ? sum / prices.length : 0;
          salesTrendValues[category].push(averagePrice);
        });
      });

      // Perbarui data chart 
      chart6.data.labels = monthsInOrder;
      chart6.data.datasets = Object.keys(salesTrendData).map((category, index) => ({
        label: category,
        data: salesTrendValues[category],
        fill: "origin",
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(0, 191, 255, 0.2)",
        ][index % 3],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(0, 191, 255, 1)",
        ][index % 3],
        borderWidth: 2,
      }));
      chart6.update();
        }

      // Function to confirm and filter charts
      function confirmAndFilterCharts() {
        if (confirm("Apakah yakin untuk memfilter?")) {
        
          filterChartSalesTrend();
          filterChartTransactionCountPerMounth();
  
        }
      }
        // Tambahkan event listener pada tombol filter
        document.getElementById("filterBtn").addEventListener("click", confirmAndFilterCharts);
      });

    

      
