const submit = document.querySelector('button');

submit.addEventListener('click', () => { 
    const apiKey = document.querySelector('.api-key').value;
    const apiSecret = document.querySelector('.api-secret').value;
    localStorage.setItem('apiKey', apiKey)
    localStorage.setItem('apiSecret', apiSecret)
    window.location.href='index.html';
    console.log('redirecting' );
});