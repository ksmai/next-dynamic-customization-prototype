const ExampleOverride = (props) => {
    return <p style={{ color: props.data.color }}>This is ExampleOverride component: {props.data.text}</p>
}

export default ExampleOverride;