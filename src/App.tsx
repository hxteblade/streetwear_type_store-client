import AppRouter from './components/AppRouter'
import './App.css'
import { useAppDispatch, useAppSelector } from "./hook/UserHook";
import { clickLogin } from "./store/slice/modalSlice";
import { check } from "./store/slice/userSlice";
import { useEffect, useRef } from 'react'
import NavBar from './components/UI/NavBar/NavBar';
import Auth from "./pages/Auth/Auth";
import { Modal } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();
  const visible = useAppSelector(state => state.modal)
  const divRef = useRef<HTMLDivElement>(null)

  const openModal = () => {
    dispatch(clickLogin());
  };

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  return (
    <div className='container'>
      <NavBar />
      <Modal
        open={visible.checkedLogin}
        onClose={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Auth ref={divRef}> </Auth>
      </Modal>
      <AppRouter/>
    </div>
  );
}

export default App;