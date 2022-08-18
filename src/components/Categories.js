import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategories, getListCategories } from '../features/apis/CategoriesSlice';
import listGenres from '../features/GenresListImage';

const {
    pop,
    asiaop,
    blues,
    country,
    eastern,
    soul,
    folk,
    hiphop,
    jazz,
    latin,
    popular,
    rb,
    rock,
    traditional,
} = listGenres;

const LIST = [
    {
        title: "Pop",
        image: pop,
    },
    {
        title: "Music of Asiaop",
        image: asiaop,
    },
    {
        title: "Blues",
        image: blues,
    },
    {
        title: "Country",
        image: country,
    },
    {
        title: "Soul music",
        image: soul,
    },
    {
        title: "Folk music",
        image: folk,
    },
    {
        title: "Hiphop",
        image: hiphop,
    },
    {
        title: "Jazz",
        image: jazz,
    },
    {
        title: "Latin American",
        image: latin,
    },
    {
        title: "Popular music",
        image: popular,
    },
    {
        title: "R&B",
        image: rb,
    },
    {
        title: "Rock music",
        image: rock,
    },
    {
        title: "Traditional",
        image: traditional,
    },
    {
        title: "Middle Eastern",
        image: eastern,
    },
];

function Categories() {
    const { categories, isAddCategory } = useSelector(state => state.category);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getListCategories());
    // }, [isAddCategory])

    useEffect(() => {
        LIST.map(item => {
            dispatch(addNewCategories(item))
        })
    }, [])

    return (
        <div className='home'>
            <div className='wrapper-item'>
                {categories.length > 0 && categories.map((item, index) => (
                    <div className='item' key={index}>
                        <div className='title'>{item.title}</div>
                        <img className='image' src={item.image} alt={item.title} />

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories