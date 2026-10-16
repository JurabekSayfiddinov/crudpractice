import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from './store/counterSlice'
import { Button, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';


import { Pagination } from 'swiper/modules';


const App = () => {
  let {data,loading,error}=useSelector(state=>state.data)
  let dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getUsers())
  },[])


  return (
    <>
    <div className='box'>
     {loading ? (<CircularProgress enableTrackSlot size="3rem" aria-label="Loading…"/>):(data.map((e)=>(
      <div className='card'>
        <Swiper style={{width:'150px', marginLeft: '0',marginRight: '0',border:'1px solid blue',borderRadius:'50%' }} pagination={true} modules={[Pagination]}  className="mySwiper">
       {e.images?.map((img) => (
    <SwiperSlide key={img.id}>
      <img
        src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
        alt={e.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
    </SwiperSlide>
       ))}
      </Swiper>
        <h3>{e.name}</h3>
        <p>{e.description}</p>
        <p>{e.isCompleted?"Online":"Offline"}</p>
        <Button variant="outlined" startIcon={<DeleteIcon/>} onClick={()=>dispatch(deleteUser(e.id))}>Delete</Button>
      </div>
     )))}
    </div>
    </>
  )
}

export default App