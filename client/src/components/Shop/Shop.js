import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch,connect} from 'react-redux'
import { getProductsToShop,getBrands, getWoods} from '../../redux/actions/products_actions'
import PageTop from '../utils/PageTop';
import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';
import {frets, price} from '../utils/Form/FixedCategories';
import LoadMoreCards from './LoadMoreCards';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'

function Shop(props) {
    const products = props.products;
    const [grid,setGrid] = useState('');
    const [limit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filters, setFilters] = useState({
        brand:[],
        frets:[],
        wood:[],
        price: []
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getWoods())
        dispatch(getProductsToShop(skip, limit, filters))
    }, [dispatch]);

    const handlePrice = (filters) => {
        const data = price;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(filters,10)){
                array = data[key].array;
            }
        }

        return array;
    }

    const showFilteredResults = (newFilters) => {
        dispatch(getProductsToShop(0, limit, newFilters))
        .then(()=>{
            setSkip(0);
        })
    }

    const handleFilters = (filters1, category) => {
        const newFilters = filters;
        newFilters[category] = filters1;

        if (category==='price'){
            let priceValue = handlePrice(filters1);
            newFilters[category] = priceValue;
        }

        showFilteredResults(newFilters);
        setFilters(newFilters);
    }

    const loadMoreCards = () => {
        let newSkip = skip + limit;
        dispatch(getProductsToShop(newSkip, limit, filters, products.toShop))
        .then(()=>{
            setSkip(newSkip);
        })
    }

    const handleGrid = () => {
        setGrid(!grid ? 'grid_bars' : '')
    }

    return (
        <div>
            <PageTop title="Browse Products"/>
            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckbox
                            initState={true}
                            title="Brands"
                            list={products.brands}
                            handleFilters={(filters)=>handleFilters(filters, 'brand')}
                        />
                        <CollapseCheckbox
                            initState={false}
                            title="Frets"
                            list={frets}
                            handleFilters={(filters)=>handleFilters(filters, 'frets')}
                        />
                        <CollapseCheckbox
                            initState={false}
                            title="Wood"
                            list={products.woods}
                            handleFilters={(filters)=>handleFilters(filters, 'wood')}
                        />
                        <CollapseRadio
                            initState={true}
                            title="Price"
                            list={price}
                            handleFilters={(filters)=>handleFilters(filters, 'price')}
                        />
                    </div>

                    <div className="right">
                        <div className="shop_options">
                            <div className="shop_grids clear">
                                <div
                                    className={`grid_btn ${grid ? '' : 'active'}`}
                                    onClick={()=>handleGrid()}
                                >
                                    <FontAwesomeIcon icon={faTh}/>
                                </div>
                                <div
                                    className={`grid_btn ${!grid ? '' : 'active'}`}
                                    onClick={()=>handleGrid()}
                                >
                                    <FontAwesomeIcon icon={faBars}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <LoadMoreCards
                                grid={grid}
                                limit={limit}
                                size={products.toShopSize}
                                products={products.toShop}
                                loadMore={()=>loadMoreCards()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(withRouter(Shop));
