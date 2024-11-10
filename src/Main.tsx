import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import "./Main.css";

type RepositoryData = {
    name: string;
    description: string;
    subscribers_count: number;
    stargazers_count: number;
    forks_count: number;
}

function Main() {
    const navigate = useNavigate();
    const {data, error, isLoading, isError, isSuccess} = useQuery<RepositoryData, Error>({
        queryKey: ["repoData"],
        queryFn: () =>
            fetch("https://api.github.com/repos/TanStack/query")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                }),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const onClickBtn = () => {
        navigate("/cashingtest");
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>An error has occurred: {error.message}</div>;

    return (
        <div>
            {isSuccess && data && (
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                    <strong>👀 {data.subscribers_count}</strong>{" "}
                    <strong>✨ {data.stargazers_count}</strong>{" "}
                    <strong>🍴 {data.forks_count}</strong>
                </div>
            )}
            <button onClick={onClickBtn}>Go Test Cashing Page</button>
        </div>
    );
}

export default Main;
