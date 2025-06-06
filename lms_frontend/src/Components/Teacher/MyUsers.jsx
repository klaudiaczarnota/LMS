import React from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Message from '../Message'
import './img.css'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:8000/api'

const MyUsers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const teacherId = localStorage.getItem('teacherId')
    const [filteredStudentData, setFilteredStudentData] = useState([]);

    const ws = useRef(null);

    useEffect(() => {
        document.title = 'eduNest | Your Students'
    })

    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        try {
            axios.get(baseUrl + '/fetch-all-enrolled-students/' + teacherId)
                .then((res) => {
                    setStudentData(res.data)
                });
        } catch (error) {
            console.log(error)
        }
    }, []);

    const [msgData, setMsgData] = useState({
        msg_to: ''
    });

    const [groupData, setgroupData] = useState({
        msg_to: ''
    });

    const [successMsg, setsuccessMsg] = useState('')
    const [errorMsg, seterrorMsg] = useState('')

    const [groupsuccessMsg, setgroupsuccessMsg] = useState('')
    const [grouperrorMsg, setgrouperrorMsg] = useState('')

    const handleChange = (event) => {
        setMsgData({
            ...msgData,
            [event.target.name]: event.target.value
        });
    }

    const grouphandleChange = (event) => {
        setgroupData({
            ...groupData,
            [event.target.name]: event.target.value
        });
    }

    const { student_id } = useParams();

    const removeStudent = (courseId, studentId) => {
        try {
            axios.get(baseUrl + '/student-remove-course/' + courseId + '/' + studentId,)
                .then((res) => {
                    Swal.fire('Success', 'Data has been deleted Successfully')
                    window.location.reload()

                })
        } catch (error) {
            Swal.fire('error', 'Data has not been deleted !!');
        }
    }

    const formSubmit = (student_id) => {
        const _formData = new FormData()
        _formData.append('msg_to', msgData.msg_to);
        _formData.append('msg_from', 'teacher');

        try {
            axios.post(baseUrl + '/send-message/' + teacherId + '/' + student_id, _formData)
                .then((res) => {
                    if (res.data.bool == true) {
                        setMsgData({
                            'msg_to': ''
                        })
                        setsuccessMsg(res.data.msg)
                        seterrorMsg('')
                    } else {
                        setsuccessMsg('')
                        seterrorMsg(res.data.msg)
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const groupFormSubmit = () => {
        const _formData = new FormData()
        _formData.append('msg_to', groupData.msg_to);
        _formData.append('msg_from', 'teacher');

        try {
            axios.post(baseUrl + '/send-group-message/' + teacherId, _formData)
                .then((res) => {
                    if (res.data.bool == true) {
                        setgroupData({
                            'msg_to': ''
                        })
                        setgroupsuccessMsg(res.data.msg)
                        setgrouperrorMsg('')
                    } else {
                        setgroupsuccessMsg('')
                        setgrouperrorMsg(res.data.msg)
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const msgList = {
        height: '500px',
        overflow: 'hidden'
    }

    useEffect(() => {
        // Update filtered student data based on the search query
        const updatedFilteredData = studentData.filter((row) =>
            row.student.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStudentData(updatedFilteredData);
    }, [studentData, searchQuery]);



    return (
        <>

            <div className='container mt-4'>
                <div className='row'>
                    <aside className='col-md-3'>
                        <TeacherSidebar />
                    </aside>
                    <section className='col-md-9'>
                        <div className='card'>
                            <h5 className='card-header'><i className="bi bi-people-fill"> </i>All Enrolled List
                                <input
                                    type="text"
                                    className="form-control mb-2 mt-2"
                                    placeholder="Search by name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="button" className="btn btn-primary btn-sm float-end" data-bs-toggle="modal" data-bs-target="#groupMsgModal">
                                    Send Messages
                                </button>
                            </h5>
                            <div className="modal fade" id="groupMsgModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="groupMsgModal">Send Message to all Students</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            {groupsuccessMsg && <p className='text-success'>{groupsuccessMsg}</p>}
                                            {grouperrorMsg && <p className='text-danger'>{grouperrorMsg}</p>}
                                            <form>
                                                <div className="mb-3">
                                                    <label for="exampleInputEmail1" className="form-label">Message</label>
                                                    <textarea className='form-control' value={groupData.msg_to} name='msg_to' rows="8" onChange={grouphandleChange}></textarea>
                                                </div>
                                                <button type="button" className="btn btn-primary" onClick={groupFormSubmit}>Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body table-responsive">
                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th className='text-center'>Profile</th>
                                            <th className='text-center'>Name</th>
                                            <th className='text-center'>Enrolled In</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudentData.map((row, index) =>
                                            <tr>
                                                <td className='text-center'>
                                                    <img className='imgmeet' src={row.student.profile_img} />
                                                </td>
                                                <td className='text-center'>
                                                    <Link to={"/student-detail/" + row.student.id}>
                                                        {row.student.fullname}
                                                    </Link>
                                                </td>
                                                <td className='text-center'>{row.course.title}</td>
                                                <td className='text-center'>
                                                    <Link to={`/show-assignment/${row.student.id}/${teacherId}`} className='btn btn-sm btn-warning mb-2 me-2 text-white'>Assignment</Link>
                                                    <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className='btn btn-sm btn-info mb-2 me-2 text-dark'>Add Assignment</Link>
                                                    <button data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} className='btn btn-sm btn-success mb-2'><i className="bi bi-whatsapp"></i></button>
                                                    <button onClick={() => removeStudent(row.course.id, row.student.id)} className='btn btn-sm btn-danger ms-2 mb-2'><i className="bi bi-trash"></i></button>

                                                    <div className="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog  modal-fullscreen">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalLabel"><h4 className='text-danger'>{row.student.fullname}</h4></h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>

                                                                <div className="modal-body">
                                                                    <div className='row'>
                                                                        <div className='' style={msgList}>
                                                                            <Message teacher_id={teacherId} student_id={row.student.id} />
                                                                        </div>
                                                                        <div className='col-md-4 col-12'>
                                                                            {successMsg && <p className='text-success'>{successMsg}</p>}
                                                                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                                                                            <form>
                                                                                <div className="mb-3">
                                                                                    <label for="exampleInputEmail1" className="form-label">Message</label>
                                                                                    <textarea className='form-control' value={msgData.msg_to} name='msg_to' rows="10" onChange={handleChange}></textarea>
                                                                                </div>
                                                                                <button type="button" className="btn btn-sm btn-success" onClick={() => formSubmit(row.student.id)}> <i className="bi bi-cursor"></i>  </button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default MyUsers
