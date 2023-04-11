class Train extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('trains')
    this.fields = this.fields.concat([
    	'name',
    	'destination',
    	'number'
    ])
  }
}