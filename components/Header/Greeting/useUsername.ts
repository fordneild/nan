import useAuthQuery from "../../../hooks/useAuthQuery";
import { GET_USER } from "../../../queries";
export default function useUsername() {
    const queryState = useAuthQuery(GET_USER);
    return {
        ...queryState,
        username: queryState?.data?.getUser?.username,
        email: queryState?.data?.getUser?.email
    };
}
