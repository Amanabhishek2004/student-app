import React from 'react';
import { useContext } from 'react';
import { Student_context } from '../STUDENT_STORE/STUDENT_CONTEXT';

const Course = ({ Attendance }) => {
  const {MarkAttendance,setclass_attended} = useContext(Student_context)
  
  console.log(Attendance)
  
  const handleOnclick = (data,val,id)=>{
    MarkAttendance(id,val,data)
    setclass_attended((prev)=>{return !prev})
  } 
  return (
    <>
      {Attendance.map((data, index) => (
        <div key={index} className="container-course">
          <div className="bg-dark dropdown-menu position-static d-flex flex-column flex-lg-row align-items-stretch justify-content-start p-3 rounded-3 shadow-lg" data-bs-theme="light">
            <nav className="col-lg-8">
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li>

                  <a href="#" className="btn btn-hover-light rounded-2 d-flex align-items-start gap-2 py-2 px-3 lh-sm text-start">
                    <div>
                      <strong className="d-block" style={{
                        "color":'red'
                      }}>{data.subject_name}</strong>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="btn btn-hover-light rounded-2 d-flex align-items-start gap-2 py-2 px-3 lh-sm text-start">
                    <svg className="bi" width="24" height="24"><use xlinkHref="#image-fill"></use></svg>
                    <div>
                      <strong className="d-block" style={{
                        "color":'green'
                      }}>Attendance</strong>
                      <br/>
                      <div style={{ width: '700%' }}>
                        <div className="progress" role="progressbar" aria-label="Attendance progress" aria-valuenow={(data.no_of_classes_attended / data.no_of_classes_occured) * 100} aria-valuemin="0" aria-valuemax="100">
                          <div
                            className={`progress-bar progress-bar-striped progress-bar-animated ${((data.no_of_classes_attended / data.classes_required_to_attend) * 100) < 50 ? 'bg-danger' : ((data.no_of_classes_attended / data.classes_required_to_attend) * 100) === 100 ? 'bg-success' : ''}`}
                            style={{ width: `${(data.no_of_classes_attended / data.no_of_classes_occured) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="btn btn-hover-light rounded-2 d-flex align-items-start gap-2 py-2 px-3 lh-sm text-start">
                    <svg className="bi" width="24" height="24"><use xlinkHref="#question-circle"></use></svg>
                    <div>
                      <strong className="d-block" style={{
                        "color":'white'
                      }}>Support</strong>
                      <small style={{
                        "color":'white'
                      }}>Get help from our support crew</small>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="d-none d-lg-block vr mx-4 opacity-10">&nbsp;</div>
            <hr className="d-lg-none" />
            <div className="col-lg-auto pe-3">
             
               <p>
                
                <button type="button" className="btn btn-primary" onClick={() => handleOnclick(data,1,data.attendance_id)}>Present</button>
                
                <button type="button" className="btn btn-secondary" onClick={() => handleOnclick(data,0,data.attendance_id)}>Absent</button>
                </p>
            
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Course;
