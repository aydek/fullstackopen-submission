interface Props {
    exercises: number;
}
const Total = ({ exercises }: Props) => {
    return <div>Number of exercise {exercises}</div>;
};

export default Total;
