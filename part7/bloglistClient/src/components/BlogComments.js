import React from 'react';
import AddComment from './AddComment';

const BlogComments = ({ blog }) => {
    return (
        <div>
            <h2>Comments</h2>
            <AddComment id={blog.id} />
            {!blog.comments || blog.comments.length < 1 ? (
                <div>No comments found...</div>
            ) : (
                <ul>
                    {blog.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlogComments;
