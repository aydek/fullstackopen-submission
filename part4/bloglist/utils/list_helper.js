const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
    },
];

const totalLikes = (blogs) => {
    return blogs.reduce((sum, current) => sum + current.likes, 0);
};

const favoriteBlog = (blogs) => {
    let favorite = null;
    let mostLikes = 0;
    for (const blog of blogs) {
        if (blog.likes > mostLikes) {
            mostLikes = blog.likes;
            favorite = blog;
        }
    }

    return favorite;
};

const mostBlogs = (blogs) => {
    let authors = [];
    for (const blog of blogs) {
        if (!authors.length) {
            authors.push({ author: blog.author, blogs: 1 });
            continue;
        }
        const index = authors.findIndex((obj) => obj.author === blog.author);
        if (index > -1) authors[index].blogs += 1;
        else authors.push({ author: blog.author, blogs: 1 });
    }

    const ammounts = authors.map((ammount) => ammount.blogs);
    const highestAmount = Math.max(...ammounts);
    return authors.find((author) => author.blogs === highestAmount);
};

const mostLikes = (blogs) => {
    let favorite = null;
    let mostLikes = 0;
    for (const blog of blogs) {
        if (blog.likes > mostLikes) {
            mostLikes = blog.likes;
            favorite = blog;
        }
    }
    return { author: favorite.author, likes: favorite.likes };
};

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogs,
};
