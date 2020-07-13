import React from 'react'


export default function MainContent() {
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
                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                                </div>
                            </div>
                        </div>
                        <div className="tweets-list p-3">
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
