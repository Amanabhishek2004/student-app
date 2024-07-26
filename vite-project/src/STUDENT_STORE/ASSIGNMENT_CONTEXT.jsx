import React, { useContext, useEffect } from 'react'
import { createContext, useState } from "react";
import { UserContext } from './USER_CONTEXT';

const DUMMY_ASSIGNMNETS = [
    
    {
        "id": 31,
        "student": 23,
        "is_draft": "False",
        "subject": 4,
        "Assignment_status": "SUBITTED",
        "file_name": "assignemnets/scrapping.ipynb",
        "grade": {
            "id": 7,
            "value": "null"
        },
        "submitted_to": 3
    },
    {
        "id": 34,
        "student": 23,
        "is_draft": "True",
        "subject": 4,
        "Assignment_status": "SUBITTED",
        "file_name": "",
        "grade": {
            "id": 8,
            "value": "value"
        },
        "submitted_to": 2
    },
    {
        "id": 35,
        "student": 23,
        "is_draft": "False",
        "subject": 4,
        "Assignment_status": "SUBITTED",
        "file_name": "assignemnets/AMAN-ABHISHEK-FlowCV-Resume-20240107.pdf",
        "grade": {
            "id": 9,
            "value": "value"
        },
        "submitted_to": 2
    }
]



export const Assignment_context = createContext({    
    assignments: [],
    setAssignments: () => {},
    assignments_given: [],
    setAssignments_given: () => {},
    param: null,
    setParam: () => {},
    handlePatchRequest : () => {},
    filename:null,
    setfilename: ()=>{},
    messagees : null , 
    handleCreateAssignment: () =>{},
    unread_message : null,
    setunread_message:()=>{} , 
    sumitted_to: null ,
    setsubmitted_to : () =>{},
    subject : null,
    setsubject: () =>{}

});

export const ASSIGNMENT_CONTEXT_PROVIDER = ({ children }) => {
    const [assignments, setAssignments] = useState([]);
    const [assignments_given, setAssignments_given] = useState([]);
    const [param, setParam] = useState(null);
    const[filename , setfilename] = useState(null)
    const [messages , setmessages] = useState(null)
    const [unread_message , setunread_message] = useState(null)
    const {loginUser} = useContext(UserContext)  
    const [subject , setsubject] = useState(null)
    const[submitted_to , setsubmitted_to] = useState(null)
    // create assignment_given 
    const handleCreateAssignment = (data)=>{
      if (loginUser){       
        const url = `http://127.0.0.1:8000/api/assignmnets/?${loginUser.USERNAME}`

        fetch(url , {
            method : 'POST',
            body:data,
       
        }).then(response =>{
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json()
        }).then(data =>{
              if(data.Message) {
                 setmessages(data.Message)
                 return data.Message
              }
        }).catch(error => {
            console.error("POST failed" , error)
        })
        return messages}
    }


    const handlePatchRequest = (data, id) => {
      const url = `http://localhost:8000/api/assignmnets/RUD/${id}?user_id=${loginUser.USERNAME}`;

      
      fetch(url, {
          method: 'PATCH',
          body: data,

      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          console.log('Patch successful', data);
          setfilename(data)
      })
      .catch(error => {
          console.error('Patch failed', error);
      });
  };
  useEffect(() => {
    const fetchData = () => {
        if (subject != null && submitted_to != null && loginUser) {
            fetch(`http://localhost:8000/api/assignmnets/?subject=${subject}&submitted_to=${submitted_to}&user_id=${loginUser.USERNAME}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    setAssignments(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        
            console.log(`http://localhost:8000/api/assignmnets/?subject=${subject}&submitted_to=${submitted_to}user_id=${loginUser.USERNAME}`);
        } 
        else {
          if(loginUser){

              fetch(`http://localhost:8000/api/assignmnets/?user_id=${loginUser.USERNAME}`) 
              .then(response => {
                  if (response.ok) {
                      return response.json();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => setAssignments(data))
                .catch(error => console.error('Error:', error));
            }  
        }
    };

    fetchData();
}, [subject, submitted_to, loginUser]); // Ensure only relevant dependencies are included


    
        useEffect(() => {
            if (loginUser){
                
                fetch(`http://127.0.0.1:8000/api/given_assignments/?user_id=${loginUser.USERNAME}`) 
                .then(response => response.json())
                .then(data => setAssignments_given(data))
                .catch(error => console.error('Error:', error));
            }
            
        }, [loginUser]);



    return (
        <Assignment_context.Provider value={{ assignments, setAssignments, assignments_given, setAssignments_given, param, setParam ,handlePatchRequest ,filename ,setfilename , handleCreateAssignment , unread_message ,setunread_message,setsubject ,setsubmitted_to, subject , submitted_to}}>
            {children}    
        </Assignment_context.Provider>
    );
};


