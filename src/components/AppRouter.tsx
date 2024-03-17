import {FC} from 'react';
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../utils/Routes";
import { useAppSelector } from '../hook/UserHook';

const AppRouter: FC = () => {
  const isAuth = useAppSelector(state => state.user.auth)
    return (
      <Routes>
          {isAuth
              ?
              <>
              {privateRoutes.map(e=>
              <Route 
                  element={e.element}
                  path={e.path}
                  key={e.path}
              />
              )}
              {publicRoutes.map(e=>
              <Route 
                  element={e.element}
                  path={e.path}
                  key={e.path}
              />
              )}
              </>
              :
              <>
              {publicRoutes.map(e=>
              <Route 
                  element={e.element}
                  path={e.path}
                  key={e.path}
              />
              )}
              </>
            }
        </Routes>
    );
};

export default AppRouter;