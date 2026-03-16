export function renderState(container, type, options = {}) {
  const {
    title = '',
    message = '',
    buttonText = '',
    onRetry = null
  } = options;

  container.innerHTML = '';

  const stateBox = document.createElement('div');
  stateBox.className = `state-box ${type}`;

  const titleEl = document.createElement('h3');
  titleEl.className = 'state-title';
  titleEl.textContent = title;

  const messageEl = document.createElement('p');
  messageEl.className = 'state-message';
  messageEl.textContent = message;

  stateBox.appendChild(titleEl);
  stateBox.appendChild(messageEl);

  if (type === 'error' && buttonText && typeof onRetry === 'function') {
    const retryButton = document.createElement('button');
    retryButton.className = 'retry-btn';
    retryButton.textContent = buttonText;
    retryButton.addEventListener('click', onRetry);
    stateBox.appendChild(retryButton);
  }

  container.appendChild(stateBox);
}

export function clearState(container) {
  container.innerHTML = '';
}