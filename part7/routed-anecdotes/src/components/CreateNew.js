import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
    const content = useField('text');
    const author = useField('text');
    const info = useField('text');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });
        navigate('/');
    };

    const resetForm = (e) => {
        e.preventDefault();
        content.resetValue();
        author.resetValue();
        info.resetValue();
    };

    const { resetValue: contentReset, ...contentProps } = content;
    const { resetValue: authorReset, ...authorProps } = author;
    const { resetValue: infoReset, ...infoProps } = info;

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name="content" {...contentProps} />
                </div>
                <div>
                    author
                    <input name="author" {...authorProps} />
                </div>
                <div>
                    url for more info
                    <input name="info" {...infoProps} />
                </div>
                <button type="submit">create</button>
                <button onClick={resetForm}>reset</button>
            </form>
        </div>
    );
};

export default CreateNew;
