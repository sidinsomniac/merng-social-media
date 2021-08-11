import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { CURRENT_USER } from "./queries";

export const useCurrentUserQuery = (callback) => {
    const [getUser, userResult] = useLazyQuery(CURRENT_USER, {

        fetchPolicy: "network-only"

    });

    useEffect(() => {
        if (userResult.data) {
            callback(userResult.data.me);
        }
        // eslint-disable-next-line
    }, [userResult.data]);

    return { getAndSetUser: getUser };

};