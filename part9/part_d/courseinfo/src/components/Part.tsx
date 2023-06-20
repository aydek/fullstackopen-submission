import { CoursePart } from '../App';

const PartHeader = ({ name, count }: { name: string; count: number }) => {
    return (
        <div>
            <strong>
                {name} Exercise Count: {count}
            </strong>
        </div>
    );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case 'basic':
            return (
                <p>
                    <PartHeader name={part.name} count={part.exerciseCount} />
                    <div>{part.description}</div>
                </p>
            );
        case 'group':
            return (
                <p>
                    <PartHeader name={part.name} count={part.exerciseCount} />
                    <div>Group Project Count: {part.groupProjectCount}</div>
                </p>
            );
        case 'background':
            return (
                <p>
                    <PartHeader name={part.name} count={part.exerciseCount} />
                    <div>{part.description}</div>
                    <div>
                        Background Material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                    </div>
                </p>
            );
        case 'special':
            return (
                <p>
                    <PartHeader name={part.name} count={part.exerciseCount} />
                    <div>{part.description}</div>
                    <div>Requirements: {part.requirements.join(', ')}</div>
                </p>
            );
        default:
            return assertNever(part);
    }
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default Part;
