import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import TweetBox from './TweetBox'
import ViewLocation from '../components/ViewLocation'

import { getTweets, addTweet } from '../store/actions/tweetAction'
import { getUsers } from '../store/actions/userAction'

export default function MainContent() {
    const dispatch = useDispatch()
    const hiddenFileInput = React.useRef(null);
    const hiddenLocationInput = React.useRef(null);
    const { tweets } = useSelector(state => state.tweetReducer)
    const { users } = useSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(getTweets())
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        setTweet(null)
    }, [tweets])

    const [tweet, setTweet] = useState("")
    const [media, setMedia] = useState(null)
    const [uploadPreview, setUploadPreview] = useState("")
    const [location, setLocation] = useState(null)

    const onHandlePost = () => {
        dispatch(addTweet({
            tweet,
            media
        }))
        setTweet("")
        setMedia(null)
        setLocation(null)
        setUploadPreview("")
    }

    const onHandleUpload = () => {
        hiddenFileInput.current.click()
    }

    const onHandleLocation = () => {
        hiddenLocationInput.current.click()
        navigator.geolocation.getCurrentPosition(getLatLng);
        console.log("ini location lang lat :",location)
    }

    const getLatLng = (position) => {
        const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        setLocation(currentPos);
    };

    return (
        <>
            <div className="maincontent-first container-fluid">
                <div className="container p-0">
                    <div className="row mt-3">
                        <div className="maincontent-component col-8 bg-white p-0">
                            <div className="search-bar p-3">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text mr-3" id="addon-wrapping">#</span>
                                    </div>
                                    <input value={tweet} onChange={(e) => setTweet(e.target.value)} type="text" className="form-control" placeholder="Share your thought.." />
                                    <div className="input-group-append">
                                        <button onClick={onHandlePost} className="btn btn-outline-info" type="button" id="button-addon2">Post </button>
                                    </div>
                                </div>
                                    {uploadPreview && (<img src={uploadPreview} style={{ "width": "200px", "height": "150px" }} />)}
                                {location && <ViewLocation location={location} />}
                                <div className="d-flex justify-space-arround" style={{ backgroundColor: "#e3e3e3", borderRadius: 10, cursor: 'pointer' }}>
                                    <div onClick={onHandleUpload} style={{ cursor: 'pointer' }}>
                                        <input
                                            onChange={(e) => {
                                                setMedia(e.target.files[0])
                                                setUploadPreview(URL.createObjectURL(e.target.files[0]))
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
                                    <div onClick={onHandleLocation} style={{ cursor: 'pointer' }}>
                                        <input ref={hiddenLocationInput} className="d-none" />
                                        <div className="d-flex " >
                                            <h1 class="text-hide"
                                                style={{
                                                    backgroundImage: 'url("../assets/icon/icn_map.png")',
                                                    width: 50, height: 50,
                                                    backgroundSize: "cover",

                                                }} />
                                            <h6>Upload Location</h6>
                                        </div>
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
                            <div className="follow-list p-4 mb-3">
                                <h6>Follow</h6>
                                {JSON.stringify(users)}
                            </div>
                            <div className="tag-list p-4">
                                <h6>Tags</h6>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
