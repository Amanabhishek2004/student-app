import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Footer = () => {
  let currentpath = useLocation();
  let [path, setpath] = useState(null);
  useEffect(() => {
    setpath(currentpath.pathname);
  }, [currentpath.pathname]);

  return (

    path !== "/signup" ? (
      <div class="container-foot"><footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p class="col-md-4 mb-0 text-muted">© 2021 Company, Inc</p>
  
      <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img className="me-3" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38"  style={{
          color:"black"
          }}/>
      </a>
  
      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
      </ul>
    </footer></div> ): null)
  
};



export default Footer