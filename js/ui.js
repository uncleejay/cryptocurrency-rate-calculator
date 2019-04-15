class UI {
     constructor() {
          this.init();
     }
     init() {
          this.printCryptoCurrencies();
     }
     // Prints the <option> for the form
     printCryptoCurrencies() {
          cryptoAPI.getCryptoCurrenciesList()
               .then(data => {
                    const cryptoCurrencies = data.cryptoCurrencies;

                    // Build the <select> from the REST API
                    const select = document.getElementById('cryptocurrency');

                    cryptoCurrencies.forEach(currency => {
                         // add the <option>
                         const option = document.createElement('option');
                         option.value = currency.id;
                         option.appendChild(document.createTextNode(currency.name));
                         select.appendChild(option);
                    })
               })
     }

     // Prints a message 2 parameters, message and classes

     printMessage(message, className) {
          const div = document.createElement('div');

          // add the classes
          div.className = className;
          // add the message
          div.appendChild(document.createTextNode(message));

          const messagesDiv = document.querySelector('.messages');

          messagesDiv.appendChild(div);

          // Remove the message
          setTimeout(()  => {
               document.querySelector('.messages div').remove();
          }, 3000); 
     }

     // Prints the result of the valuation / rate
     displayResult(result, currency) {

          console.log(result);
          // Read the currency
          let currencyName;
          currencyName = 'price_' + currency.toLowerCase();
          // read the result from the object
          const value = result[currencyName];

          // Remove the previous result
          const prevResult = document.querySelector('#result > div');
          if(prevResult) {
               prevResult.remove();
          }



          let HTMLTemplate = '';
          HTMLTemplate += `
               <div class="card cyan darken-3">
                    <div class="card-content white-text">
                         <span class="card-title">Result</span>
                         <p>The Price of ${result.name} from ${currency} is $ ${value}</p>
                         <p>Last Hour: ${result.percent_change_1h} %</p>
                         <p>Last Day: ${result.percent_change_24h} %</p>
                         <p>Last 7 Days: ${result.percent_change_7d} %</p>
                    </div>
               </div>
          `;

          // Print the spinner
          this.showSpinner();

          // After 3 seconds print the result and remove the spinner
          setTimeout(() => {
               // Print the result
               const divResult = document.querySelector('#result');
               divResult.innerHTML = HTMLTemplate;

               // Hide Spinner
               document.querySelector('.spinner img').remove();
          }, 3000); 
     }

     // Prints the spinner
     showSpinner() {
          const spinnerGIF = document.createElement('img');
          spinnerGIF.src = 'img/spinner.gif';
          document.querySelector('.spinner').appendChild(spinnerGIF);
     }
}