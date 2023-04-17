/**************************
████▀░░░░░░░░░░░░░░░░░░▀███
███│░░░░░░░░░░░░░░░░░░░│███
██▌│░░░░░░░░░░░░░░░░░░░│▐██
██░└┐░░░░░░░░░░░░░░░░░┌┘░██
██░░└┐░░░░░░░░░░░░░░░┌┘░░██
██░░┌┘▄▄▄▄▄░░░░░▄▄▄▄▄└┐░░██
██▌░│██████▌░░░▐██████│░▐██
███░│▐███▀▀░░▄░░▀▀███▌│░███
██▀─┘░░░░░░░▐█▌░░░░░░░└─▀██
██▄░░░▄▄▄▓░░▀█▀░░▓▄▄▄░░░▄██
████▄─┘██▌░░░░░░░▐██└─▄████
██████████┬┬┬┬┬┬┬██████████
██████████M█C█H█N██████████
███████████████████████████
██https://codestormer.com██
███████████████████████████
**************************/
async function getUrlFromClipboard() {
  try {
    const clipboardText = await navigator.clipboard.readText();
    return clipboardText.trim();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function createButton(title, iconClass, callback) {
  const a = document.createElement('a');
  a.className = 'btn';
  a.href = '#';
  a.title = title;

  const span = document.createElement('span');
  span.className = iconClass;
  a.appendChild(span);

  a.addEventListener('click', callback);

  return a;
}

function generateImageMarkup(url) {
  return `<img src="${url}" width="" height="">`;
}

function generateVideoMarkup(url) {
  return `<video controls><source src="${url}" type="video/mp4">Your browser does not support the video tag.</video>`;
}

function generateCodeMarkup(url) {
  return `<pre><code>${url}</code></pre>`;
}

function generateQuoteMarkup(url) {
  return `<blockquote>${url}</blockquote>`;
}

function generateSpoilerMarkup(url) {
  return `<div class='spoiler'>${url}</div>`;
}

function insertMarkupIntoTextarea(markup) {
  const textarea = document.querySelector('textarea[name="content"]');

  if (textarea) {
    const cursorPosition = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPosition);
    const textAfter = textarea.value.substring(textarea.selectionEnd, textarea.value.length);

    textarea.value = textBefore + markup + textAfter;
    textarea.selectionEnd = cursorPosition + markup.length;
  } else {
    console.error('Textarea with name "content" not found.');
  }
}

async function addButtonToPage() {
  const buttons = [
    createButton('image', 'icon-entypo icon-picture', async (event) => {
      event.preventDefault();
      const url = await getUrlFromClipboard();
      insertMarkupIntoTextarea(generateImageMarkup(url));
    }),
    createButton('video', 'icon-entypo icon-camera', async (event) => {
      event.preventDefault();
      const url = await getUrlFromClipboard();
      insertMarkupIntoTextarea(generateVideoMarkup(url));
    }),
    createButton('spoiler', 'icon-entypo icon-eye', async (event) => {
      event.preventDefault();
      const url = await getUrlFromClipboard();
      insertMarkupIntoTextarea(generateSpoilerMarkup(url));
    }),
    createButton('code', 'icon-entypo icon-code', async (event) => {
      event.preventDefault();
      const url = await getUrlFromClipboard();
      insertMarkupIntoTextarea(generateCodeMarkup(url));
    }),
    createButton('quote', 'icon-entypo icon-right-open', async (event) => {
      event.preventDefault();
      const url = await getUrlFromClipboard();
      insertMarkupIntoTextarea(generateQuoteMarkup(url));
    }),
  ];

  const targetDiv = document.querySelector('.post-type.control-group.switch');

  if (targetDiv) {
    buttons.forEach((button) => targetDiv.appendChild(button));
  } else {
    console.error('Target div not found.');
    return;
  }
}

// Call the function to add the buttons to the page
addButtonToPage();
