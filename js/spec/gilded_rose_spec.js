/*jshint esversion: 6 */

describe("Gilded Rose", function() {

  it("should handle fixed quality of 80 for Sulfuras ", function() {
    items = [ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(80);
  });

  it("should handle quality of Aged Brie increased by one before sell_in date", function() {
    items = [ new Item("Aged Brie", 10, 40) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(41);
  });

  it("should handle increased quality of Aged Brie by two after sell_in date", function() {
    items = [ new Item("Aged Brie", -1, 40) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(41);
  });

  it("should handle inceased quality of backstage passes by one when more than 10 sell_in", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 12, 40) ];
    update_quality();
    expect(items[0].sell_in).toEqual(11);
    expect(items[0].quality).toEqual(41);
  });

  it("should handle increased quality of backstage passes by two when fewer than 11 sell_in", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 11, 40) ];
    update_quality();
    expect(items[0].sell_in).toEqual(10);
    expect(items[0].quality).toEqual(42);
  });

  it("should handle increased quality of backstage passes by three when fewer than 5 sell_in", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40) ];
    update_quality();
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(43);
  });

  it("should handle zero quality of backstage passes with 0", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(0);
  });

  it("should handle zero quality of backstage passes with negative sell_in", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", -5, 40) ];
    // NOTE: This is a test; a Backstage Pass that's -5 sell_in should normally have quality 0.
    update_quality();
    expect(items[0].sell_in).toEqual(-6);
    expect(items[0].quality).toEqual(0);
  });

  it("should handle neither Aged Brie nor Backstage Passes becoming greater than 50 quality ", function() {
    items = [
      new Item("Aged Brie", 0, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50)
    ];
    update_quality();
    var result = items.filter(item => item.quality > 50);
    expect(result.length).toEqual(0);
  });

  // NOTE: "Normal" here means not Sulfuras, Aged Brie, Backstage Passes, or Conjured
  it("should handle a normal item decreasing in quality by one before sell_in is 0", function() {
    items = [ new Item("+5 Dexterity Vest", 10, 20) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(19);
  });

  it("should handle another normal item decreasing in quality by one before sell_in is 0", function() {
    items = [ new Item("Elixir of the Mongoose", 5, 7) ];
    update_quality();
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(6);
  });

  it("should handle a normal item decreasing in quality by two after sell_in is 0", function() {
    items = [ new Item("Elixir of the Mongoose", 0, 7) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(5);
  });

  it("should handle a normal item not decreasing in quality below 0", function() {
    items = [ new Item("Elixir of the Mongoose", 10, 0) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(0);
  });

  it("should handle a Conjured item decreasing in quality twice as fast before sell_in is 0", function() {
    items = [ new Item("Conjured Mana Cake", 3, 6) ];
    update_quality();
    expect(items[0].sell_in).toEqual(2);
    expect(items[0].quality).toEqual(4);
  });

  it("should handle a Conjured item decreasing in quality twice as fast after sell_in is 0", function() {
    items = [ new Item("Conjured Mana Cake", 0, 10) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(6);
  });

  it("should handle a Conjured item not decreasing in quality below 0", function() {
    items = [ new Item("Conjured Mana Cake", 10, 0) ];
    update_quality();
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(0);
  });
});
