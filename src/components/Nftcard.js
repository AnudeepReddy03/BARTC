import React,{useState,useEffect} from 'react'


const NftCard = (props) => {
    return (
        <>
        {/* <img  width={64} height={64} src={props.url} alt={props.name} /> */}
        <b><p className='text-warning'>{props.emailid}</p></b>
        {/* <p>Rank : {props.rank}</p>
        <p>Price in $ : {props.price}</p>
        <p>Price in ₹ : {props.price*81.58}</p> */}
        {/* <p>Key:{props.key}</p> */}
        <p>Value:{props.value}</p>
        </>
      )
}

export default NftCard;