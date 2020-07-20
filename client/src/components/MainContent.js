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
        console.log("ini location lang lat :", location)
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
                                <div className="d-flex align-items-center mb-3" >
                                    <p className="mr-3">Attach : </p>
                                    <div onClick={onHandleUpload} style={{ cursor: 'pointer' }}>
                                        <input
                                            onChange={(e) => {
                                                setMedia(e.target.files[0])
                                                setUploadPreview(URL.createObjectURL(e.target.files[0]))
                                            }}
                                            ref={hiddenFileInput} type="file" className="d-none" />
                                        <div className="upload-media text-center mr-3 d-flex" >
                                            <i style={{ color: "#17a2b8", fontSize: "1.5rem" }} className="fa fa-image mr-3"></i>
                                            <p>Upload Photo / Video</p>
                                        </div>
                                    </div>
                                    <div onClick={onHandleLocation} style={{ cursor: 'pointer' }}>
                                        <input ref={hiddenLocationInput} className="d-none" />
                                        <div className="upload-media text-center mr-3 d-flex" >
                                            <i style={{ color: "#17a2b8", fontSize: "1.5rem" }} class="fa fa-map-marker mr-3"></i>
                                            <p>Upload Location</p>
                                        </div>
                                    </div>
                                </div>
                                {(uploadPreview || location) && (
                                    <div className="w-100 mb-1">
                                        <div className="row">
                                            <div className="col">
                                                {uploadPreview && (<img src={uploadPreview} className="w-100" style={{ height: "300px" }} />)}
                                            </div>
                                            <div className="col">
                                                {location && <ViewLocation location={location} />}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="tweets-list p-3">
                                {tweets.map(el => {
                                    return (
                                        <TweetBox tweet={el} key={el.id}></TweetBox>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col p-0">
                            <div className="pb-3">
                                <div className="follow-list p-4">
                                    <h5>Follow New Users</h5>
                                    <hr />
                                    <div className="follow-scroll">
                                        {users.map(user => {
                                            return (
                                                <div className="row ">
                                                    <div className="col-2">
                                                        <img className="rounded" style={{ "width": "35px", "height": "35px" }} src={user.image_url} />
                                                    </div>
                                                    <div className="col-10">
                                                        <div className="float-left">
                                                            <p className="user-name">{user.username}</p>
                                                            <p className="text-muted">{user.email}</p>
                                                        </div>
                                                        <div className="float-right">
                                                            <button className="btn btn-sm btn-info">FOLLOW</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
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
