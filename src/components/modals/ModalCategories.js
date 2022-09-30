import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewCategories, updateCategory } from '../../features/apis/CategoriesSlice';
import ButtonPrimary from '../buttons/ButtonPrimary';

function ModalCategories({
    setOpenModal,
    currentTab,
    currentModal,
    currentCard,
    targetCategory
}) {
    const [data, setData] = useState({
        category: Object.keys(currentTab)[0],
        title: "",
        singer: "",
        image: "",
        banner_first: "",
        banner_second: "",
        banner_third: "",
    });

    const dispatch = useDispatch();

    //Functions
    const hanleChangeInput = (e, input) => {
        const value = e.target.value;
        console.log("value", value)
        console.log("input", input)
        switch (input) {
            case "title":
                setData({ ...data, title: value.trim() })
                break;
            case "singer":
                setData({ ...data, singer: value.trim() })
                break;
            case "image":
                setData({ ...data, image: value.trim() })
                break;
            case "banner_first":
                setData({ ...data, banner_first: value.trim() })
                break;
            case "banner_second":
                setData({ ...data, banner_second: value.trim() })
                break;
            case "banner_third":
                setData({ ...data, banner_third: value.trim() })
                break;
            default:
                break;
        };
    }

    const handleSubmit = () => {
        if (currentModal === "UPDATE") {
            dispatch(updateCategory(currentCard, data)).then(() => {
                setOpenModal(false);
                currentCard(null);
            })
        } else {
            const inValid = Object.values(data).some((item) => !item);
            if (!inValid) {
                dispatch(addNewCategories(data));
                setOpenModal(false);
            } else {
                return toast.error("Fields can not empty!");
            }
        }
    };

    return (
        <div className="wrapper-add-categories">
            <form action="#" className="form-add-categories" >
                <i onClick={() => setOpenModal(false)} className="fa-solid fa-close close-modal-categories" />
                <div className="wrapper-item-input input-category">
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        name="category"
                        value={Object.values(currentTab)[0]}
                        disabled
                    />
                </div>
                <div className="wrapper-item-input input-category">
                    <label htmlFor="image">Image</label>
                    <input
                        autoFocus
                        autoComplete="off"
                        id="image"
                        name="image"
                        placeholder={currentModal === "UPDATE" ? targetCategory.image : undefined}
                        onChange={(e) => hanleChangeInput(e, "image")}
                    />
                </div>
                <div className="wrapper-item-input input-category">
                    <label htmlFor="title">Title</label>
                    <input
                        autoComplete="off"
                        id="title"
                        name="title"
                        placeholder={currentModal === "UPDATE" ? targetCategory.title : undefined}
                        onChange={(e) => hanleChangeInput(e, "title")}
                    />
                </div>
                {
                    (data.category !== "moods_action" &&
                        data.category !== "countries") && (
                        <div className="wrapper-item-input input-category">
                            <label htmlFor="singer">Singer</label>
                            <input
                                autoComplete="off"
                                id="singer"
                                name="singer"
                                placeholder={currentModal === "UPDATE" ? targetCategory.singer : undefined}
                                onChange={(e) => hanleChangeInput(e, "singer")}
                            />
                        </div>
                    )
                }
                {
                    data.category === "moods_action" && (
                        <>
                            <div className="wrapper-item-input input-category">
                                <label htmlFor="banner">Banner</label>
                                <input
                                    autoComplete="off"
                                    id="banner"
                                    placeholder={currentModal === "UPDATE" ? targetCategory.banner_first : undefined}
                                    onChange={(e) => hanleChangeInput(e, "banner_first")}
                                />
                            </div>
                            <div className="wrapper-item-input input-category">
                                <input
                                    placeholder={currentModal === "UPDATE" ? targetCategory.banner_second : undefined}
                                    onChange={(e) => hanleChangeInput(e, "banner_second")}
                                    style={{ margin: "1rem 0" }}
                                />
                            </div>
                            <div className="wrapper-item-input input-category">
                                <input
                                    placeholder={currentModal === "UPDATE" ? targetCategory.banner_third : undefined}
                                    onChange={(e) => hanleChangeInput(e, "banner_third")}
                                />
                            </div>
                        </>
                    )
                }
                <div className="btn-add-category">
                    <ButtonPrimary handleSubmit={handleSubmit}>{currentModal === "ADD" ? "Add" : "Update"}</ButtonPrimary>
                </div>
            </form>
        </div>
    )
};

export default ModalCategories;