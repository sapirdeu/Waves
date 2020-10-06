import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch,connect} from 'react-redux'
import {getBrands, getWoods} from '../../redux/actions/products_actions'
import PageTop from '../utils/PageTop';
import CollapseCheckbox from '../utils/CollapseCheckbox';
import CollapseRadio from '../utils/CollapseRadio';
import {frets, price} from '../utils/Form/FixedCategories';

function Shop(props) {
    const products = props.products;
    const [grid,setGrid] = useState('');
    const [limit] = useState(6);
    const [skip] = useState(0);
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

    const handleFilters = (filters, category) => {
        const newFilters = {...filters};
        newFilters[category] = filters;

        if(category==='price'){
            let priceValue = handlePrice(filters);
            newFilters[category] = priceValue;
        }

        setFilters(newFilters);
    }

    return (
        <div>

            {/* {console.log(filters)} */}

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
