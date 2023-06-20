const Entry = ({ date, weather, visibility, comment }: { date: string; weather: string; visibility: string; comment: string }) => {
    return (
        <div>
            <p>
                <h3>{date}</h3>
            </p>
            <div>visibility: {visibility}</div>
            <div>weather: {weather}</div>
            <div>comment: {comment}</div>
        </div>
    );
};

export default Entry;
