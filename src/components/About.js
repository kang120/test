import { Link } from 'react-router-dom'

function About(){
    return (
        <p style={{ textAlign: 'center' }}>
            This is first React application<br/>
            <Link to="/">Go Back</Link>
        </p>
    )
}

export default About;