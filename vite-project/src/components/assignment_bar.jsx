import React, { useContext, useRef, useState } from 'react'
import { Assignment_context } from '../STUDENT_STORE/ASSIGNMENT_CONTEXT';


const Assignment_bar = ({ data }) => {
    const { setfilename, handlePatchRequest } = useContext(Assignment_context);
    // if is_draft changes update that right away
    const [file, setfile] = useState(null)
    const file_data = useRef(null)

    const handleSubmission = (id) => {
        // Perform any local state update or validation if needed before calling handlePatchRequest




        // Create FormData object to send file data
        if (file) {

            const formData = new FormData();
            formData.append('data', file);

            handlePatchRequest(formData, id);
            setfilename(formData)
        }

        file_data.current.value = ""

    };

    return (

        <>
            <div className=" d-flex text-body-secondary pt-3">
                <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#007bff"></rect>
                    <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
                </svg>
                <p className="pb-3 mb-0 small lh-sm ">
                    <strong className="d-block text-gray-dark">@{data.id}</strong>
                    Assignmnet --- {data.file_name}
                    <button type="button" className={`btn btn-outline-success gap-top ${data.is_draft === 'False' ? "disabled" : ''}`} onClick={(event) => handleSubmission(event, data.id)}>SUBMIT</button>
                    <button type="button" className={`btn btn-outline-danger ${data.is_draft === 'False' ? "disabled" : ''}`} onClick={() => handleSubmission(data.id)} >EDIT</button>
                </p>
            </div>
            <div className="mb-3">

                <input className="form-control form-control-sm" id="formFileSm" type="file" name="file_input"  ref = {file_data}   onChange={(event) => {
                    setfile(event.target.files[0])

                }} />


            </div>
            <hr />
        </>
    )
}

export default Assignment_bar