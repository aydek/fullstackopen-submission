const listHelper = require('../utils/list_helper');

describe('most likes', () => {
    test('when list has only one blog, that has most amount of likes', () => {
        const result = listHelper.mostLikes(listHelper.blogs);
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 12 });
    });
});

describe('most blogs', () => {
    test('when list has only one author, that has most amount blogs', () => {
        const result = listHelper.mostBlogs(listHelper.blogs);
        expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
    });
});

describe('favorite post', () => {
    test('when list has only one blog, that has most amount of likes', () => {
        const result = listHelper.favoriteBlog(listHelper.blogs);
        expect(result).toEqual(listHelper.blogs[2]);
    });
});

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listHelper.blogs);
        expect(result).toBe(36);
    });
});
