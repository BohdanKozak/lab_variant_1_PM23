class BaseModel {// eslint-disable-line no-unused-vars
  constructor (collectionName) {
    this.collectionName = collectionName
    this.fields = ['id']
  }
  /**
   * @returns {Number}
   */
  getNextId (collection) {
    return collection.length + 1
  }
  /**
   * @returns {Object}
   */
  GetEmpty () {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }
  /**
   * @returns {Array}
   */
  Select () {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }
  Commit (collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }
  Delete (id) {
    let collection = this.Select();
    for(let i = 0; i < collection.length; ++i) {
      if(collection[i].id == id) {
        collection.splice(i, 1);
        break;
      }
    }
    this.Commit(collection);
  }
  Edit(id, updates) {
    let collection = this.Select()
    let index = this.FindIndexById(id)
    if (index === -1) {
      throw new Error(`Cannot find item with id ${id}`)
    }
  
    collection[index] = {
      ...collection[index],
      ...updates,
    }
  
    this.Commit(collection)
  
    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, {
      detail: collection,
    })
    document.dispatchEvent(event)
  }
  
 Find_by_key(key){
  const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(key) : []

    return collection
 }
 Edit(updateobject,row){
   row.remove();
   updateobject.Create(row);
 }
  /**
   * @param {Number} id
   * @returns {BaseModel|undefined}
   */
  FindById (id) {
    return this.Select().find(item => item.id == id)
  }
  /**
   * @param {Number} id
   * @returns {Number}
   */
  FindIndexById (id) {
    return this.Select().findIndex(item => item.id == id)
  }
  Create (row) {
    const collection = this.Select()
    const entry = this.GetEmpty()

    entry.id = this.getNextId(collection)
    for (const key in row) {
      if (entry.hasOwnProperty(key) &&
          entry.key !== 'id') {
        entry[key] = row[key]
      }
    }

    collection.push(entry)

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
  SelectByKey(key) {
    const stored = localStorage.getItem(key)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }
  Update(value) {
    const entry = value

    this.Commit(entry)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, {
      detail: entry,
    })
    document.dispatchEvent(event)
  }
}