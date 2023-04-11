'use strict'

const trainModel = new Train();
const passengerModel = new Passenger();
const ticketModel = new Ticket();
const soldTicketModel = new SoldTicket(); // eslint-disable-line no-undef


function initSelectTag(tagId, model) {
  let collection = model.Select();
  let selectTag = document.getElementById(tagId);
  selectTag.innerHTML = ''; // Clear the select tag before appending options
  for(let i = 0; i < collection.length; ++i) {
  let optionTag = document.createElement('option');
  optionTag.setAttribute('value', collection[i].id);
  if(tagId === 'ticket'){
    optionTag.innerText = collection[i].number;
  }else{
    optionTag.innerText = collection[i].name;
  }
 
    

  selectTag.appendChild(optionTag);
  }
  
}

function initAddForm() {
    initSelectTag('train', trainModel);
    initSelectTag('passenger', passengerModel);
    initSelectTag('ticket', ticketModel);
    
    const form = window.document.querySelector('#soldtickets-add-form')

    form.addEventListener('submit', function(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const soldticketsData = {}
        formData.forEach((value, key) => {
            soldticketsData[key] = value
        })

        soldTicketModel.Create(soldticketsData)

        e.target.reset()
        window.location.reload();
    })
}

function initList() {
    window.jQuery('#soldtickets-list').DataTable({
        data: soldTicketModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Passenger', data: 'passenger' },
            { title: 'Train', data: 'train' },
            { title: 'Ticket', data: 'ticket' },
            {title: 'DATE', data: 'DATE'},
            { title: 'Delete', data: '' },
             {title: 'Edit', data: ''}
        ],
        columnDefs: [
            {
                render: function(data) {
                    let passenger = passengerModel.FindById(data);
                    return passenger.name;
                },
                targets: 1
            },
            {
                render: function(data) {
                    let train = trainModel.FindById(data);
                    return train.name;
                },
                targets: 2
            },
            {
                render: function(data) {
                    let ticket = ticketModel.FindById(data);
                    return ticket.number;
                },
                targets: 3
            },
            {
                render: function(data, type, row) {
                    return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
                    
                },
                targets: 5
            },
            {
              render: function(data, type, row) {
               
                    return '<button type="button" onclick="updateUser(this)"> Edit </button>'
                  
            },
              targets: 6
          }
        ]
    })
}

function initListEvents() {
    document.addEventListener('soldticketsListDataChanged', function(e) {
        const dataTable = window.jQuery('#soldtickets-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    soldTicketModel.Delete(id);
    alert("deletUser")
}




window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})