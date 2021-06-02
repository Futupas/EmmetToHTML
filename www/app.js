'use strict';

const codePreviewContainer = document.querySelector('#htmlcode > div > pre');
const previewContainer = document.querySelector('#preview > div');

const mainInput = document.querySelector('#input > input');
mainInput.oninput = (e) => {
    try{
        /** @type {string} */
        const value = mainInput.value;
        /** @type {HTMLElement[]} */
        const elements = emmetToHTML(value);
        console.log(emmetToPseudoHTML(value));
        
        let htmlText = '';
        previewContainer.innerHTML = '';
        for (const element of elements) {
            previewContainer.appendChild(element);
            htmlText += element.outerHTML;
        }
        codePreviewContainer.innerText = htmlText;
    } catch(ex) {
        console.error(ex);
    }
}
