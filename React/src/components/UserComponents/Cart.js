/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import 'react-bootstrap/dist/react-bootstrap'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
const images = require.context('../../img', true);


const Cart = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext)

  const addOne = (game) => {
    setCart({
      type: 'addOne', text: {
        id: game.id,
        name: game.name,
        price: game.price,
        quantity: game.quantity+1,
        stock: game.stock,
        subtotal: game.price,
        img: game.img,
      }
    });

  }

  const removeOne = (game) => {
    setCart({
      type: 'removeOne', text: {
        id: game.id,
        name: game.name,
        price: game.price,
        quantity: game.quantity-1,
        stock: game.stock,
        subtotal: game.price,
        img: game.img,
      }
    });

  }

  const deleteGame = (game) => {
    setCart({
      type: 'remove', text: {
        id: game.id,
      }
    });

  }
  
  const totalPrice = () => {
    let totalPrice = 0;
    cart.items.forEach(element => {
      totalPrice += parseFloat(element.subtotal);
    });
    return (parseFloat(totalPrice).toFixed(2));
  }


  const showProducts = () => {
    return (
      <div className="container" style={{ paddingTop: "25px" }}>
        <div className="card" >
          <div className="card-header"> Cart</div>
          <div className="card-body"></div>

          {cart.items.length > 0 ? cart.items.map((game) =>
            <div className="row cart-product-row" key={game.id}>
              <div className="col-sm-12 col-md-12 col-lg-5 col-12 row cart-product-title">
                <img src={images(`./${game.img}`)} alt="..." className="img-responsive cart-product-image" />
                <div> 
                  <h5> {game.name}</h5>
                  <p> Platforms: {game.platforms}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-2 col-6">
                <h6> Price</h6>
                <h5 className="">{game.price}$</h5>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-2 col-6">
                <h6>Quantity</h6>
                <div className="cart-modify-product">
                  <div className="form-control text-center" style={{ width: "60px" }}>{game.quantity} </div>


                  <button className="btn btn-success btn-sm" onClick={ () => { addOne(game) }}><i className="fa fa-plus"></i></button>
                  {game.quantity > 1 ?
                    <button className="btn btn-danger btn-sm" onClick={() => { removeOne(game) }}><i className="fa fa-minus"></i></button>
                    : <button className="btn btn-danger btn-sm" disabled><i className="fa fa-minus"></i></button>

                  }
                </div>
              </div>
              <div className="col-sm-6 col-md-3 col-lg-2 col-6">
                <h6> Subtotal</h6>
                <h5 className="">{game.subtotal}$</h5>
              </div>

              <div className="col-sm-6 col-md-1 col-lg-1 col-6">
                <button className="btn btn-danger btn-sm" onClick={() => { deleteGame(game) }}><i className="fa fa-trash-alt"></i></button>
              </div>
            </div>
          ) : <h5 className="center-align">Cart is Empty!</h5>}

          {cart.items.length > 0 ?
            <div className="row cart-end-row">

              <div className="col-md-8"><Link className="btn btn-warning" to="/"><i className="fa fa-angle-left"></i> Continue Shopping</Link> </div>
              <div className="col-md-2"><strong>Total $ {totalPrice()}</strong></div>
              <div className="col-md-2"><Link to="/account/cart/checkout"><button className="btn btn-success btn-block"> Checkout <i className="fa fa-angle-right"></i></button></Link></div>


            </div>
            :
            <div className="row cart-end-row">

              <div className="col-md-12"><Link className="btn btn-warning" to="/"> <i className="fa fa-angle-left"></i> Back to Shop! </Link></div>
            </div>
          }

        </div>
      </div>
    )
  }


  return (

    showProducts()
  );


}



export default Cart;
