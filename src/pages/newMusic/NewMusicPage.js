import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
import ModalDelete from '../../components/modals/ModalDelete';
import ModalNewMusic from '../../components/modals/ModalNewMusic';
import { deleteInfoNewMusic, getListNewMusic } from '../../features/apis/NewMusicSlice';
import './index.css';

function NewMusicPage() {
    const [currentModal, setCurrentModal] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);
    const [targetInfo, setTargetInfo] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const { list, isAdd, isUpdated, isDeleted } = useSelector(state => state.newMusic);
    const dispatch = useDispatch();
    const currentMonth = new Date().getMonth() + 1;

    console.log({ list })

    useEffect(() => {
        dispatch(getListNewMusic());
    }, [isAdd, isUpdated, isDeleted])

    const tabs = [
        {
            // key: 'v_pop',
            title: `V-Pop tháng ${currentMonth}`,
            singer: "Only c, Hoàng Thùy Linh, Hoàng Dũng...",
            image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/0/0/d/800d43029b6e8cad5f7c838afc4b0af2.jpg   ",
        },
        {
            // key: 'us_uk',
            singer: "Elton John, Britney Spears, Beyoncé...",
            title: `US-UK tháng ${currentMonth}`,
            image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/d/a/e/fdae414de10e867fc85f8ee583467630.jpg"
        },
        {
            // key: 'k_pop',
            title: `K-Pop tháng ${currentMonth}`,
            singer: "newJeans, BLACKPINK, SNSD",
            image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/3/d/7/0/3d700ca94ce5452b0ac5f7c8cbf2fd55.jpg",
        },
        {
            // key: 'c_pop',
            title: `C-Pop tháng ${currentMonth}`,
            singer: "Thái Thời khôn, Thời Đại Thiếu Niên Đoàn, Dian Deng...",
            image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/9/0/b/a/90bafbdc48d4f4be096a3e4aa8f45d86.jpg",
        },
    ];

    //functions
    const handleCancel = (e) => {
        e.stopPropagation();
        setCurrentCard(null);
    };

    const setCardChanged = (item) => {
        setCurrentCard(item?._id);
        setTargetInfo(item);
    };

    const handleUpdateCategory = (item) => {
        setCurrentModal("UPDATE");
        setOpenModal(true);
    };

    const handleAddInfo = () => {
        setCurrentModal("ADD");
        setOpenModal(true);
        setCurrentCard(null);
    }

    return (
        <div className='component-general'>
            <div className="title-header">New Music</div>
            <div className="btn-new">
                <div className="btn-categories" onClick={handleAddInfo}>
                    <i className="fa-solid fa-circle-plus"></i>
                    <ButtonPrimary>Add New Info</ButtonPrimary>
                </div>
                {
                    currentCard && (
                        <>
                            <div onClick={handleUpdateCategory} className="btn-categories">
                                <i className="fa-solid fa-pen-to-square"></i>
                                <ButtonPrimary>Update Category</ButtonPrimary>
                            </div>
                            <div onClick={() => setOpenModalDelete(true)} className="btn-categories">
                                <i className="fa-solid fa-trash"></i>
                                <ButtonPrimary>Delete Category</ButtonPrimary>
                            </div>
                        </>
                    )
                }
            </div>
            <div className='tabs-new_music'>
                {list?.map((item, index) => (
                    <div key={index} className="card-has-singer">
                        <div className="img-has-singer"
                            onClick={() => setCardChanged(item)}
                            style={{
                                boxShadow: item._id === currentCard && "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px",
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
                                {item?.genres}
                            </a>
                            <a
                                href="/#"
                                className="singer-card"
                            >
                                {item?.singer}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {
                openModal &&
                <ModalNewMusic
                    setOpenModal={setOpenModal}
                    currentModal={currentModal}
                    id={currentCard}
                    targetInfo={targetInfo}
                    setCurrentCard={setCurrentCard}
                />
            }
            {
                openModalDelete &&
                <ModalDelete
                    setCurrentCard={setCurrentCard}
                    setOpenModalDelete={setOpenModalDelete}
                    id={currentCard}
                    callback={deleteInfoNewMusic}
                />
            }
        </div>
    )
};

export default NewMusicPage;