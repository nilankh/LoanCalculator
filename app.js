// Lisr for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // hide results
    document.getElementById('results').style.display='none';

    // show loader

    document.getElementById('loading').style.display='block';

    setTimeout(calculateResults, 2000);

    
    e.preventDefault();
});

// calculate results
function calculateResults(){

    // console.log('kaam kr rha h');
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    
    // Compute Monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);//to fixed can set the number of decimal you want
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        
        // it will show the results
        document.getElementById('results').style.display='block';

        // hide loader
        document.getElementById('loading').style.display='none';
    }else{
        showError('Please Fill all numbers');
    }

    


    

}

// show Error
function showError(error) {

    // hide the results
    document.getElementById('results').style.display='none';

    // hide loader
    document.getElementById('loading').style.display='none';
    // create a div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // clearerror after 3 seconds
    setTimeout(clearError, 1000);
}

// clear Error
function clearError(){
    document.querySelector('.alert').remove();
}