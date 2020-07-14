import React from 'react'

function TweetBox() {
    return (
        <>
            <div className="row">
                <div className="col-1">
                    <img style={{ "width": "50px", "height": "50px" }} className="rounded-circle" src={"https://img.okeinfo.net/content/2018/11/21/194/1980688/sederet-tampilan-mewah-jennie-blackpink-total-seharga-rp500-an-juta-kn4RSsRoWh.jpg"} alt="" />
                </div>
                <div className="col-11">
                    <div className="float-left">
                        <p>Jennie <span className="text-muted">jennie@mail.com</span></p>
                        <p className="font-weight-light">Belajar bersama mr Ncoes ea</p>
                        <div className="comment-bar">
                            <button className="btn btn-sm btn-outline-primary mr-3">Like</button>
                            <button className="btn btn-sm btn-info">Comment</button>
                        </div>
                    </div>
                    <div className="float-right">
                        <button type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TweetBox
