import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
import ModalCategories from '../../components/modals/ModalCategories';
import ModalDelete from '../../components/modals/ModalDelete';
import { deleteCategory, getListCategories } from '../../features/apis/CategoriesSlice';
import "./index.css";

const tabs = [
    {
        moods_action: "Tâm Trạng Và Hoạt Động"
    },
    {
        countries: "Quốc Gia"
    },
    {
        romantic_bolero: "Trữ Tình Và Bolero"
    },
    {
        edm: "EDM"
    },
    {
        remix: "Remix"
    },
    {
        hiphop: "HipHop"
    },
    {
        r_b: "R&B"
    },
    {
        music_film: "Nhạc Phim"
    },
    {
        india: "India"
    },
    {
        guitar: "Guitar"
    },
    {
        none_lyrics: "Nhạc Không Lời"
    },
    {
        acoustic: "Acoustic"
    },
    {
        immortalMusic_VN: "Nhạc Việt Bất Hủ"
    },
    {
        music_Trinh: "Nhạc Trịnh"
    },
    {
        jazz: "Jazz"
    },
    {
        rock: "Rock"
    },
    {
        latin: "Latin"
    },
    {
        piano: "Piano"
    },
    {
        classicMusic: "Nhạc Cổ Điển"
    },
    {
        immortalMusic_US_UK: "Nhạc Âu Mỹ Bất Hủ"
    },
];

function CategoryPage() {
    const { categories, isDeleted, isPost, isUpdated } = useSelector(state => state.category);

    const [currentTab, setCurrentTab] = useState(tabs[0]);

    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [currentModal, setCurrentModal] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);

    const [active, setActive] = useState(0);
    const [targetCategory, setTargetCategory] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const key = Object.keys(currentTab)[0].toLowerCase();
        dispatch(getListCategories(key));
    }, [currentTab, isPost, isDeleted, isUpdated]);

    //Functions
    const clicktab = (tab, index) => {
        const key_api = Object.values(tab)[0];
        const key_find = tabs.find(item => Object.values(item)[0] === key_api);
        setActive(index);
        setCurrentTab(key_find);
        setCurrentCard(null);
    };

    const setCardChanged = (item) => {
        setCurrentCard(item?._id);
        setTargetCategory(item);
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        setCurrentCard(null);
    };

    const handleAddCategory = () => {
        setCurrentModal("ADD");
        setOpenModal(true);
    }

    const handleUpdateCategory = (item) => {
        setCurrentModal("UPDATE");
        setOpenModal(true);
    };

    //Components
    const Category = ({ data }) => {
        return (
            <div className="scroll-view-categories">
                <div className="wrapper-card-scroll">
                    {
                        data?.map((item, index) => (
                            Object.keys(currentTab)[0] === "moods_action" ||
                                Object.keys(currentTab)[0] === "countries" ?
                                (
                                    <div
                                        key={index}
                                        className="card-item-category"
                                        onClick={() => setCardChanged(item)}
                                        style={{
                                            boxShadow: item._id === currentCard && "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px"
                                        }}
                                    >
                                        {
                                            item._id === currentCard &&
                                            <i className="fa-solid fa-ban cancel-icon"
                                                onClick={(e) => handleCancel(e)}
                                            ></i>
                                        }
                                        <img
                                            src={item?.image}
                                            alt="img" className="img"
                                        />
                                        <div
                                            className="title-card"
                                            style={{
                                                top: Object.keys(currentTab)[0] === "countries" && "70%"
                                            }}
                                        >{item?.title}</div>
                                        {
                                            Object.keys(currentTab)[0] === "moods_action" &&
                                            <div className="icon-group-card">
                                                <img src={item?.banner_first}
                                                    alt="img"
                                                    className="img-group"
                                                />
                                                <img src={item?.banner_second}
                                                    alt="img"
                                                    className="img-group"
                                                />
                                                <img src={item?.banner_third}
                                                    alt="img"
                                                    className="img-group"
                                                />
                                            </div>
                                        }
                                    </div>
                                ) : (
                                    <div key={index} className="card-has-singer">
                                        <div className="img-has-singer"
                                            onClick={() => setCardChanged(item)}
                                            style={{
                                                boxShadow: item._id === currentCard && "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px"
                                            }}
                                        >
                                            {
                                                item._id === currentCard &&
                                                <i
                                                    className="fa-solid fa-ban cancel-icon"
                                                    onClick={(e) => handleCancel(e)}
                                                ></i>
                                            }
                                            <img
                                                src={item?.image}
                                                alt="img" className="img"
                                            />
                                        </div>
                                        <div className="wrapper-link">
                                            <a
                                                href="/#"
                                                className="title-card-song"
                                            >
                                                {item?.title}
                                            </a>
                                            <a
                                                href="/#"
                                                className="singer-card"
                                            >
                                                {item?.singer}
                                            </a>
                                        </div>
                                    </div>
                                )
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='home'>
            <div className="tabs-category">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        onClick={() => clicktab(tab, index)}
                    >
                        <div
                            className="tab"
                            style={{
                                backgroundColor: index === active && "red"
                            }}
                        >{Object.values(tab)}</div>
                    </div>
                ))}
            </div>
            <div className="btn-update_delete">
                {
                    currentCard && (
                        <>
                            <div onClick={() => setOpenModalDelete(true)} className="btn-categories">
                                <i className="fa-solid fa-trash"></i>
                                <ButtonPrimary>Delete Category</ButtonPrimary>
                            </div>
                            <div onClick={handleUpdateCategory} className="btn-categories">
                                <i className="fa-solid fa-pen-to-square"></i>
                                <ButtonPrimary>Update Category</ButtonPrimary>
                            </div>
                        </>
                    )
                }
                <div className="btn-categories" onClick={handleAddCategory}>
                    <i className="fa-solid fa-circle-plus"></i>
                    <ButtonPrimary>Add Category</ButtonPrimary>
                </div>
            </div>
            <div className="wrapper-cards">
                <Category data={categories} />
            </div>
            {
                openModal &&
                <ModalCategories
                    setOpenModal={setOpenModal}
                    currentTab={currentTab}
                    currentModal={currentModal}
                    currentCard={currentCard}
                    targetCategory={targetCategory}
                />
            }
            {
                openModalDelete &&
                <ModalDelete
                    setCurrentCard={setCurrentCard}
                    setOpenModalDelete={setOpenModalDelete}
                    id={currentCard}
                    callback={deleteCategory}
                />
            }
        </div>
    )
};

export default CategoryPage;