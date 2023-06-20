import { CoursePart } from '../App';
import Part from './Part';

interface Props {
    courseParts: CoursePart[];
}

const Content = ({ courseParts }: Props) => {
    return courseParts.map((part: CoursePart) => <Part part={part} />);
};

export default Content;
