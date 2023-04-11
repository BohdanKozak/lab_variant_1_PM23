'use strict'

const passengerModel = new Passenger() // eslint-disable-line no-undef

function initAddForm() {
    const form = window.document.querySelector('#passenger-add-form')
    form.addEventListener('submit', function(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const passengerData = {}
        formData.forEach((value, key) => {
            passengerData[key] = value
        })

        passengerModel.Create(passengerData)

        e.target.reset()
    })
}

function initList() {
    window.jQuery('#passenger-list').DataTable({
        data: passengerModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'NumberOfPasport', data: 'numberOfPasport' },
            { title: 'Delete', data: '' }
        ],
        columnDefs: [{
            "render": function(data, type, row) {
                return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
            },
            "targets": 3
        }]
    })
}

function initListEvents() {
    document.addEventListener('passengersListDataChanged', function(e) {
        const dataTable = window.jQuery('#passenger-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    passengerModel.Delete(id);
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})