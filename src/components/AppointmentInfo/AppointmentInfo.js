import React from 'react'
// import InstagramEmbed from 'react-instagram-embed' 
import './AppointmentInfo.css' 
import eyes from '../../Assets/eyes.jpg'
import eyes1 from '../../Assets/eyes1.jpg'
import eyes2 from '../../Assets/eyes2.jpg'
import eyes3 from '../../Assets/eyes3.jpg'

export default function (props){
    return(
        <div className='lashCareContainer'>
            <div className='post'>
                <div className='insta'>
                    {/* <InstagramEmbed 
                        url='https://www.instagram.com/p/BrCKUA-HrkL/'
                        maxWidth={320}
                        hideCaption={true}
                    /> */}
                    <img className='bigImages' src={eyes} alt=''/>
                </div>

                <div className='listItems'>

                    <div className='textContainer'>
                        <div>
                            <img src='https://static.thenounproject.com/png/1461744-200.png' className='w3-bar-item' alt='' width='80px' height='80px'/>
                            {/* <i class="fas fa-circle"></i> */}
                        </div>
                        <div>
                            <p>
                                Realistic expectations are important when getting extensions. I can only put on extensions your natural lash can support. If you have few lashes or they're short/thin then unfortunately I can't put long/thick extensions on.
                            </p>
                        </div>
                    </div>

                    <div className='textContainer' id='tooBig'>
                        <div>
                            <img src='https://static.thenounproject.com/png/1461744-200.png' className='w3-bar-item' alt='' width='80px' height='80px'/>
                        </div>
                        <div>
                            <p>
                                Classic full sets take up to 2 hours and fills take an hour.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='post'>

                <div className='listItems'>

                    <div className='textContainer'>
                        <div>
                            <img src='https://static.thenounproject.com/png/1461744-200.png' className='w3-bar-item' alt='' width='80px' height='80px'/>
                        </div>
                        <div>
                            <p>
                            Make sure you don't have any make up on when you come in for your appointments. It is very important that I have squeaky clean lashes so the glue will adhere to your lash. 
                            </p>
                        </div>
                    </div>

                    <div className='textContainer'>
                        <div>
                            <img src='https://static.thenounproject.com/png/1461744-200.png' className='w3-bar-item' alt='' width='80px' height='80px'/>
                        </div>
                        <div>
                            <p>
                                You should have 40% of your extensions still on when you come in for a fill. If you don't we should may consider your fill times closer together.
                            </p>
                        </div>
                    </div>

                </div>
                <div className='insta'>
                    {/* <InstagramEmbed 
                        url='https://www.instagram.com/p/BoRmVqFjcCs/'
                        maxWidth={320}
                        hideCaption={true}
                    /> */}
                    <img className='bigImages' src={eyes1} alt=''/>
                </div>

            </div>

            <div className='post'>
            <div className='insta'>
                {/* <InstagramEmbed 
                url='https://www.instagram.com/p/BoRkt75DQui/'
                maxWidth={320}
                hideCaption={true}
                /> */}
                <img className='bigImages' src={eyes2} alt=''/>
            </div>
                <div className='listItems'>

                    
                    <div className='textContainer'>
                        <div>
                            <img src='https://static.thenounproject.com/png/1461744-200.png' className='w3-bar-item' alt='' width='80px' height='80px'/>
                        </div>
                        <div>
                            <p>
                                You will not have good retention with lashes if you come in with unclean lashes or if you dont take care of them between fills.
                            </p>
                        </div>
                    </div>
                    <div className='textContainer'>
                        <div>
                            <img src='https://static.thenounproject.com/png/1461744-200.png' className='w3-bar-item' alt='' width='80px' height='80px'/>
                        </div>
                        <div>
                            <p>
                                During your appointment you can talk all you want, but try not to talk with your hands and be careful with facial expressions that will move your eyes.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className='post'>
                <div className='listItems'>
                    <div className='textContainer'>
                        <div>
                            <img src='https://static.thenounproject.com/png/1461744-200.png' className='w3-bar-item' alt='' width='80px' height='80px'/>
                        </div>
                        <div>
                            <p>
                                If you are going to be more than 10 minutes late we will need to reschedule.
                            </p>
                        </div>
                    </div>
                    <div className='textContainer'>
                        <div>
                            <img src='https://static.thenounproject.com/png/1461744-200.png' className='w3-bar-item' alt='' width='80px' height='80px'/>
                        </div>
                        <div>
                            <p>
                                I don't charge for canceling/rescheduling, but please let me know before your appointment starts so I can try to fill it with someone else.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='insta'>
                    {/* <InstagramEmbed 
                        url='https://www.instagram.com/p/Bpj-jd1h_hK/'
                        maxWidth={320}
                        hideCaption={true}
                        /> */}
                        <img className='bigImages' src={eyes3} alt=''/>
                </div>
            </div>


        </div>
    )
}