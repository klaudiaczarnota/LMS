import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Me.css'

const baseUrl = 'http://localhost:8000/api'

const Footer = () => {

    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        try {
            axios.get(baseUrl + '/pages/')
                .then((res) => {
                    setPageData(res.data)
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        <svg className="bi" width="30" height="24"><use ></use></svg>
                    </a>
                    <span className="mb-3 mb-md-0 text-muted">© 2024 eduNest, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use ></use></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use ></use></svg></a></li>
                    <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use ></use></svg></a></li>
                </ul>
            </footer>
        </>
    )
}

export default Footer
