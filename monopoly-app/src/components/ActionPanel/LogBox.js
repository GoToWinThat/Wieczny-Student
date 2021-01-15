import "../../styles/ActionPanel.css";

export const LogBox = (data) =>
{
    const logs = data.data.logs;
    return(
        <div className="d-flex justify-content-center">
            <p className="logBox overflow-auto border-dark">
                {logs.map(log => log + "\n")}
            </p>
        </div>
    )
}