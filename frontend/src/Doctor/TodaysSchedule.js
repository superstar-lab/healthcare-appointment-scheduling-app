import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";

const TodaysSchedule = () => {
  //   console.log(decoded);

  const [Appointments, setAppointments] = useState([]);
  const [date, setdate] = useState(new Date());

  const fetchAppointments = async () => {
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    const { data } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/doctors//appointments/`,
      {
        doctorId: decoded._id,
      }
    );
    // console.log(data);
    // console.log(date);
    setAppointments(data);
    setAppointments((Appointments) => {
      return Appointments.filter(
        (Appointment) =>
          Appointment.date ===
          date.getFullYear().toString() +
            "-" +
            (date.getMonth() + 1).toString() +
            "-" +
            date.getDate().toString()
      );
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <table className="table table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Patient Name</th>
          <th scope="col">Meet Link</th>
        </tr>
      </thead>
      <tbody>
        {Appointments.map((Appointment) => (
          <tr>
            <th scope="row">{Appointment.date}</th>
            <th scope="row">{Appointment.slotTime}</th>
            <th scope="row">{Appointment.patientName}</th>
            <th scope="row">Join</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodaysSchedule;
