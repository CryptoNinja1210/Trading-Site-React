// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import DashboardActions from './DashboardActions';
// import Experience from './Experience';
// import Education from './Education';
// import { getCurrentProfile, deleteAccount } from '../../actions/profile';

// const Dashboard = ({
//   getCurrentProfile,
//   deleteAccount,
//   auth: { user },
//   profile: { profile }
// }) => {
//   useEffect(() => {
//     getCurrentProfile();
//   }, [getCurrentProfile]);

//   return (
//     <section className="container-fluid">
//       <h1 className="large text-primary">Dashboard</h1>
//       <p className="lead">
//         <i className="fas fa-user" /> Welcome {user && user.name}
//       </p>
//       {profile !== null ? (
//         <>
//           <DashboardActions />
//           <Experience experience={profile.experience} />
//           <Education education={profile.education} />

//           <div className="my-2">
//             <button className="btn btn-danger" onClick={() => deleteAccount()}>
//               <i className="fas fa-user-minus" /> Delete My Account
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <p>You have not yet setup a profile, please add some info</p>
//           <Link to="/create-profile" className="btn btn-primary my-1">
//             Create Profile
//           </Link>
//         </>
//       )}
//     </section>
//   );
// };

// Dashboard.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,
//   deleteAccount: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profile: state.profile
// });

// export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
//   Dashboard
// );
import { Card, Carousel, DollarOutlined } from 'antd';

import myImage_1 from '../../img/stockImage_1.jpg';
import myImage_2 from '../../img/stockImage_2.jpg';
import myImage_3 from '../../img/stockImage_3.jpg';
import myImage_4 from '../../img/stockImage_4.jpg';
import myImage_5 from '../../img/stockImage_5.jpg';
import myImage_6 from '../../img/stockImage_6.jpg';
import myImage_7 from '../../img/stockImage_7.jpg';

const contentStyle = {
  height: '100%',
  width: 'auto',
};

const Dashboard = () => {

  const handleBackTesting = () => {
    window.location.assign('/backtesting')
  }
  const handleScreening = () => {
    window.location.assign('/screening')
  }
  const handleCharts = () => {
    window.location.assign('/charts')
  }
  const handlePatterns = () => {
    window.location.assign('/patterns')
  }
  return (
    <div className="container-fluid dashboard" >
      <div className='row'>
        <Carousel effect="fade" autoplay className='col-md-12' style={{width:"100%",maxHeight:"70vh",overflow:"hidden",padding:'0px',borderRadius:'10px'}}>
          <img src={myImage_1} style={contentStyle} alt='carousel_image'/>
          <img src={myImage_2} style={contentStyle} alt='carousel_image'/>
          <img src={myImage_3} style={contentStyle} alt='carousel_image'/>
          <img src={myImage_4} style={contentStyle} alt='carousel_image'/>
          <img src={myImage_5} style={contentStyle} alt='carousel_image'/>
          <img src={myImage_6} style={contentStyle} alt='carousel_image'/>
          <img src={myImage_7} style={contentStyle} alt='carousel_image'/>
        </Carousel>
      </div>
      <div className='row d-flex' style={{padding:"0px",flexWrap:'nowrap', alignItems:"stretch",marginTop:"10px"}}>
        <Card hoverable className='dashboard-card' key='backtesting' onClick={handleBackTesting}>
          <div style={{textAlign:"center", height:"100%"}}>
            <h1><i className="bx bx-dollar"></i></h1>
            {/* <DollarOutlined /> */}
            <h4>BackTesting</h4>
            <span>Backtest screen criteria and trading strategies across a range of dates.</span>
            <br/>
            <br/>
            <a href='#!' style={{margin:"auto auto 0 auto"}}>Backtest your trading strategies</a>
          </div>
        </Card>
        <Card hoverable className='dashboard-card'  key='screening' onClick={handleScreening}>
          <div className='' style={{textAlign:"center", height:"auto", marginBottom:"0"}}>
            <h1><i className="bx bx-search-alt"></i></h1> 
            <h4>Screening</h4>
            <span>Screen the market using technical and fundamental criteria to find suitable symbols for further analysis.</span>
            <br/>
            <br/>
            <a href='#!'>Create a custom screen</a>
          </div>
        </Card>
        <Card hoverable className='dashboard-card'  key='charts' onClick={handleCharts}>
          <div style={{textAlign:"center", height:"auto"}}>
            <h1><i className="bx bx-line-chart"></i></h1> 
            <h4>Charts</h4>
            <span>Save charts for all your favorite symbols, technical indicators, and timescales for easy retrieval next time.</span>
            <br/>
            <br/>
            <a href='#!'>Chart your favorite symbols</a>
          </div>
        </Card>
        <Card hoverable className='dashboard-card'  key='patterns' onClick={handlePatterns}>
          <div style={{textAlign:"center", height:"100%"}}>
            <h1><i className="bx bx-bar-chart-alt"></i></h1> 
            <h4>Patterns</h4>
            <span>Screen for recognized patterns such as a Hanging Man or create reusable blocks of custom criteria.</span>
            <br/>
            <br/>
            <a href='#!'>Create a custom pattern</a>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard