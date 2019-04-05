const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const TicketSchema = new Schema({
    const TicketSchema = new Schema({  
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        status: {
          type: String,
          required: true
        },
        message: {
          type: String,
          required: true
        }
      }, {
        timestamps: true
      });
});

module.exports = mongoose.model('Tickets', TicketSchema);