export function Feed() {

    return (
        <div id='feed'>
            <h1 onClick={async () => {
                const results = await fetch('/api')
                const data = await results.json()
                alert(data)
            }}>Feed</h1>
        </div>
    );
}
