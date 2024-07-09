import React, { useCallback, useContext, useEffect  } from 'react';
import { Assignment_context } from '../STUDENT_STORE/ASSIGNMENT_CONTEXT';
import Assignment_bar from './assignment_bar';
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../STUDENT_STORE/USER_CONTEXT';

const Assignments = () => {
    const { filename , assignments, setAssignments ,subject , submitted_to } = useContext(Assignment_context);
    const { loginUser } = useContext(UserContext);
    let currentpath = useLocation() 




    
    useEffect(() => {
        const updateAssignments = () => {
            let updatedAssignments = [...assignments]; // Copy the current assignments

            // Filter by loginUser if STAFF_STATUS is true
            if (loginUser && loginUser.STAFF_STATUS) {
                updatedAssignments = updatedAssignments.filter((assignment) =>
                    assignment.submitted_to === loginUser.ID
                );
            }


            // Update the assignments state
            setAssignments(updatedAssignments);
        };

        updateAssignments();

        // Dependency array includes assignments and loginUser
    }, [, loginUser, location.search, setAssignments]);
     

    return (
        <>
            <div className='container'>
                <div className="bg-purple d-flex align-items-center p-3 my-3 text-white rounded shadow-sm">
                    <img className="me-3" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38" />
                    <div className="lh-1">
                        <h1 className="h6 mb-0 text-white lh-1">ASSIGNMENTS</h1>
                        <small>Since 2011</small>
                    </div>
                </div>
            </div>
            <div className='all-data'>
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h6 className="border-bottom pb-2 mb-0">Recent updates</h6>
                    {assignments.map((data, index) => (
                        <div key={index}>
                            <Assignment_bar data={data} />
                        </div>
                    ))}
                    <small className="d-block text-end mt-3">
                        <a href="#">All updates</a>
                    </small>
                </div>     
            </div>
        </>
    );
};

export default Assignments;
