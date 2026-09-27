import Card from 'react-bootstrap/Card';

function WelcomeCard() {
    const fullName = 'Nguyễn Văn An';
    const birthYear = 2005;
    const currentYear = 2026;
    const major = 'Software Engineering';
    const hour = new Date().getHours();

    let session = 'sáng';

    if (hour >= 12) {
        session = 'chiều';
    }

    if (hour >= 18) {
        session = 'tối';
    }

    const age = currentYear - birthYear;

    const greeting = `Chào buổi ${session}, ${fullName}!`;

    const borderClass = age >= 18
        ? 'border-success'
        : 'border-warning';

    return (
        <Card className={`shadow-sm ${borderClass}`}>
            <Card.Body>
                <Card.Title>{greeting}</Card.Title>
                <Card.Text>
                    You are {age} years old and studying {major}.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default WelcomeCard;