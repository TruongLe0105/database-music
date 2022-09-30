import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
import ButtonSecondary from '../../components/buttons/ButtonSecondary';
import ModalCategories from '../../components/modals/ModalCategories';
import ModalDelete from '../../components/modals/ModalDelete';
import { deleteCategory, getListCategories } from '../../features/apis/CategoriesSlice';
import listGenres from '../../features/GenresListImage';
import "./index.css";

// const {
//     pop,
//     asiaop,
//     blues,
//     country,
//     eastern,
//     soul,
//     folk,
//     hiphop,
//     jazz,
//     latin,
//     popular,
//     rb,
//     rock,
//     traditional,
// } = listGenres;

// const LIST = [
//     {
//         title: "Pop",
//         image: pop,
//     },
//     {
//         title: "Music of Asiaop",
//         image: asiaop,
//     },
//     {
//         title: "Blues",
//         image: blues,
//     },
//     {
//         title: "Country",
//         image: country,
//     },
//     {
//         title: "Soul music",
//         image: soul,
//     },
//     {
//         title: "Folk music",
//         image: folk,
//     },
//     {
//         title: "Hiphop",
//         image: hiphop,
//     },
//     {
//         title: "Jazz",
//         image: jazz,
//     },
//     {
//         title: "Latin American",
//         image: latin,
//     },
//     {
//         title: "Popular music",
//         image: popular,
//     },
//     {
//         title: "R&B",
//         image: rb,
//     },
//     {
//         title: "Rock music",
//         image: rock,
//     },
//     {
//         title: "Traditional",
//         image: traditional,
//     },
//     {
//         title: "Middle Eastern",
//         image: eastern,
//     },
// ];

// const moods_action = [
//     {
//         title: "Tâm Trạng Và Hoạt Động",
//         genres: "CÀ PHÊ",
//         info: {
//             img_bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMpqXw5iaGaVzqT9SJT-zTdCGbPLl8npA0TQ&usqp=CAU",
//             img_sm: [
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/2/1/a/3/21a3f531321095bf9ef815bb00a26b27.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/3/2/c/c/32cc55e88eaed622d81072a3f0e89ceb.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/4/5/d/0/45d0623a95d382c0287038631e561965.jpg",
//             ],
//         }
//     },
//     {
//         title: "Tâm Trạng Và Hoạt Động",
//         genres: "SPA - YOGA",
//         info: {
//             img_bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlBWPUbxxJhagPTPztMYKZ94E-eisIAhbwSg&usqp=CAU",
//             img_sm: [
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/6/7/0/f/670f2846fbafcd6cac859fc35debaa98.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/f/0/c/ff0c7e32e0e2cb133839ab14cda1f377.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/6/4/d/e64de85e8c9283de2d19c80631f7bbbb.jpg",
//             ],
//         }
//     },
//     {
//         title: "Tâm Trạng Và Hoạt Động",
//         genres: "DRIVING",
//         info: {
//             img_bg: "https://res.cloudinary.com/deg3ts6ui/image/upload/v1663128657/sheog9n3gisie55qgynv.jpg",
//             img_sm: [
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/b/f/9/3/bf93f8be9b1c0eccf8ed4e3302469cf8.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/4/2/1/9/4219d11c50c6e608a78642eefd78f473.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/5/1/f/4/51f46215a19e197dd9c2ee8cd866e292.jpg",
//             ],
//         }
//     },
//     {
//         title: "Tâm Trạng Và Hoạt Động",
//         genres: "GIAI ĐIỆU BUỒN",
//         info: {
//             img_bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS90m87Ou9m5Pkvi-UXjKvMVO1Fs7467lwVkg&usqp=CAU",
//             img_sm: [
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/a/b/d/6/abd6bf7472c7cd6c9b36f10eda5af0a8.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/a/4/b/3/a4b379990f1d48c01857c93e8f86be88.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/d/1/2/dd125d6dce76835f6d85f754ec9ae705.jpg",
//             ],
//         }
//     },
//     {
//         title: "Tâm Trạng Và Hoạt Động",
//         genres: "WORKOUT",
//         info: {
//             img_bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQrqF_iw-G-uwrugUogK5DHxo-49OOX8-Rog&usqp=CAU",
//             img_sm: [
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/1/2/5/f125ea6135af87b56dc10d3125fa68cd.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/4/a/7/b/4a7b7a5e95463973edc800dcc51ffda2.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/3/3/c/e33c610b13a496e649e2df6f11e58c92.jpg",
//             ],
//         }
//     },
//     {
//         title: "Tâm Trạng Và Hoạt Động",
//         genres: "TẬP TRUNG",
//         info: {
//             img_bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW4C0yJg3vYMxjz6xx4P3Olb7bxUxQ5fo8YA&usqp=CAU",
//             img_sm: [
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/3/8/f/a/38fa3aa5236ba7b1a1efb1f446ef0370.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/5/c/2/6/5c268eb2511045a2a52c336bbda20514.jpg",
//                 "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/3/c/0/5/3c05212cdf8e866f312b762dc3ccb3e3.jpg",
//             ],
//         }
//     },
// ];

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
]

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
                                            <i
                                                className="fa-solid fa-ban cancel-icon"
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