const Transform = require('stream').Transform
const _defaults = require('lodash.defaults')
const util = require('util')

const Tokeniser = function (options) {
  this.options = options || {}
  this.options.fieldOptions = this.options.fieldOptions || {}
  Transform.call(this, { objectMode: true })
}
exports.Tokeniser = Tokeniser
util.inherits(Tokeniser, Transform)
Tokeniser.prototype._transform = function (doc, encoding, end) {
  doc = JSON.parse(doc)
  for (var fieldName in doc.normalised) {
    var fieldOptions = _defaults(
      this.options.fieldOptions[fieldName] || {},  // TODO- this is wrong
      {
        separator: this.options.separator // A string.split() expression to tokenize raw field input
      })
    doc.normalised[fieldName] =
      doc.normalised[fieldName].split(fieldOptions.separator)
  }
  this.push(JSON.stringify(doc))
  return end()
}
