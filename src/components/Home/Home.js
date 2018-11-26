import React, { Component } from 'react'
import './Home.css'
import InstagramEmbed from 'react-instagram-embed'


class Home extends Component {
    constructor(){
        super()

        this.state = {
            instaUrls: [
                'https://www.instagram.com/p/BoRkt75DQui/',
                'https://www.instagram.com/p/BoRlyeTjPOl/',
                'https://www.instagram.com/p/BoRlDc-Dyz5/',
                'https://www.instagram.com/p/BoRmVqFjcCs/',
                'https://www.instagram.com/p/BoRmBXxjFod/',
                'https://www.instagram.com/p/BoRltMVjuI6/',
                'https://www.instagram.com/p/BoRliklj59c/',
                'https://www.instagram.com/p/BoRlMPGDVL6/',
                'https://www.instagram.com/p/BoRlDc-Dyz5/',
                'https://www.instagram.com/p/BoRk4wZDVfz/',
                'https://www.instagram.com/p/BoRkiW-jOzR/',
                'https://www.instagram.com/p/BoRkL2mjjDI/',
                'https://www.instagram.com/p/BoRkCUaDC81/',
                'https://www.instagram.com/p/Bpj-jd1h_hK/'
            ],
            currentIndex: 0
        }
    }

    next = () => {
        let { currentIndex, instaUrls } = this.state
        if(currentIndex < instaUrls.length - 1) {
            currentIndex++
        } else {
            currentIndex = 0
        }
        this.setState({
            currentIndex
        })
    }

    previous = () => {
        let { currentIndex, instaUrls } = this.state
        if(currentIndex > 0) {
            currentIndex--
        } else {
            currentIndex = instaUrls.length - 1
        }
        this.setState({
            currentIndex
        })
    }
    render(){
        return (
            <div>
                <img  
                src='https://lashwaxboutique.com/wp-content/uploads/2018/05/lash-and-wax-boutique_home_hero5-1.jpg' className='heroImage' 
                alt=''
                />
                <div className='insta'>
                        <button onClick={this.previous}>
                            Previous
                        </button>
                        <InstagramEmbed
                            url={this.state.instaUrls[this.state.currentIndex]}
                            maxWidth={320}
                            hideCaption={false}
                            containerTagName='div'
                            injectScript
                        />
                        <button onClick={this.next}>
                            Next
                        </button>
                </div>
            </div>
        )
    }
}

export default Home