const personSchema = new Schema({
  firstName: String,
  lastName: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Define a getter function for the fullName virtual
personSchema.virtual('fullName').get(function() {
  // The this keyword is the document
  return `${this.firstName} ${this.lastName}`;
});