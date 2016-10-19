describe('The like filter', function () {
  var $filter;

  beforeEach(function () {
    module('pictureApp');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('should pluralize number of likes', function () {
    // Arrange.
    var foo = 0, result;

    // Act.
    result = $filter('likeFilter')(foo);

    // Assert.
    expect(result).toEqual('0 likes');
  });

  it('should pluralize number of likes', function () {
    // Arrange.
    var foo = 1, result;

    // Act.
    result = $filter('likeFilter')(foo);

    // Assert.
    expect(result).toEqual('1 like');
  });
});
