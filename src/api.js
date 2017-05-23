import {API_HOST} from './config';
import superagent from 'superagent';

class Api {

  reqAvailabilities = (spec, date, patientToken) => {
    return superagent
    .get(`${API_HOST}/availabilities?spec=${spec}&date=${date}`)
    .set('Authorization', 'Bearer '+ patientToken)
    .then(res => res.body)
  }

  sendBooking = (date, startTime, patientToken, spec, mail, picture) => {
    return superagent
    .post(`${API_HOST}/bookings`)
    .set('Authorization', 'Bearer '+ patientToken)
    .send({
      date: date,
      startTime: startTime,
      spec: spec,
      mail: mail,
      picture: picture
    })
  }

  reqBookingInfo = (bookingId, patientToken) => {
    return superagent
    .get(`${API_HOST}/bookings/${bookingId}`)
    .set('Authorization', 'Bearer '+ patientToken)
    .then(res => res.body)
  }

  reqPatientBooking = (patientToken) => {
    return superagent
    .get(`${API_HOST}/mybookings`)
    .set('Authorization', 'Bearer '+ patientToken)
    .then(res => res.body)
  }
}

export default new Api();
