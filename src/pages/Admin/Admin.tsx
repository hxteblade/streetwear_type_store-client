import { Container, Modal } from "@mui/material";
import { FC, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hook/UserHook";
import ButtonAuthForm from "../../components/UI/Button/ButtonAuthForm";
import cl from "./Admin.module.scss";
import TypeModal from "../../components/UI/modal/TypeModal/TypeModal";
import { clickBrand, clickItemAdmin, clickType } from "../../store/slice/modalSlice";
import BrandModal from "../../components/UI/modal/BrandModal/BrandModal";
import ItemModal from "../../components/UI/modal/ItemModal/ItemModal";


const Admin: FC = () => {
    const visibleTypeModal = useAppSelector(state => state.modal.checkedTypeAdmin); 
    const visibleBrandModal = useAppSelector(state => state.modal.checkedBrandAdmin);
    const visibleItemModal = useAppSelector(state => state.modal.checkedItemAdmin);
    const typeRef = useRef<HTMLDivElement>(null);
    const brandRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    
    const closeModalType = () => {
      dispatch(clickType());
    };
    const closeModalBrand = () => {
      dispatch(clickBrand());
    };
    const closeModalItem = () => {
      dispatch(clickItemAdmin());
    };

    return (
        <Container className={cl.AdminContainer}>
          <ButtonAuthForm handler={closeModalBrand} color="white" background="black" height={15}>brand</ButtonAuthForm>
          <Modal
            open={visibleBrandModal}
            onClose={closeModalBrand}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <BrandModal ref={brandRef}> </BrandModal>
          </Modal>
          <ButtonAuthForm handler={closeModalType} color="white" background="black" height={15}>type</ButtonAuthForm>
          <Modal
            open={visibleTypeModal}
            onClose={closeModalType}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <TypeModal ref={typeRef}> </TypeModal>
          </Modal>
          <ButtonAuthForm handler={closeModalItem} color="white" background="black" height={15}>item</ButtonAuthForm>
          <Modal
            open={visibleItemModal}
            onClose={closeModalItem}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ItemModal ref={itemRef}> </ItemModal>
          </Modal>
        </Container>
    );
};

export default Admin;