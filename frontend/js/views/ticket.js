'use strict'

const ticketModel = new Ticket() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#ticket-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const ticketData = {}
    formData.forEach((value, key) => {
      ticketData[key] = value
    })

    ticketModel.Create(ticketData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#ticket-list').DataTable({
    data: ticketModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'number' },
      { title: 'Price', data: 'price' },
      { title: 'Delete', data: '' }
    ],
    columnDefs: [
      {
        "render": function(data, type, row) {
          return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
        },
        "targets": 3
      }
    ]
  })
}

function initListEvents () {
  document.addEventListener('ticketsListDataChanged', function (e) {
    const dataTable = window.jQuery('#ticket-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function deleteItem(e) {
  let row = e.parentNode.parentNode;
  let id = row.getElementsByTagName('td')[0].innerText;
  row.remove();
  ticketModel.Delete(id);
}





window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})

