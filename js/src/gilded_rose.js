/*jshint esversion: 6 */

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

// NOTE: avoid manually setting values to max of 50 - DRY.
// LOGIC: Update everything for readability, bc it's dangerous to add new functionality to unreadable code.
function update_quality() {  // General approach: handle exceptional cases first, end with general case
  for (let i = 0; i < items.length; i++) {
    // start with exceptional case of Sulfuras, which is unique in value and aging
    if (items[i].name === 'Sulfuras, Hand of Ragnaros') {
      // NOTE: sell_in date does not change
      items[i].quality = 80; // NOTE: This may be unnecessary if value is ever enforced elsewhere
    } else {
      // everything else decrements a sell in value
      // LOGIC: Do this before calculating value, bc update_quality is run at the start of a new business day to determine prices
      items[i].sell_in--;
      // Aged Brie and Backstage Passes do not decrement in value like other items do
      if (items[i].name === 'Aged Brie') {
        items[i].quality = (items[i].quality >= 50) ? 50 : items[i].quality + 1;
      } else if (items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (items[i].sell_in <= 0) {
          items[i].quality = 0;
        } else if (items[i].sell_in <= 5) {
          items[i].quality = (items[i].quality + 3 <= 50) ? items[i].quality + 3 : 50;
        } else if (items[i].sell_in <= 10) {
          items[i].quality = (items[i].quality + 2 <= 50) ? items[i].quality + 2 : 50;
        } else {
          items[i].quality = (items[i].quality + 1 <= 50) ? items[i].quality++ : 50;
        }
      } else {
        // NOTE: This is for the normal case - items which diminish in quality as sell in decreases
        let decreaseBy = (items[0].sell_in > 0) ? 1 : 2;
        // this is where we decrement value by two if item name begins with "Conjured."
          // putting this on a separate line for readability--to avoid two ternaries on the same line.
        decreaseBy = (/Conjured /.test(items[i].name)) ? decreaseBy * 2 : decreaseBy;
        items[i].quality = (items[i].quality - decreaseBy > 0) ? items[i].quality - decreaseBy : 0;
      }
    }
  }
}
