'use strict';

const mainInput = document.querySelector('#input > input');
mainInput.oninput = (e) => {
    document.querySelector('#htmlcode code').innerText = document.querySelector('#main').innerHTML;
    PR.prettyPrint();
}
