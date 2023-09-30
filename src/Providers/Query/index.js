import {useLocation} from "react-router-dom";
import {useDatabase} from "../Database";
import {useMemo} from "react";

export default function useQuery() {
    const { search } = useLocation();
    const {requestDetail} = useDatabase();
    return useMemo(() => {
        const queryObject = new URLSearchParams(search);
        if (queryObject.get("id")) {
            requestDetail({_id: queryObject.get("id")});
            return queryObject;
        }
    }, [search]);
}