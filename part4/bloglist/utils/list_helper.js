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
};
