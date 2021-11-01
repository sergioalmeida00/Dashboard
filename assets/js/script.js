const ctx = document.getElementById('myChart');
const URLAPI = 'https://forbes400.herokuapp.com/api/forbes400?limit=5';
const btnClick = document.querySelector('#addDash');


function buildDash(labels, values, chartTitle) {
    let myDataDash = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: chartTitle,
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192)',
                borderWidth: 1,
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                X: {
                    beginAtZero: true,
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutBounce',
            },
            indexAxis: 'x',
        }
    });

}

//FAZ A COMUNICAÇÃO COM A API E CHAMAS AS FUNÇÕES NA QUAL DESA JOGAR AS INFORMAÇÕES EM TELA 
function readApi() {
    fetch(URLAPI)
        .then(response => response.json())
        .then(data => {
            let labels = data.map(names => names.personName);
            let values = data.map(worth => worth.finalWorth);
            let category = data.map(category => category.industries);
            buildDash(labels, values, 'Real');
            writheTableTop(data);
            writeTableOrders(data)
        })
}

//RECEBE OS DADOS DA API E JOGA NO HTML NA TABLE TOP
function writheTableTop(dataTable) {
    const table = document.querySelector('#tableBody');
    for (let tr of dataTable) {
        table.innerHTML += `
          <tr>
              <td>${tr.personName}</td>
              <td>${tr.financialAssets.length}</td>
          </tr>
      `
    }
}
//RECEBE OS DADOS DA API E JOGA NO HTML NA TABLE ORDERS
function writeTableOrders(dataOrders) {
    const tableOrders = document.querySelector("#customer");
    for (let tr of dataOrders) {
        for (finance of tr.financialAssets) {
            console.log(finance.companyName)
            tableOrders.innerHTML += `
              <tr>
                  <td>${tr.rank}</td>
                  <td>${finance.companyName}</td>
                  <td>US$ ${finance.sharePrice.toFixed(2)}</td>
                  <td>${tr.industries}</td>
                  
              </tr>
          `
        }
    }

}

readApi();