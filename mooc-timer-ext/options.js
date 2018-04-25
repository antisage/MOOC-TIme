var bg = chrome.extension.getBackgroundPage();

// Saves options to localStorage.
function save_options() {
  var limit_data = document.getElementById("chart_limit");
  var limit = parseInt(limit_data.value);
  if (limit) {
    localStorage["chart_limit"] = limit;
    limit_data.value = limit;
  } else {
    limit_data.value = localStorage["chart_limit"];
  }
}

function clearData() {
  localStorage.clear();
  bg.setDefaults();
  location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#clear-data').addEventListener('click', clearData);
});
