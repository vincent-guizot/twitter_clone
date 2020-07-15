import React from 'react'
import { useDispatch } from "react-redux";


import { deleteTweet  } from '../store/actions/tweetAction'

function TweetBox(props) {
    const {tweet} = props
    const dispatch = useDispatch()

    const onDeletePost = (id) => {
        dispatch(deleteTweet(id))
    }

    return (
        <>
            <div className="row">
                <div className="col-1">
                    <img style={{ "width": "50px", "height": "50px" }} className="rounded-circle" src={tweet.User.image_url} alt="" />
                </div>
                <div className="col-10">
                    <div className="float-left">
                        <p className="user-name">{tweet.User.username} <span className="text-muted">{tweet.User.email}</span></p>
                        <p className="font-weight-light">{tweet.tweet}</p>
                        <div className="comment-bar">
                            <button className="btn btn-sm btn-outline-primary mr-3">Like</button>
                            <button className="btn btn-sm btn-info">Comment</button>
                        </div>
                    </div>
                    <div className="float-right">
                        <button onClick={() => onDeletePost(tweet.id)} type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TweetBox
