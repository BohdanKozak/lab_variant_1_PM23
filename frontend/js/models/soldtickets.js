class SoldTicket extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor() {
      super('soldticket');
      this.fields = this.fields.concat([
          'passenger',
          'train',
          'ticket',
          'DATE'
      ])
  }
}