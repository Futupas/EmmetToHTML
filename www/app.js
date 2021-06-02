'use strict';

const codePreviewContainer = document.querySelector('#htmlcode > div > pre');
const previewContainer = document.querySelector('#preview > div');

const mainInput = document.querySelector('#input > input');
mainInput.value = 'div.vvvv>span>ul>li*5{dd$$}';
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
        codePreviewContainer.innerText = prettyHtml(htmlText);
    } catch(ex) {
        console.error(ex);
    }
}
mainInput.oninput();

/**
 * 
 * @param {string} source
 * @returns {string} 
 */
function prettyHtml(source) {
    const tab = '\t';
    const eol = '\n';
    let level = 0;
    let closing = false;
    let insideTag = false;
    let innerText = false;
    for (let i = 0; i < source.length; i++) {
        const c = source[i];
        if (c === '<') {
            insideTag = true;
            innerText = false;
            if (i !== source.length - 1 && source[i+1] === '/') {
                closing = true;
            } else {
                closing = false;
            }
        }
        if (c === '>') insideTag = false;

        if (c !== '<' && c !== '>' && !insideTag && !innerText) {
            innerText = true;
            const newStr = eol + makeTab(tab, level);
            source = replaceStrInStr(source, i, newStr);
            i += newStr.length;
            continue;
        }

        if (c === '<' && !closing) {
            const newStr = eol + makeTab(tab, level);
            source = replaceStrInStr(source, i, newStr);
            i += newStr.length;
        } else if (c === '>' && !closing) {
            level++;
        } else if (c === '<' && closing) {
            level--;
            const newStr = eol + makeTab(tab, level);
            source = replaceStrInStr(source, i, newStr);
            i += newStr.length;
        } else if (c === '>' && closing) {
        }
    }
    return source.trim();
}

/**
 * 
 * @param {string} source 
 * @param {number} index 
 * @param {string} newStr 
 * @param {boolean} replace 
 * @returns {stirng}
 */
function replaceStrInStr(source, index, newStr, replace) {
    const before = source.substring(0, index);
    const after = source.substring(index + (replace ? 1 : 0));
    return before + newStr + after;
}

/**
 * 
 * @param {string} tab 
 * @param {number} quantity 
 * @returns {string}
 */
function makeTab(tab, quantity) {
    let res = '';
    for (let i = 0; i < quantity; i++) {
        res += tab;
    }
    return res;
}
