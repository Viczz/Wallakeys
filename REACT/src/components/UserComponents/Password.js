import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';


const Password = (props) => {

  const [user, setUser] = useContext(UserContext);






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
            <div className="card-header">Change Password</div>
            <div className="card-body">
              <form action="" method="">
                <div className="form-group row">
                  <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">Actual Password</label>
                  <div className="col-md-6">
                    <input type="text" id="actual_password" className="form-control" name="actual_password" required autoFocus />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="new_password" className="col-md-4 col-form-label text-md-right">New Password</label>
                  <div className="col-md-6">
                    <input type="password" id="new_password" className="form-control" name="new_password" required />
                  </div>
                </div>

                <div className="col-md-6 offset-md-4">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                          </button>

                </div>
              </form>
            </div>
          </div>
        </div>


      </div>
    </div>

  )


}



export default Password;
