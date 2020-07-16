import React, { useState } from 'react'
import { useDispatch } from "react-redux";


import { deleteTweet, likeTweet, unlikeTweet } from '../store/actions/tweetAction'

function TweetBox(props) {
    const { tweet } = props
    const dispatch = useDispatch()

    const onDeletePost = (id) => {
        dispatch(deleteTweet(id))
    }

    const userid = Number(localStorage.getItem('UserId'))
    const [isLiked, setisLiked] = useState(tweet.Likes.some(el => el.UserId === userid) ? "fa fa-heart red-heart" : "fa fa-heart")

    const onHandleLike = (tweet) => {
        let checkLike = true
        tweet.Likes.forEach(el => {
            if (el.UserId === userid) {
                checkLike = !checkLike
                console.log("unlike", el)
                setisLiked("fa fa-heart")
                dispatch(unlikeTweet(tweet.id))
            }
        })
        if (checkLike) {
            console.log("like")
            setisLiked("fa fa-heart red-heart")
            dispatch(likeTweet(tweet.id))
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-1">
                    <img style={{ "width": "50px", "height": "50px" }} className="rounded" src={tweet.User.image_url} alt="" />
                </div>
                <div className="col-10">
                    <div className="float-left ml-3">
                        <span className="user-name mr-1">{tweet.User.username}</span> <span className="text-muted">{tweet.User.email}</span>
                        <div className="mb-4">
                            <p className="font-weight-light">{tweet.tweet}</p>
                            {tweet.media && <img src={tweet.media} style={{ "width": "100%", "height": "240px" }} />}
                        </div>
                        <div className="comment-bar">
                            <span className="mr-5">
                                <i onClick={() => onHandleLike(tweet)} className={isLiked}></i> </span>
                            <span className="mr-5 "><i onClick={() => console.log("Comment")} className="fa fa-comment"></i> </span>
                            <span className="mr-5 "><i onClick={() => console.log("Share")} className="fa fa-retweet"></i> </span>
                        </div>
                    </div>

                </div>
                <div className="col-1">
                    {/* <button onClick={() => onDeletePost(tweet.id)} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> */}
                    <div className="btn-group">

                        <button type="button" className="btn btn-outline-info btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                            <button onClick={() => onDeletePost(tweet.id)} className="dropdown-item" href="true">Delete</button>
                            <button className="dropdown-item" href="true">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TweetBox
