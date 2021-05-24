// UI handling functions

function clearOutput() {
    const e = document.getElementById('result');
    e.setAttribute('hidden', 'true');
    e.classList.remove('succes', 'warning', 'error');
}

function showError(err) {
    const e = document.getElementById('result');
    e.removeAttribute('hidden');
    e.classList.remove('alert-success', 'alert-warning', 'alert-danger');
    if (err === 'Aborted') {
        e.classList.add('alert-warning');
        e.innerText = 'Session was aborted';
    } else {
        e.classList.add('alert-danger');
        e.innerText = 'Error occurred: ' + String(err);
    }
    throw err;
}

function showWarning(err) {
    var e = hideElement('result', false);
    e.classList.remove('success', 'error');
    e.classList.add('warning');
    e.innerText = err;
    throw err;
  }

function showSuccess(text = 'Success') {
  const e = document.getElementById('result');
  e.innerHTML = text;
  e.removeAttribute('hidden');
  e.classList.remove('alert-success', 'alert-warning', 'alert-danger');
  e.classList.add('alert-success');
}

function hideElement(elementID, hidden) {
  var e = document.getElementById(elementID);
  if (hidden) {
    e.setAttribute('hidden', 'true');
  } else {
    e.removeAttribute('hidden');
  }
  return e;
}
