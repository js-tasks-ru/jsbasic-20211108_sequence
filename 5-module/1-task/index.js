function hideSelf() {
  let buttons = document.getElementsByClassName('hide-self-button');
  for (let button of buttons) {
    button.onclick = function() {
      button.hidden = true;
    };
  }
}
