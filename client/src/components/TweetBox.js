import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import EditModal from "./EditModal";

import { deleteTweet, likeTweet, unlikeTweet, addComment } from '../store/actions/tweetAction'

function TweetBox(props) {
    const { tweet } = props
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const [comment, setComment] = useState("")
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

    const onHandleComment = () => {
        if (comment) {
            dispatch(addComment({ reply: comment, TweetId: tweet.id }))
        }
        setComment('')
    }

    return (
        <>
            <div className="row">
                <div className="col-1">
                    <img style={{ "width": "50px", "height": "50px" }} className="rounded" src={tweet.User.image_url} alt="" />
                </div>
                <div className="col-10">
                    <div className="float-left ml-3">
                        <span className="user-name mr-1">{tweet.User.username}</span> <span className="text-muted" style={{fontSize: '13px'}}>{tweet.User.email}</span>
                        <p className="user-name text-small mt-2 text-muted" style={{fontSize: '11px', fontWeight: "lighter"}}>{tweet.updatedAt.slice(0,10).split('-').reverse().join('/')}</p>
                        <div className="mb-4 mt-4">
                            <p className="font-weight-light">{tweet.tweet}</p>
                            {tweet.media !== 'http://www.coba.com/' && <img src={tweet.media} style={{ "width": "100%", "height": "280px" }} />}
                        </div>
                        <div className="comment-bar">
                            <span className="mr-5">
                                <i onClick={() => onHandleLike(tweet)} className={isLiked}>Like</i> </span>
                            <span className="mr-5 "><i onClick={() => console.log("Comment")} className="fa fa-comment"></i> </span>
                            <span className="mr-5 "><i onClick={() => console.log("Share")} className="fa fa-retweet"></i> </span>
                        </div>
                    </div>

                </div>
                <div className="col-1">
                    <div className="btn-group">
                        <button type="button" className="btn  btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                            <button onClick={() => onDeletePost(tweet.id)} className="dropdown-item" href="true">Delete</button>
                            <button type="button" className="dropdown-item" data-toggle="modal" data-target={"#modal-" + tweet.id}>
                                edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment */}
            {/* {JSON.stringify(tweet.Comments)} */}
            <div>
                {tweet.Comments.map(el => {
                    return (
                        <div className="d-flex">
                            <img class="rounded" src={el.User.image_url} style={{ "width": "30px", "height": "30px" }} />
                            <div>
                                <p>{el.reply}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="d-flex">
                <img src={localStorage.getItem("avatar")} style={{ "width": "30px", "height": "30px" }} />
                <form >
                    <input type="text" onChange={(e) => setComment(e.target.value)} />
                    <button type="button" onClick={onHandleComment} className="btn btn-primary">add comment</button>
                </form>
            </div>

            {/* pop up modal edit */}
            <EditModal id={"modal-" + tweet.id} tweet={tweet} />
        </>
    )
}

export default TweetBox
