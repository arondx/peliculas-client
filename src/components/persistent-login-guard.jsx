import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { selectIsPersisted, selectCurrentToken, setCredentials } from "../features/auth/auth-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLazyRefreshQuery } from "../features/auth/auth-api-slice";
import PageLoader from "./page-loader";

function PersistentLoginGuard() {

    const [ trigger ] = useLazyRefreshQuery()
    const [isLoading, setIsLoading] = useState(true)
    const persist = useSelector(selectIsPersisted)
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch()

    useEffect(() => {
        const refresh = async () => {
            console.log('in')
            try {
                const userData = await trigger().unwrap()
                console.log('User data', userData)
                dispatch(setCredentials(userData))
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }

        !token && persist ? refresh() : setIsLoading(false)
    },[])

  return (
    <>
        {!persist
            ? <Outlet />
            : isLoading
                ? <PageLoader />
                : <Outlet />
        }
    </>
  )
}

export default PersistentLoginGuard