export default () => {
  // set-properties =========================================================================================================//
  if (!HTMLElement.prototype.setProperty) {
    HTMLElement.prototype.setProperty = function(props) {
      if (typeof props !== "object") throw new Error("You must use object arrangement")
      for (const [keys, values] of Object.entries(props)) {
        this.style.setProperty(`--${keys}`, values)
      }
    }
  }
  // htmlElement.setProperty({keys, values})  <--- example


  // to-kedabcase =========================================================================================================//
  if (!String.prototype.toKedabCase) {
    String.prototype.toKedabCase = function() {
      return this && this
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
    }
  }
  // string.toKedabCase() <-- example


  // to-snakecase =========================================================================================================//
  if (!String.prototype.toSnakeCase) {
    String.prototype.toSnakeCase = function() {
    return this && this
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('_');
    }
  }
  // string.toSnakeCase() <-- example


  // limitString =========================================================================================================//
  if (!String.prototype.limitString) {
    String.prototype.limitString = function(limit) {
      if (this.length > limit) return `${this.substring(0, limit)}...`
      return this
    }
  }
  // string.limitString(limit) <-- example


  // toMonthName =========================================================================================================//
  if (!Number.prototype.toMonthName) {
    Number.prototype.toMonthName = function(length = 'short', lang = 'en-US') {
      const date = new Date();
      date.setMonth(this - 1);

      return date.toLocaleString(lang, { // <-- if [] empty will auto search locale
        month: length, // <-- can be long or short
      });
    }
  }
  // toMonthName(length, lang) <-- example


  // toDayName =========================================================================================================//
  if (!Number.prototype.toDayName) {
    Number.prototype.toDayName = function(length = 'long', lang = 'en-US') {
      const date = new Date()
      date.setDate(this - 1)

      return date.toLocaleString(lang, { // <-- if [] empty will auto search locale
        weekday: length, // <-- can be long or short
      });
    }
  }
  // toDayName(length, lang) <-- example
}
