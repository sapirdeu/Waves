import React, {useEffect, useState} from 'react'
import UserLayout from '../../../hoc/UserLayout'
import FormFields from '../../utils/Form/FormFields'
import {update, generateData, isFormValid, populateOptionFields, resetFields} from '../../utils/Form/FormActions'
import {getBrands, getWoods, addProduct, clearProduct} from '../../../redux/actions/products_actions'

import {withRouter} from 'react-router-dom'
import {useDispatch,connect} from 'react-redux'
import FileUpload from '../../utils/Form/FileUpload'

function AddProduct(props) {
    const [formError, setFormError] = useState(false);
    const [formSuccess, setFormSucces] = useState(false);
    const [formData, setFormData] = useState({
        name:{
            element: 'input',
            value: '',
            config: {
                label: 'Product name',
                name: 'name_input',
                type: 'text',
                placeholder: 'Enter your name'
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        description:{
            element: 'textarea',
            value: '',
            config: {
                label: 'Product description',
                name: 'description_input',
                type: 'text',
                placeholder: 'Enter your description'
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        price:{
            element: 'input',
            value: '',
            config: {
                label: 'Product price',
                name: 'price_input',
                type: 'number',
                placeholder: 'Enter your price'
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        brand:{
            element: 'select',
            value: '',
            config: {
                label: 'Product brand',
                name: 'brand_input',
                options: []
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        shipping:{
            element: 'select',
            value: '',
            config: {
                label: 'Shipping',
                name: 'shipping_input',
                options: [{key: true, value:'Yes'}, {key:false, value:'No'}]
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        available:{
            element: 'select',
            value: '',
            config: {
                label: 'Available, in stock?',
                name: 'available_input',
                options: [{key: true, value:'Yes'}, {key:false, value:'No'}]
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        wood:{
            element: 'select',
            value: '',
            config: {
                label: 'Wood material',
                name: 'wood_input',
                options: []
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        frets:{
            element: 'select',
            value: '',
            config: {
                label: 'Frets',
                name: 'frets_input',
                options: [{key: 20, value:'20'}, {key:21, value:'21'}, {key:22, value:'22'}, {key:24, value:'24'}]
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        publish:{
            element: 'select',
            value: '',
            config: {
                label: 'Publish',
                name: 'publish_input',
                options: [{key: true, value:'Public'}, {key:false, value:'Hidden'}]
            },
            validation:{
                required: true,
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        images:{
            value: '',
            validation:{
                required: false,
            },
            valid: true,
            touched: false,
            validationMessage: '',
            showlabel: false
        }
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands()).then(response=>{
            const newFormData = populateOptionFields(formData, response.payload, 'brand');
            updateFields(newFormData);
        })
        
        dispatch(getWoods()).then(response=>{
            const newFormData = populateOptionFields(formData, response.payload, 'wood');
            updateFields(newFormData);
        })
    }, [dispatch]);

    const updateFields = (newFormData) => {
        setFormData(newFormData)
    }
    

    const updateForm = (element) => {
        const newFormData = update(element, formData, 'products')
        setFormData(newFormData);
        setFormError(false);
    }

    function submitForm(event) {
        event.preventDefault();

        let dataToSubmit = generateData(formData, 'products');
        let formIsValid = isFormValid(formData, 'products');

        
        if(formIsValid) { 
            dispatch(addProduct(dataToSubmit))
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
        const newFormData = resetFields(formData, 'products');
        setFormData(newFormData);
        setFormSucces(true);

        setTimeout(()=>{
            setFormSucces(false);
        }, 3000);

        dispatch(clearProduct())
    }

    const imagesHandler = (images) => {
        const newFormData = {...formData};
        newFormData['images'].value = images;
        newFormData['images'].valid = true;
        setFormData(newFormData);
    }


    return (
        <UserLayout>
            <div>
                <h1>Add product</h1>
                <form onSubmit={(event)=>submitForm(event)}>
                    <FileUpload
                        imagesHandler={(images)=> imagesHandler(images)}
                        reset={formSuccess}
                    />

                    <FormFields
                        id={'name'}
                        formData={formData.name}
                        change={(element)=>updateForm(element)}
                    />
                    <FormFields
                        id={'description'}
                        formData={formData.description}
                        change={(element)=>updateForm(element)}
                    />
                    <FormFields
                        id={'price'}
                        formData={formData.price}
                        change={(element)=>updateForm(element)}
                    />

                    <div className="form_devider"></div>

                    <FormFields
                        id={'brand'}
                        formData={formData.brand}
                        change={(element)=>updateForm(element)}
                    />

                    <FormFields
                        id={'shipping'}
                        formData={formData.shipping}
                        change={(element)=>updateForm(element)}
                    />

                    <FormFields
                        id={'available'}
                        formData={formData.available}
                        change={(element)=>updateForm(element)}
                    />
                    
                    <div className="form_devider"></div>
                    
                    <FormFields
                        id={'wood'}
                        formData={formData.wood}
                        change={(element)=>updateForm(element)}
                    />

                    <FormFields
                        id={'frets'}
                        formData={formData.frets}
                        change={(element)=>updateForm(element)}
                    />

                    <div className="form_devider"></div>

                    <FormFields
                        id={'publish'}
                        formData={formData.publish}
                        change={(element)=>updateForm(element)}
                    />

                    {formSuccess ? 
                        <div className="form_success">Success</div>
                        : null
                    }

                    {formError ? 
                        <div className="error_label">Please check your data</div>
                        : null
                    }

                    <button onClick={(event)=> submitForm(event)}>
                        Add product
                    </button>
                </form>
            </div>
        </UserLayout>
    )
}

function mapStateToProps(state){
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(withRouter(AddProduct));
