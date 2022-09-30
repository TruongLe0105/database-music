import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteCategory } from '../../features/apis/CategoriesSlice';
import ButtonPrimary from '../buttons/ButtonPrimary'
import ButtonSecondary from '../buttons/ButtonSecondary'

function ModalDelete({
    setCurrentCard,
    setOpenModalDelete,
    id,
    callback
}) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(callback(id)).then(() => {
            setOpenModalDelete(false);
            setCurrentCard(null);
        });
    };

    return (
        <div className="modal-delete-pg">
            <div className="modal-delete">
                <i onClick={() => setOpenModalDelete(false)} className="fa-solid fa-close close-modal-categories" />
                <div className="confirm-delete">Xác nhận xóa?</div>
                <div className="button-group">
                    <div className="cancel-btn" onClick={() => setOpenModalDelete(false)}>
                        <ButtonPrimary>Khoan! Để xem lại...</ButtonPrimary>
                    </div>
                    <div onClick={handleDelete}>
                        <ButtonPrimary>Ngay và luôn</ButtonPrimary>
                    </div>
                    {/* <div>Ngay và luôn</div> */}
                </div>
            </div>
        </div>
    )
}

export default ModalDelete