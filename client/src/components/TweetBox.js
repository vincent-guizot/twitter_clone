import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import EditModal from "./EditModal";

import { deleteTweet, likeTweet, unlikeTweet, addComment, deleteComment } from '../store/actions/tweetAction'

function TweetBox(props) {
    const { tweet } = props
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userReducer)
    const [comment, setComment] = useState("")
    const userid = Number(localStorage.getItem('UserId'))
    const [textLike, setTextLike] = useState(tweet.Likes.some(el => el.UserId === userid) ? "Unlike" : "Like")
    const [isLiked, setisLiked] = useState(tweet.Likes.some(el => el.UserId === userid) ? "fa fa-heart red-heart" : "fa fa-heart text-muted")

    const onDeletePost = (id) => {
        dispatch(deleteTweet(id))
    }

    const onHandleLike = (tweet) => {
        let checkLike = true
        tweet.Likes.forEach(el => {
            if (el.UserId === userid) {
                checkLike = !checkLike
                console.log("unlike", el)
                setisLiked("fa fa-heart")
                setTextLike("Like")
                dispatch(unlikeTweet(tweet.id))
            }
        })
        if (checkLike) {
            console.log("like")
            setTextLike("Unlike")
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

    const onHandleDeleteComent = (id) => {
        console.log('delet comment with id: ', id);
        dispatch(deleteComment(id))
    }

    return (
        <>
            <div className="row">
                <div className="col-1">
                    <img style={{ "width": "50px", "height": "50px" }} className="rounded" src={tweet.User.image_url} alt="" />
                </div>
                <div className="col-10">
                    <div className="ml-3">
                        <span className="user-name mr-1">{tweet.User.username}</span> <span className="text-muted" style={{ fontSize: '15px' }}>{tweet.User.email}</span>
                        <p className="text-small mt-1 text-muted" style={{ fontSize: '11px', fontWeight: "lighter" }}>{tweet.updatedAt.slice(0, 10).split('-').reverse().join('/')}</p>
                        <div className="mb-4 mt-4">
                            <p className="font-weight-light">{tweet.tweet}</p>
                            {tweet.media !== 'http://www.coba.com/' && <img src={tweet.media} style={{ "width": "100%", "height": "280px" }} />}
                        </div>
                        <div className="comment-bar w-100">
                            <div className="row">
                                <div className="col-4" style={{ cursor: 'pointer' }} onClick={() => onHandleLike(tweet)}><i className={isLiked}></i><span className="ml-2"> {textLike} </span></div>
                                <div className="col-4" style={{ cursor: 'pointer' }}><i onClick={() => console.log("Comment")} className="fa fa-comment mr-1 text-muted"></i><span className="ml-2">  Comment</span></div>
                                <div className="col-4" style={{ cursor: 'pointer' }}><i onClick={() => console.log("Share")} className="fa fa-retweet mr-1 text-muted"></i><span className="ml-2">  Share</span></div>
                            </div>
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
            {tweet.Comments.length > 0 &&
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-11 comments-list">
                        {tweet.Comments.map(el => {
                            return (
                                <div className="row mb-3">
                                    <div className="col-1">
                                        <img class="rounded mr-3" src={el.User.image_url} style={{ "width": "30px", "height": "30px" }} />
                                    </div>
                                    <div className="col-10 upload-media w-100">
                                        <span className="user-name mr-1">{el.User.username}</span>
                                        <span>{el.reply}</span>
                                    </div>
                                    <div className="col-1">
                                        <button onClick={() => onHandleDeleteComent(el.id)} type="button" class="close" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                    {/* <div className="col-1"></div> */}

                </div>}
            <div className="row">
                <div className="col-1">

                </div>
                <div className="col-10 d-flex">
                    <img className="mr-3" src={localStorage.getItem("avatar")} style={{ "width": "30px", "height": "30px" }} />
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Share your comment.." onChange={(e) => setComment(e.target.value)} />
                        <div class="input-group-append">
                            <button class="btn btn-info" onClick={onHandleComment} type="button">
                                <i className="fa fa-send"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* pop up modal edit */}
            <EditModal id={"modal-" + tweet.id} tweet={tweet} />
        </>
    )
}

export default TweetBox
