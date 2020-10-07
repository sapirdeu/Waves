import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch,connect} from 'react-redux'
import { getProductsToShop,getBrands, getWoods} from '../../redux/actions/products_actions'
import PageTop from '../utils/PageTop';
import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';
import {frets, price} from '../utils/Form/FixedCategories';

function Shop(props) {
    const products = props.products;
    // const [grid,setGrid] = useState('');
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
    }, [dispatch, skip, limit, filters]);

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
                        right
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
