function toggleText() {
  let buttons = document.getElementsByClassName('toggle-text-button');
  let text = document.getElementById('text');
  for (let button of buttons) {
    button.onclick = function() {
      text.hidden = !text.hidden;
    };
  }
}
