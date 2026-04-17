let data = [];

fetch("src/api/data.json")
  .then(res => res.json())
  .then(json => {
    data = json.results;
    populateDropdown();
  });

function populateDropdown() {
  let dropdown = document.getElementById("dropdown");

  data.forEach(item => {
    let option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    dropdown.appendChild(option);
  });
}

function searchData() {
  let input = document.getElementById("searchInput").value.toLowerCase();

  let result = data.find(item =>
    item.name.toLowerCase().includes(input)
  );

  displayResult(result);
}

function displayResult(item) {
  let output = document.getElementById("output");

  if (!item) {
    output.innerHTML = "<p>No result found</p>";
    return;
  }

  if (item.type === "location") {
    output.innerHTML = `
      <h2>${item.name}</h2>
      <img src="${item.images.flag}" width="150">
      <p><b>Population:</b> ${item.population}</p>
      <p><b>Capital:</b> ${item.capital}</p>
      <p><b>Languages:</b> ${item.languages.join(", ")}</p>
      <audio controls src="${item.anthem}"></audio>
    `;
  } else {
    output.innerHTML = `
      <h2>${item.name}</h2>
      <img src="${item.images.main}" width="150">
      <p><b>Birth Date:</b> ${item.birth_date}</p>
      <p><b>Birth Place:</b> ${item.birth_place}</p>
      <p><b>Education:</b> ${item.education.join(", ")}</p>
    `;
  }
}
