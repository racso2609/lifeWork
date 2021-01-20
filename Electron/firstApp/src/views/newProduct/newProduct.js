const axios = require('axios');

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    const product = {
        Name: document.querySelector('#name').value,
        Price: document.querySelector('#price').value,
        Description: document.querySelector('#description').value,
        Siz3: document.querySelector('#size').value,
        Quality: document.querySelector('#quality').value
    }

    axios.post('localhost:3001/api/admin/shoes', { 
    headers:{
        Authorization: "Bearer " + this.state.token
    }
    },product);
    e.preventDefault();
});