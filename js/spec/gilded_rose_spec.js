describe("Gilded Rose", function() {

  it("should handle fixed value of 80 for Sulfuras ", function() {
    items = [ new Item("Sulfuras, Hand of Ragnaros", 80, 0) ];
    update_quality();
    expect(items[0].quality).toEqual(80);
  });

  it("should handle no sell in value for Sulfuras ", function() {
    items = [ new Item("Sulfuras, Hand of Ragnaros", 80, 0) ];
    update_quality();
    const isNaN = Object.is(items[0].sell_in, NaN)
    expect(isNaN).toEqual(true);
  });

});
