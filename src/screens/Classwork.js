import React from 'react'
import FontAwesome from 'react-fontawesome'
import Tabs from '../components/Tabs';

const Classwork = () => {
    return (
        <div>
            
            <div className="category">
                <div className="head">Final Exam</div>
                <div className="list">
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Final</h5>
                            <p>Due Jun 25, 12:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="head">Project</div>
                <div className="list">
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Project Submission</h5>
                            <p>Due Jun 17, 11:59 PM</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Project Proposal</h5>
                            <p>Due Jun 7, 11:59 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="head">Quiz</div>
                <div className="list">
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Quiz no.3</h5>
                            <p>Due May 28, 11:30 AM</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Quiz no.2</h5>
                            <p>Due Jun 11, 12:00 PM</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Quiz no.1</h5>
                            <p>Due Apr 23, 11:59 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="head">Labs</div>
                <div className="list">
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Lab no.6</h5>
                            <p>Due May 28, 11:30 AM</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Lab no.5</h5>
                            <p>Due Jun 11, 12:00 PM</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Lab no.4</h5>
                            <p>Due Apr 23, 11:59 PM</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Lab no.3</h5>
                            <p>Due May 28, 11:30 AM</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Lab no.2</h5>
                            <p>Due Jun 11, 12:00 PM</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="pic">
                            <FontAwesome className='fa fa-book' name='classwork' />
                        </div>
                        <div className="info">
                            <h5>Lab no.1</h5>
                            <p>Due Apr 23, 11:59 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs cat='tab2'/>
        </div>
    );
}

export default Classwork