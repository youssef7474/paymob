import React from 'react';
import "./Card.css"
import {data} from"../DumyData/DumyData.js"
const Card = () => {

    const mapedData= data.map((el)=>{
        return(
            <div class="plan" key={el.id}>
            <div class="inner">
                <span class="pricing">
                    <span>
                        ${el.price} <small>/ m</small>
                    </span>
                </span>
                <p class="title">{el.order}</p>
                <p class="info">This plan is for those who have a team already and running a large business.</p>
                <ul class="features">
                    <li>
                        <span class="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                        </span>
                        <span><strong>20</strong> team members</span>
                    </li>
                    <li>
                        <span class="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                        </span>
                        <span>Plan <strong>team meetings</strong></span>
                    </li>
                    <li>
                        <span class="icon">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                        </span>
                        <span>File sharing</span>
                    </li>
                </ul>
                <div class="action">
              <button className='button' onClick={()=>clickedbutton(el)}>order now</button>
                </div>
            </div>
        </div>
        )
    })



    const Api_key='ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TnpNek1qRTJMQ0p1WVcxbElqb2lNVFk1TURjME5UWXlPUzQ1T0RjMU9TSjkuUFpBU2tFaHJBSnc5bWdhT3ZDNENrR01NYmFjRjVTYmgwUzVoeDRmOWlWWjk2R3RUVktBT19VZEt1b3hQMkxpQ18xY2dMTGN1XzYtN3doSS1mVmlZa3c='


    const firststep= async()=>{


        let data={
            "api_key": Api_key
        }

        let request = await fetch('https://accept.paymob.com/api/auth/tokens',{
            method:'post',
            headers:{'content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        let response=await request.json()

        let token =response.token


        secondstep(token)
    }

    const secondstep = async (token)=>{
        let data={
            "auth_token": token,
            "delivery_needed": "false",
            "amount_cents": "100",
            "currency": "EGP",
            "items": [],
          }

        let request = await fetch(' https://accept.paymob.com/api/ecommerce/orders',{
            method:'post',
            headers:{'content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        let response=await request.json()

        let id = response.id

        thirdstep(id,token)
    }



    
    const thirdstep = async (id,token)=>{
        let data={
            "auth_token": token,
            "amount_cents": "100", 
            "expiration": 3600, 
            "order_id": id,
            "billing_data": {
              "apartment": "803", 
              "email": "claudette09@exa.com", 
              "floor": "42", 
              "first_name": "Clifford", 
              "street": "Ethan Land", 
              "building": "8028", 
              "phone_number": "+86(8)9135210487", 
              "shipping_method": "PKG", 
              "postal_code": "01898", 
              "city": "Jaskolskiburgh", 
              "country": "CR", 
              "last_name": "Nicolas", 
              "state": "Utah"
            }, 
            "currency": "EGP", 
            "integration_id": 3705664,

          }

        let request = await fetch('https://accept.paymob.com/api/acceptance/payment_keys',{
            method:'post',
            headers:{'content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        let response=await request.json()

        let lastToken=response.token

   
        cardpayment(lastToken)
    }




    const cardpayment = async (lastToken)=>{
        let iframeurl= `https://accept.paymob.com/api/acceptance/iframes/748240?payment_token=${lastToken}`;
        window.open(iframeurl, '_blank');
    }



    const clickedbutton=(el)=>{
        firststep()
    }


  return (
  <div className='responsive-div'>
    {mapedData}
  </div>
  );
}

export default Card;
