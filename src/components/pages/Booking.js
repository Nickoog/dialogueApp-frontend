import React from 'react';
import api from '../../api';
import './Booking.css';
import DayButton from '../elements/DayButton';
var moment = require('moment');

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekNum: moment().week(),
      weekAvailabilities: [],
      loading: true
    }
  }

  componentWillMount(){
    this._fetchAvailabilities();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.weekNum !== this.state.weekNum){
      this._fetchAvailabilities(this.props);
      this.setState({loading: true})
    }
  }

  _fetchAvailabilities = () => {
    if(this.props.route.auth.loggedIn()){
      const token = this.props.route.auth.getToken();
      api.reqAvailabilities(this.props.location.query.position, moment().day("sunday").week(this.state.weekNum).format("YYYY-MM-DD"), token)
      .then(data=>{
        this.setState({
          weekAvailabilities: data,
          loading: false
        });
      }).catch(console.error)
    }
  }

  _handlePrevWeek = () => {
    this.setState({
      weekNum: this.state.weekNum - 1
    })
  }

  _handleNextWeek = () => {
    this.setState({
      weekNum: this.state.weekNum + 1
    })
  }

  render() {
    let {weekAvailabilities, weekNum} = this.state;
    let from = moment().day("sunday").week(weekNum).format("LL");
    let to = moment().day("saturday").week(weekNum).format("LL");

    return (
      <div className="booking">
        <h2 className="position"> Professional: {this.props.location.query.position}</h2>
        <h3 className="location"> Location: {this.props.location.query.location}</h3>
        <div className="booking-header">
          <h4>Please choose the desired date of your appointment</h4>
          <p>{from} to {to}</p>
        </div>
        <div className="week">
          {this.state.weekNum === moment().week()
            ?<i className="fa fa-chevron-left thisWeek" aria-hidden="true"></i>
            :<i className="fa fa-chevron-left" aria-hidden="true" onClick={this._handlePrevWeek}></i>}
          {(this.state.loading || !weekAvailabilities.length)
          ? <div className="loading">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw blue"></i>
              <span className="sr-only">Loading...</span>
            </div>
          : <DayButton className="day"
              week={weekNum}
              data={weekAvailabilities}
              specialists={this.props.location.query.position}
             />
        }
          <i className="fa fa-chevron-right" aria-hidden="true" onClick={this._handleNextWeek}></i>
        </div>
      </div>
    );
  }
}

export default Booking;
