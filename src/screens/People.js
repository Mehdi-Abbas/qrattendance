import React from 'react'
// import FontAwesome from 'react-fontawesome'
import Tabs from '../components/Tabs';

const People = () => {
    return (
        <div>

            <div className="category">
                <div className="head">Teachers</div>
                <div className="list">
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Mehdi Abbas</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="head">Classmates</div>
                <div className="list">
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <img alt="" src="profile.png"/>
                        </div>
                        <div className="info">
                            <h3>Student</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs cat='tab3'/> 
        </div>
    );
}

export default People