import React from 'react'
import MyButton from './MyButton';

function Card(props) {
    const renderCardImage = (images) => {
        if(images.length > 0){
            return images[0].url;
        } else {
            return '/images/image_not_availble.png'
        }
    }

    return (
        <div className={`card_item_wrapper ${props.grid}`}>
            <div
                className="image"
                style={{
                    background: `url(${renderCardImage(props.image)}) no-repeat`
                }}
            > 
            </div>

            <div className="action_container">
                <div className="tags">
                    <div className="brand">{props.brand.name}</div>
                    <div className="name">{props.name}</div>
                    <div className="name">${props.price}</div>
                </div>
            </div>

            {
                props.grid ?
                    <div className="description">
                        fkjhfjkh
                    </div>
                :
                    null
            }

            <div className="actions">
                <div className="button_wrapp">
                    <MyButton
                       type="default"
                       altClass="card_link"
                       title="View product"
                       linkTo={`/product_detail/${props._id}`}
                       addStyles={{
                           margin: '10px 0 0 0'
                       }}
                    />
                </div>
                <div className="button_wrapp">
                    <MyButton
                       type="bag_link"
                       runAction={()=>{
                           console.log('added to cart')
                       }}
                       altClass="card_link"
                       title="View product"
                       linkTo={`/product_detail/${props._id}`}
                       addStyles={{
                           margin: '10px 0 0 0'
                       }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Card
