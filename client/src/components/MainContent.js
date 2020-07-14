import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import TweetBox from './TweetBox'

import { getTweets, addTweet } from '../store/actions/tweetAction'

export default function MainContent() {
    const dispatch = useDispatch()
    const { tweets } = useSelector(state => state.tweetReducer)

    useEffect(() => {
        dispatch(getTweets())
    }, [dispatch])

    const [tweet, setTweet] = useState("")
    const [media, setMedia] = useState('https://via.placeholder.com/300/09f/fff.png')

    const onHandlePost = () => {
       dispatch(addTweet({
           tweet,
           media
       }))
        setTweet('')
    }

    return (
        <div className="maincontent-first container-fluid">
            <div className="container p-0">
                <div className="row mt-3">
                    <div className="maincontent-component col-8 bg-white p-0">
                        <div className="search-bar p-3">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text mr-3" id="addon-wrapping">@</span>
                                </div>
                                <input onChange={(e) => setTweet(e.target.value)} type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" />
                                <div class="input-group-append">
                                    <button onClick={onHandlePost} class="btn btn-outline-secondary" type="button" id="button-addon2">Post Tweet</button>
                                </div>
                            </div>
                        </div>
                        <div className="tweets-list p-3">
                            {tweets.map(el => {
                                return (
                                    <TweetBox tweet={el}></TweetBox>
                                )
                            })}

                        </div>
                    </div>
                    {/* <div className="col-auto"></div> */}
                    <div className="col bg-dark p-0">
                        <div className="follow-list bg-primary">

                        </div>
                        <div className="tag-list bg-warning">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
