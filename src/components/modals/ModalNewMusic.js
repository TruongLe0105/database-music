import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addInfoNewMusic, updateInfoNewMusic } from '../../features/apis/NewMusicSlice';
import ButtonPrimary from '../buttons/ButtonPrimary';

function ModalNewMusic({
    setOpenModal,
    currentModal,
    id,
    targetInfo,
    setCurrentCard,
}) {
    const [data, setData] = useState({
        genres: "",
        singer: "",
        image: "",
    });

    console.log({ targetInfo })

    const dispatch = useDispatch();

    const hanleChangeInput = (e, input) => {
        const value = e.target.value;
        switch (input) {
            case "genres":
                setData({ ...data, genres: value.trim() })
                break;
            case "singer":
                setData({ ...data, singer: value.trim() })
                break;
            case "image":
                setData({ ...data, image: value.trim() })
                break;
            default:
                break;
        };
    };
    const handleSubmit = () => {
        console.log("submit", data);
        console.log({ id });

        if (currentModal === "UPDATE") {
            dispatch(updateInfoNewMusic(id, data)).then(() => {
                setOpenModal(false);
                setCurrentCard(null);
            })
        } else {
            const inValid = Object.values(data).some((item) => !item);
            if (!inValid) {
                dispatch(addInfoNewMusic(data));
                setOpenModal(false);
            } else {
                return toast.error("Fields can not empty!");
            }
        }
    };

    return (
        <div className='wrapper-add-categories'>
            <form action='#' className='form-add-categories'>
                <i onClick={() => setOpenModal(false)} className="fa-solid fa-close close-modal-categories" />
                <div className="wrapper-item-input input-category">
                    <label htmlFor="genres">Genres*</label>
                    <input
                        placeholder={currentModal === "UPDATE" ? targetInfo?.genres : undefined}
                        onChange={(e) => hanleChangeInput(e, "genres")}
                        id="genres"
                        name="genres"
                    />
                </div>
                <div className="wrapper-item-input input-category">
                    <label htmlFor="singer">Singer*</label>
                    <input
                        placeholder={currentModal === "UPDATE" ? targetInfo?.singer : undefined}
                        onChange={(e) => hanleChangeInput(e, "singer")}
                        id="singer"
                        name="singer"
                    />
                </div>
                <div className="wrapper-item-input input-category">
                    <label htmlFor="image">Image*</label>
                    <input
                        placeholder={currentModal === "UPDATE" ? targetInfo?.image : undefined}
                        onChange={(e) => hanleChangeInput(e, "image")}
                        id="image"
                        name="image"
                    />
                </div>
                <div className="btn-add-category">
                    <ButtonPrimary handleSubmit={handleSubmit}>{currentModal === "ADD" ? "Add" : "Update"}</ButtonPrimary>
                </div>
            </form>
        </div>
    )
}

export default ModalNewMusic