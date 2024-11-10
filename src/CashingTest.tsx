import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

type RepositoryData = {
    language: string;
    network_count: number;
    open_issues: number;
    watchers: number;
}

const CashingTest = () => {
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
                })
    });

    const onClickBtn = () => {
        navigate("/");
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>An error has occurred: {error.message}</div>;

    return (
        <div>
            {isSuccess && data && (
                <div>
                    <h1>{data.language}</h1>
                    <p>{"network_count : " + data.network_count}</p>
                    <strong>{"oepn issues " + data.open_issues}</strong>
                    <br/>
                    <strong>👀 {data.watchers}</strong>{" "}
                </div>
            )}
            <button onClick={onClickBtn}>Go Back</button>
        </div>
    );
}

export default CashingTest;