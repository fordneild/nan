import SearchUser from "../components/SearchUser";
import CreateUser from "../components/CreateUser";
import CountUser from "../components/CountUser";

export default function Home() {
    return (
        <>
            <CreateUser />
            <SearchUser />
            <CountUser />
        </>
    );
}
