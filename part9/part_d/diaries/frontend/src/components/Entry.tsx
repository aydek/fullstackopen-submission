const Entry = ({ date, weather, visibility, comment }: { date: string; weather: string; visibility: string; comment: string }) => {
    return (
        <div>
            <p>
                <strong>{date}</strong>
            </p>
            <div>visibility: {visibility}</div>
            <div>weather: {weather}</div>
            <div>comment: {comment}</div>
        </div>
    );
};

export default Entry;
