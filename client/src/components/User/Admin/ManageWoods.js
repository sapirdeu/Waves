import React, {useEffect, useState} from 'react'
import FormFields from '../../utils/Form/FormFields'
import {update, generateData, isFormValid, resetFields} from '../../utils/Form/FormActions'
import {getWoods, addWood} from '../../../redux/actions/products_actions'

import {withRouter} from 'react-router-dom'
import {useDispatch,connect} from 'react-redux'

function ManageWoods(props) {
    const [formError, setFormError] = useState(false);
    const [formSuccess, setFormSucces] = useState(false);
    const [formData, setFormData] = useState({
        name:{
            element: 'input',
            value: '',
            config: {
                label: 'Wood name',
                name: 'name_input',
                type: 'text',
                placeholder: 'Enter the wood'
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWoods());
    }, [dispatch]);

    const showCategoryItems = () =>(
        props.products.woods ? 
            props.products.woods.map((item,i)=>(
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
        :
            null
    )

    const updateForm = (element) => {
        const newFormData = update(element, formData, 'woods')
        setFormData(newFormData);
        setFormError(false);
    }

    function submitForm(event) {
        event.preventDefault();

        let dataToSubmit = generateData(formData, 'woods');
        let formIsValid = isFormValid(formData, 'woods');
        let existingWoods = props.products.woods;

        if(formIsValid) { 
            dispatch(addWood(dataToSubmit, existingWoods))
            .then(response=>{
                if(response.payload.success){
                    resetFieldHandler();
                } else{
                    setFormError(true);
                }
            }).catch(e => {
                setFormError(true);
            });

        } else {
            setFormError(true);
        }
    }

    const resetFieldHandler = () => {
        const newFormData = resetFields(formData, 'woods');
        setFormData(newFormData);
        setFormSucces(true);

        setTimeout(()=>{
            setFormSucces(false);
        }, 3000);
    }

    return (
        <div className="admin_category_wrapper">
            <h1>Woods</h1>
            <div className="admin_two_column">
                <div className="left">
                    <div className="brands_container">
                        {showCategoryItems()}
                    </div>
                </div>
                <div className="right">
                    <form onSubmit={(event)=>submitForm(event)}>
                        <FormFields
                            id={'name'}
                            formData={formData.name}
                            change={(element)=>updateForm(element)}
                        />
                        {
                            formSuccess ? 
                                <div className="form_success">Success</div>
                            : null
                        }

                        {formError ? 
                            <div className="error_label">Please check your data</div>
                            : null
                        }

                        <button onClick={(event)=> submitForm(event)}>
                            Add wood
                        </button>
                    </form>
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

export default connect(mapStateToProps)(withRouter(ManageWoods));