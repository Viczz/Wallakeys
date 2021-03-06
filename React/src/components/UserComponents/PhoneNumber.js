/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import 'react-bootstrap/dist/react-bootstrap'
import { Link } from 'react-router-dom'


import { UserContext } from '../UserDispatch';


const User = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [result, setResult] = useState();
  const [spinnerTimeOut, setSpinnerTimeOut] = useState();
  const [savedTimeOut, setSavedTimeOut] = useState();
  const [validPhone, setValidPhone] = useState("");

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.currentTarget.value);
    let reg = /^\d{9}$/;

    if (e.currentTarget.value.length == 0) {
      setValidPhone("");
    } else {
      if (reg.test(e.currentTarget.value)) {
        setValidPhone("")
      } else {
        setValidPhone("is-invalid");
      }
    }


  }



  const showResult = () => {

    if (result == true) {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "green" }}>Phone changed</p>
      )
    } else if (result == false) {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}>Phone not changed</p>
      )
    } else {
      return (
        <p className="d-none" id="saved-changes" style={{ margin: "0", paddingLeft: "15px", color: "red" }}></p>

      )
    }

  }

  const saveChanges = (e) => {
    const token = 'Bearer ' + user.token;
    let spinner = document.getElementById("loading-spinner");
    let savedchanges = document.getElementById("saved-changes");
    spinner.className = "";
    savedchanges.className = "d-none";

    clearTimeout(spinnerTimeOut);
    clearTimeout(savedTimeOut);

    axios({
      method: 'post',
      url: 'https://api.imviczz.com/api/user/updatephone',
      headers: {
        Authorization: token,

      },
      params: {
        phoneNumber: phoneNumber
      }
    }).then(res => {
      setResult(res.data);

      setSpinnerTimeOut(setTimeout(() => {
        savedchanges.className = "";
        spinner.className = "d-none";
        setSavedTimeOut(setTimeout(() => {
          savedchanges.className = "d-none";
        }, 2000))
      }, 1000))

    });

  }

  useEffect(() => {

    if(user.token){
      const token = 'Bearer ' + user.token;
      axios({
        method: 'get',
        url: 'https://api.imviczz.com/api/user/info',
        headers: {
          Authorization: token
        }
      })
        .then(res => {
  
          let data = (res.data);
          if (data !== false) {
            setPhoneNumber(data[0].phoneNumber)
          }
        });
    }
    
  }, [])

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
            <div className="card-header">Change Phone Number</div>
            <div className="card-body">
              <form action="" method="">
                <div className="form-group row">
                  <label htmlFor="phone_number" className="col-md-4 col-form-label text-md-right">Phone Number</label>
                  <div className="col-md-6">
                    <input type="text" id="phone_number" onChange={handlePhoneChange} className={"form-control " + validPhone} value={phoneNumber} required />
                  </div>
                </div>

                <div className="col-md-6 offset-md-4 center-align" style={{ alignItems: "center" }}>
                  {validPhone=="" ? <button type="button" className="btn btn-primary" onClick={saveChanges}> Save Changes </button> 
                  
                  : 
                  <div>
                      <p className="horizontal-align text-danger">Phone number must contain 9 digits.</p>

                  <button type="button" className="btn btn-primary horizontal-align" disabled > Save Changes </button>
                  </div> 
                  }

                  {showResult()}
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )


}



export default User;
