'use strict'

const trainModel = new Train() // eslint-disable-line no-undef

function initAddForm() {
    const form = window.document.querySelector('#train-add-form')
    form.addEventListener('submit', function(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const trainData = {}
        formData.forEach((value, key) => {
            trainData[key] = value

        })

        trainModel.Create(trainData)

        e.target.reset()
    })
}

function initList() {
    window.jQuery('#train-list').DataTable({
        data: trainModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Destination', data: 'destination' },
            { title: 'Number', data: 'number' },
            { title: 'Delete', data: '' }
        ],
        columnDefs: [{
            "render": function(data, type, row) {
                return '<button type="button" value="edit" onclick="deleteItem(this)">Delete</button>';
            },
            "targets": 4
        },{
            data: null,
            title: 'Edit',
            wrap: true,
            "render": function (item) {
                const def = JSON.stringify(item)
                return `<div>
                <div class="btn-group"> <button type="button"  id="btn_update" class="btn_update btn-primary " data-item='${def}'>Update</button></div>
                </div>`},
            "targets": 5
        }]
    })
    addEventToUpdateButtons()
}

function initListEvents() {
    document.addEventListener('trainsListDataChanged', function(e) {
        const dataTable = window.jQuery('#train-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
    
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    trainModel.Delete(id);
}


function initUpdateForm(row) {
    const form = window.document.querySelector('#train-update_el-form')
    const closeBtn = window.document.querySelector('#btn_close')
  
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault()
      form.style.visibility = 'hidden'
    })
  
    form.addEventListener('submit', function (e) {
      e.preventDefault()
  
      const formData = new FormData(e.target)
      const coll_trains = trainModel.SelectByKey('train')
  
      const trainData = {}
      formData.forEach((value, key) => {
        trainData[key] = value
      })
      
      const res = coll_trains.map((el, index) => {
        console.log(el.id, row.id)
        if (el.id == row.id) return { ...trainData, id: el.id }
        return el
      })
  
      trainModel.Update(res)
  
      window.location.reload();
      e.target.reset()
    })
  }

  function initUpdate_el(row) {
    const formData = JSON.parse(row)
  
    const form = window.document.querySelector('#train-update_el-form')
    form.style.visibility = 'visible'
  
    initUpdateForm(formData)
  }

  function addEventToUpdateButtons() {
    const elems = document.querySelectorAll('#btn_update')
  
    elems.forEach((item) => {
      // console.log('assign: ', item)
      item.addEventListener('click', function () {
        // console.log('addEventListener here', item.dataset.item)
  
        initUpdate_el(item.dataset.item)
      })
    })
  }

  function initButtonsEvent() {
    document.addEventListener(
      'trainsListDataChanged',
      function () {
        
        addEventToUpdateButtons()
      },
      false,
    )
  }




window.addEventListener('DOMContentLoaded', (e) => {
    initAddForm()
    initList()
    initListEvents()
    initButtonsEvent()
})