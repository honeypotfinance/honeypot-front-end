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


  // cutString =========================================================================================================//
  if (!String.prototype.cutString) {
    String.prototype.cutString = function(start = 7, end = 4) {
      if (this.length > start + end) return `${this.substring(0, start)}...${this.substring(this.length - end, this.length)}`;
      return this
    }
  }
  // string.cutString(start, end) <-- example


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


  // formatter =========================================================================================================//
  if (!Number.prototype.formatter) {
    Number.prototype.formatter = function(bloqMayus, decimals = 1) {
      if (Math.abs(this) > 999999999) {
        return `${Math.sign(this)*((Math.abs(this)/1000000000).toFixed(decimals))}${bloqMayus ? 'B' : 'b'}`
      } else if (Math.abs(this) > 999999) {
        return `${Math.sign(this)*((Math.abs(this)/1000000).toFixed(decimals))}${bloqMayus ? 'M' : 'm'}`
      } else if (Math.abs(this) > 999) {
        return `${Math.sign(this)*((Math.abs(this)/1000).toFixed(decimals))}${bloqMayus ? 'K' : 'k'}`
      } else {
        return Math.sign(this)*Math.abs(this)
      }
    }
  }
  // formatter(number) <-- example
}
