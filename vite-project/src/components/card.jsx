import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'


const Card = ({ student, key ,cardId}) => {


  
  return (
    <div className='card-body'><div class="col" key={key}>
      <div class="card shadow-sm ">   
        <div class="card-body">
          <p class="card-text">{student.id} ---- {student.name.username}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              
              <Link to="assignmnets/"><button type="button" class="btn btn-danger" >ASSIGNMENTS</button></Link>
              <Link to={`courses/?id=${student.id}`}><button type="button" class="btn btn-success">COURSES</button></Link>
            </div>
            <small class="text-body-secondary">7 mins</small>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Card