import {FC, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import cl from './NavBar.module.scss'
import { useAppDispatch, useAppSelector } from "../../../hook/UserHook";
import { clickLogin } from "../../../store/slice/modalSlice";

const NavBar : FC = () => {

    const AuthUser = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [user,setUser] = useState<{auth: boolean, role: null | string}>({auth: false, role: null});

    useEffect(() => {
        setUser({auth: AuthUser.auth, role: AuthUser.role});
    }, [AuthUser])

    const clicked = () => {
        dispatch(clickLogin());
    };

    return (
        <header>
            <div className={cl.logo}><div className={cl.img}></div></div>
            <Link to='/main'>main</Link>
            {user.auth
                ? <Link to='/basket'>basket</Link>
                : <></>
            }
            <button onClick={clicked}>login</button>
            {user.role === 'ADMIN' && user.auth
            ?<Link to='/admin'><button>admin</button></Link>
            :<></>            
            };
        </header>
    );
};

export default NavBar;