const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msgOne = document.getElementById('message--1');
const msgTwo = document.getElementById('message--2');

msgOne.textContent = 'Location: ';
msgTwo.textContent = 'Weather: ';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value
    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error);
            } else {
                msgOne.textContent = 'Location: ' + data.location;
                msgTwo.textContent = 'Weather: ' + data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    });
});