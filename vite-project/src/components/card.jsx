import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card  from 'react-bootstrap/Card';

const Card_ = ({ student, key ,cardId}) => {

      return (
        <Card className = "bg-dark card-body" style={{
          "marginTop":"2rem"
          
        }}>
          <Card.Header style={{
              "color":"white"
            }}>Featured</Card.Header>
          <Card.Body>
            <Card.Title style={{
              "color":"red"
            }}>{student.id}.  {student.name.username}</Card.Title>
            <Card.Text  style={{
              "color":"white"
            }}>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Link to="assignmnets/"><button type="button" class="btn btn-info" >ASSIGNMENTS</button></Link>
            <Link to={`courses/?id=${student.id}`}><button type="button" class="btn btn-success">COURSES</button></Link>
          </Card.Body>
        </Card>
      );
    }

export default Card_