const Course = ({course}) => {
    //const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    //console.log(total);

    console.log(course)

    return (
        <div>
            <h1>Web development curriculum</h1>
            {course.map(course => (<div key={course.id}>
                <h2>{course.name}</h2>
                {course.parts.map(part => (<p key={part.id}>{part.name} - Exercises: {part.exercises}</p>))}
            </div>))}
        </div>)
}


export default Course