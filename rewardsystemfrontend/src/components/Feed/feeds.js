import React from "react";
import "./feeds.css";
import axios from 'axios'
import { useEffect, useState } from 'react'

const Feeds = (props) => {


    const [getFeeds, setFeeds]=useState([]);

    useEffect(async()=>{
        const allFeed = await axios.get(`http://localhost:9009/nominations`)
       if(!allFeed){
           alert("No data in feed");
       }
      else{
        setFeeds(allFeed.data);
    
      } 
          //  console.log(allFeed.data);
    },[])
   

  return (
    
    
    <>
    {
getFeeds.map((e,index)=>{
return(
    <div class="card" key={e._id}>
    <div class="container">
      <h4>
       <h5><b>{e.fullName}</b> has been nominated for Employee of the month award by his manager <b>{e.nominatedBy}</b> for Department {e.department}</h5> 
      <br/>
       <h5>Criterias he has satisfied are {e.criteria} </h5>
       <br/>
      <h5> {e.fullName}'s manager has praised as {e.praise}</h5>
       <br/>


      </h4>
  

      <div className="buttons">
        <button className="likeButton">
          <span className="icon">
            <ion-icon name="happy"></ion-icon>
          </span>
          <span className="buttonheading">Like</span>
        </button>

        <button className="likeButton">
          <span className="icon">
            {" "}
            <ion-icon name="heart-dislike"></ion-icon>
          </span>
          <span className="buttonheading">Dislike</span>
        </button>
      </div>
    </div>
  </div>

)
})

    }

    </>
  );
};

export default Feeds;
