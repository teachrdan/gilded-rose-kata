/*jshint esversion: 6 */

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

// Assumptions:
  // 1. Decrement sell_in before calculating quality, bc update_quality is meant to be run at the start of a new business day to determine prices for that day.
  // 2. To "increase in quality" means to increment by one. We know this from the description of how Backstage Passes increase more quickly, starting at increasing by two. Therefore the default must be less than two.
  // 3. However, "degrade in quality" is never specified, so I set it as one below. This is a magic number: https://en.wikipedia.org/wiki/Magic_number_(programming)
const degradeBy = 1;
let items = [];

// NOTE: I updated everything for readability, bc it's dangerous to add new functionality to unreadable code.
  // General approach: handle exceptional cases first, end with general case
function update_quality() {
  for (let i = 0; i < items.length; i++) {
    // start with exceptional case of Sulfuras, which is unique in quality and aging
    if (items[i].name === 'Sulfuras, Hand of Ragnaros') {
      // NOTE: sell_in does not change for Sulfuras
      items[i].quality = 80; // enforce that quality is always 80
    } else {
      // everything else decrements a sell_in quality
      items[i].sell_in--;
      // Aged Brie and Backstage Passes do not decrement in quality like other items do
      if (items[i].name === 'Aged Brie') {
        items[i].quality++;
      } else if (items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (items[i].sell_in <= 0) {
          items[i].quality = 0;
        } else if (items[i].sell_in <= 5) {
          items[i].quality = items[i].quality + 3;
        } else if (items[i].sell_in <= 10) {
          items[i].quality = items[i].quality + 2;
        } else {
          items[i].quality++;
        }
      // NOTE: Below is for the normal case - items which diminish in quality as sell_in decreases
      } else {
        let decreaseBy = (items[0].sell_in > 0) ? degradeBy : degradeBy * 2;
        // this is where we decrement double if the item is "Conjured."
          // putting this on a separate line for readability--to avoid two ternaries on the same line.
        decreaseBy = (/Conjured /.test(items[i].name)) ? decreaseBy * 2 : decreaseBy;
        items[i].quality = items[i].quality - decreaseBy;
      }
      // enforce minimum/maximum qualitys: non-Sulfuras quality will never be greater than 50 or less than 0.
      items[i].quality = (items[i].quality <= 50) ? items[i].quality : 50;
      items[i].quality = (items[i].quality >= 0) ? items[i].quality : 0;
    }
  }
}
