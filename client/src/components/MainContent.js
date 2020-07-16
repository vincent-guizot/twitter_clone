import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import TweetBox from './TweetBox'

import { getTweets, addTweet } from '../store/actions/tweetAction'

import icnUpload from '../assets/icon/icn_upload.png'

export default function MainContent() {
    const dispatch = useDispatch()
    const hiddenFileInput = React.useRef(null);
    const { tweets } = useSelector(state => state.tweetReducer)

    useEffect(() => {
        dispatch(getTweets())
    }, [dispatch])

    useEffect(() => {
        setTweet(null)
    }, [tweets])

    const [tweet, setTweet] = useState("")
    const [media, setMedia] = useState(null)
    // const [media, setMedia] = useState('https://via.placeholder.com/300/09f/fff.png')

    const onHandlePost = () => {
        dispatch(addTweet({
            tweet,
            media
        }))
        setTweet("")
    }

    const onHandleUpload = () => {
        hiddenFileInput.current.click()
    }

    return (
        <div className="maincontent-first container-fluid">
            <div className="container p-0">
                {/* {media && <Image scr={media.} />} */}
                <div className="row mt-3">
                    <div className="maincontent-component col-8 bg-white p-0">
                        <div className="search-bar p-3">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text mr-3" id="addon-wrapping">#</span>
                                </div>
                                <input onChange={(e) => setTweet(e.target.value)} type="text" className="form-control" placeholder="Share your thought.." />
                                <div className="input-group-append">
                                    <button onClick={onHandlePost} className="btn btn-outline-info" type="button" id="button-addon2">Post </button>
                                </div>
                            </div>
                            <div onClick={onHandleUpload} style={{ backgroundColor: "#e3e3e3", borderRadius: 10, cursor: 'pointer' }}>
                                <input
                                    onChange={(e) => { 
                                        setMedia(e.target.files[0])
                                    }}
                                    ref={hiddenFileInput} type="file" className="d-none" />
                                <div className="d-flex " >
                                    <h1 class="text-hide"
                                        style={{
                                            backgroundImage: 'url("../assets/icon/icn_upload.png")',
                                            width: 50, height: 50,
                                            backgroundSize: "cover",

                                        }} />
                                    <h6>Upload Foto / Video</h6>
                                </div>
                            </div>
                        </div>
                        <div className="tweets-list p-3">
                            {tweets.map(el => {
                                return (
                                    <TweetBox tweet={el} key={el.id}></TweetBox>
                                )
                            })}

                        </div>
                    </div>
                    {/* <div className="col-auto"></div> */}
                    <div className="col p-0">
                        <div className="follow-list  mb-3">

                        </div>
                        <div className="tag-list -">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
