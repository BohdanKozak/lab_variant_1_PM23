class Passenger extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor() {
      super('passengers')
      this.fields = this.fields.concat([
          'name',
          'numberOfPasport'
          
      ])
  }
}