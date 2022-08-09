prepareTaskList('taskList');

function newElement() {
    try {
        let inputValue = document.getElementById('task').value;

        if (!inputValue.trim())
            throw Error('Eklemek istediğiniz görev boş olamaz!')

        if (checkLocalStorage('taskList', inputValue)) {
            throw Error('Bu görev zaten  daha önce eklenmiş!');
        }

        prepareItem(inputValue);

        if (localStorage.getItem('taskList')) {
            let arrayLS = JSON.parse(localStorage.getItem('taskList'));
            arrayLS.push(inputValue);
            localStorage.setItem("taskList", JSON.stringify(arrayLS));
        } else {
            localStorage.setItem("taskList", JSON.stringify([inputValue]));
        }


        showToastMessage('Listeye eklendi.', MesajToast.SUCCESS)
    } catch (e) {
        showToastMessage(e.message, MesajToast.WARN)
    } finally {
        document.getElementById('task').value = '';
    }
}




function showToastMessage(text, state) {
    let toastElement = document.getElementById('liveToast');
    toastElement.setAttribute('class', state);
    document.getElementById('toast-body').innerHTML = text;
    let bsAlert = new bootstrap.Toast(toastElement);
    bsAlert.show();
}

function prepareItem(inputValue) {
    let ul = document.getElementById('list');
    let liElement = document.createElement('li');
    liElement.id = inputValue.replace(/\s+/g, '');
    let text = document.createTextNode(inputValue); 
    liElement.appendChild(text);
    ul.appendChild(liElement);

    let span = document.createElement("SPAN");
    let closeText = document.createTextNode("\u00D7"); 
    span.className = 'close';
    span.appendChild(closeText);
    liElement.appendChild(span);

    span.onclick = function () {
        let arrayLS = JSON.parse(localStorage.getItem('taskList'));
        localStorage.setItem("taskList", JSON.stringify(arrayRemove(arrayLS, inputValue)));
        this.parentElement.remove(); 
    }

    liElement.onclick = function () {
        this.classList.toggle('checked') 
    }
}




function prepareTaskList(key) {

    if (!localStorage.getItem(key))
        return;

    let ul = document.getElementById('list');
    let arrayLS = JSON.parse(localStorage.getItem(key));
    let liElement;
    let text;
    let span;
    let closeText;
    arrayLS.forEach(item => {
        liElement = document.createElement('li');
        liElement.id = item.replace(/\s+/g, '');
        text = document.createTextNode(item); 
        liElement.appendChild(text);
        ul.appendChild(liElement);
        span = document.createElement("SPAN");
        closeText = document.createTextNode("\u00D7"); 
        span.className = 'close';
        span.appendChild(closeText);
        liElement.appendChild(span);

        span.onclick = function () {
            let arrayLS = JSON.parse(localStorage.getItem('taskList'));
            localStorage.setItem("taskList", JSON.stringify(arrayRemove(arrayLS, item)));
            this.parentElement.remove(); 
        }

        liElement.onclick = function () {
            this.classList.toggle('checked') 
        }
    });
}




function checkLocalStorage(key, item) {
    if (localStorage.getItem(key)) {
        let arrayLS = JSON.parse(localStorage.getItem(key));
        return arrayLS.includes(item);
    }
    return false;
}




const MesajToast = {
    SUCCESS: 'toast success hide',
    WARN: 'toast error hide'
};




function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
}