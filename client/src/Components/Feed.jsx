import { useEffect } from "react";

export function Feed() {
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/');
            const data = await response.json();
            alert(data);
        })();
    }, []);

    return (
        <div id='feed'>
            <h1>Feed</h1>
        </div>
    );
}
