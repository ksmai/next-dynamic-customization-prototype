const Component2 = ({ data, actions }) => {
    return <p style={{ color: data.color }}>
        This is Component2: {data.text}
        <button type="button" onClick={actions.action1}>Trigger Action 1</button>
    </p>;
}

export default Component2;