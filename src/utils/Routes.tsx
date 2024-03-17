import { ReactElement } from "react";
import Admin  from "../pages/Admin/Admin";
import Backet from "../pages/Basket/Backet";
import Shop from "../pages/Shop/Shop";
import ItemPage from "../pages/ItemPage/ItemPage"

interface IRoute {
    path: string,
    element: ReactElement
}

export const privateRoutes : IRoute[] = [
    {path: '/admin', element: <Admin/>},
    {path: '/basket', element: <Backet/>},
]
export const publicRoutes : IRoute[] = [
    {path: "*", element : <Shop/>},
    {path: "/main", element : <Shop/> },
    {path: "/item/:id", element : <ItemPage/> }
]