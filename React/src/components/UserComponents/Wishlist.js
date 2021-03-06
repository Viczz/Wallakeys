/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'react-bootstrap/dist/react-bootstrap'
import axios from 'axios'
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
const images = require.context('../../img', true);


const Wishlist = (props) => {

  const [games, setGames] = useState(null);
  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    if (user.token) {
      const token = 'Bearer ' + user.token;
      axios({
        method: 'get',
        url: 'https://api.imviczz.com/api/user/wishlist/get',
        headers: {
          Authorization: token,
        }
      })
        .then(res => {

          let data = (res.data);
          if (data !== false) {


            setGames(data);

          }
        });
    }
  }, [])
  const loadAllWishList = () =>{
    if (user.token) {
      const token = 'Bearer ' + user.token;
      axios({
        method: 'get',
        url: 'https://api.imviczz.com/api/user/wishlist/get',
        headers: {
          Authorization: token,
        }
      })
        .then(res => {

          let data = (res.data);
          if (data !== false) {


            setGames(data);

          }
        });
    }
}
  const removeFromWishlist = (game)=>{
    console.log(game);
    if (user.token) {
      const token = 'Bearer ' + user.token;
      axios({
        method: 'post',
        url: 'https://api.imviczz.com/api/user/wishlist/remove',
        headers: {
          Authorization: token,
        },
        params:{
          id: game,
        }
      })
        .then(res => {

          let data = (res.data);
          if (data !== false) {
            
            loadAllWishList();
            
          }
        });
    }

  }
 
  const addToCart = (game) => {

    let actualQuantity = 1;
    cart.items.forEach(element => {
      if (element.id == game._id.$oid) {
        actualQuantity = element.quantity + 1;
      }
    });
    setCart({
      type: 'add', text: {
        id: game._id.$oid,
        name: game.name,
        price: game.price,
        quantity: actualQuantity,
        stock: game.stock,
        subtotal: game.price,
        img: game.img,
        platforms: game.platforms
      }
    });

  }

  const show_games = () => {
    return (
      <div className="container row wishlist-grid">
        {games.map((game) =>
          <div className="col-sm-6 col-md-4 col-lg-3 wishlist-product" key={game[0]._id.$oid}>
            <div className="wishlist-image">
              <Link
                to={{
                  pathname: "/product/" + game[0].name.split(" ").join("-").toLowerCase(),
                  state: {
                    productID: game[0]._id.$oid,

                  }
                }}
              >
                <img src={images(`./${game[0].img}`)} />

              </Link>

            </div>

            <div className="wishlist-action-buttons">
              <button className="btn btn-primary" onClick={()=>addToCart(game[0])}> <i className="fa fa-shopping-bag"></i> </button>
              <button className="btn btn-danger" onClick={() => removeFromWishlist(game[0]._id.$oid)}> <i className="fa fa-heart-broken"></i> </button>

            </div>

            <div className="wishlist-content">
            <Link
                to={{
                  pathname: "/product/" + game[0].name.split(" ").join("-").toLowerCase(),
                  state: {
                    productID: game[0]._id.$oid,

                  }
                }}
              >
              <h3 className="title">{game[0].name}</h3>

              </Link>
              <div className="price">
                {game[0].price +" $"}
              </div>

            </div>
          </div>
        )}
      </div>
    )



  }




  return (

    <div className="container">
      <div className="row justify-content-center" style={{ paddingTop: "25px" }}>

        <div className="col-md-4">
          <div className="card card-header text-primary">Account Dashboard</div>

          <div className="list-group">

            <div className="list-group-item"><i className="fa fa-user"></i> <span> <Link to="/account/account-details"> <span>Account Details </span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-phone"></i> <span> <Link to="/account/phone-number"> <span>Phone Number</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-key"></i> <span> <Link to="/account/password"> <span>Password</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-credit-card"></i> <span> <Link to="/account/payment"> <span>Payment Method</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-book-open"></i> <span> <Link to="/account/orders"> <span>My Orders</span></Link> </span></div>
            <div className="list-group-item"><i className="fa fa-heart"></i> <span> <Link to="/account/wishlist"> <span>Wishlist</span></Link> </span></div>

          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Wishlist</div>
            <div className="card-body">
              {games != null ? show_games() : <p> You don't have any games in the wishlist!</p>}
             </div>
          </div>
        </div>

      </div>
    </div>




  )


}



export default Wishlist;
