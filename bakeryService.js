function setLocalStorage() {
  $.ajax({
    type: "Get",
    url: "Items.json",
    dataType: "json",
    success: function (response) {
      window.localStorage.setItem("bakeryItems", JSON.stringify(response));
    },
    statusCode: {
      404: function () {
        console.error("There was a problem with the server.  Try again soon!");
      },
    },
  });
}

function readAll() {
  var tableData = document.querySelector(".data_table");

  var object = window.localStorage.getItem("bakeryItems");
  var objectdata = JSON.parse(object);
  var elements = "";

  objectdata.map(
    (record) =>
      (elements += `<tr class="">
						<td scope="row">${record.Name}</td>
						<td scope="row">${record.Flavour}</td>
						<td scope="row">${record.Price}</td>
						<td scope="row" class="">
							<a href="form.html">
								<button class="actionButton")" onClick=renderEditPage(${record.Id})>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
										<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
									</svg>
								</button>
							</a>
							<button class="actionButton" onClick=showDeletePopup(${record.Id})>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
									<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
								</svg>
							</button>
						</td>
					</tr>`)
  );
  tableData.innerHTML = elements;
}

function renderAddPage() {
  window.localStorage.setItem("PageType", "AddItem");
}

function renderEditPage(Id) {
  window.localStorage.setItem("PageType", "EditItem");
  setId(Id);
}
function checkPage() {
  const pageType = window.localStorage.getItem("PageType");
  pageType === "EditItem" ? fetchItemDetails() : null;
}

function submitButton() {
  window.localStorage.getItem("PageType") === "AddItem"
    ? addBakeryItem()
    : editBakeryItem();
}

function addBakeryItem() {
  var items = window.localStorage.getItem("bakeryItems");
  items = JSON.parse(items);

  var ItemName = document.getElementById("ItemName").value;
  var Flavour = document.getElementById("Flavour").value;
  var Price = document.getElementById("Price").value;

  const newItem = {
    Id: Date.now(),
    Name: ItemName,
    Flavour: Flavour,
    Price: Price,
  };
  items.push(newItem);
  window.localStorage.setItem("bakeryItems", JSON.stringify(items));
  document.getElementsById("backToMenu").Click();
  readAll();
}

function fetchItemDetails() {
  var selectedId = parseInt(localStorage.getItem("selectedId"));
  var bakeryItems = localStorage.getItem("bakeryItems");
  var items = JSON.parse(bakeryItems);
  var index = items.findIndex((item) => item.Id === selectedId);
  items.splice(index, 1).forEach((element) => {
    $("#ItemName").val(element.Name);
    $("#Flavour").val(element.Flavour);
    $("#Price").val(element.Price);
  });
}

function editBakeryItem() {
  var Id = parseInt(window.localStorage.getItem("selectedId"));
  var items = window.localStorage.getItem("bakeryItems");
  items = JSON.parse(items);
  const index = items.findIndex((item) => item.Id === Id);
  items.splice(index, 1);

  var ItemName = document.getElementById("ItemName").value;
  var Flavour = document.getElementById("Flavour").value;
  var Price = document.getElementById("Price").value;

  const newItem = { Id: Id, Name: ItemName, Flavour: Flavour, Price: Price };
  items.push(newItem);
  window.localStorage.setItem("bakeryItems", JSON.stringify(items));
  document.getElementsById("backToMenu").Click();
  readAll();
}

function deleteItem() {
  var Id = parseInt(window.localStorage.getItem("selectedId"));
  var items = window.localStorage.getItem("bakeryItems");
  items = JSON.parse(items);
  const index = items.findIndex((item) => item.Id === Id);
  items.splice(index, 1);
  window.localStorage.setItem("bakeryItems", JSON.stringify(items));
  closeDeletePopup();
  readAll();
}

function setId(Id) {
  window.localStorage.setItem("selectedId", Id);
}

function showDeletePopup(Id) {
  setId(Id);
  const dialog = document.getElementById("delete-dialog");
  dialog.showModal();
}
function closeDeletePopup() {
  const dialog = document.getElementById("delete-dialog");
  dialog.close();
}
