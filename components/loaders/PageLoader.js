import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
    return (
        <div className="centeredLoader">
            <ReactLoading
                className="ReactLoading"
                type="spinningBubbles"
                height={100}
                width={50}
            />
        </div>
    );
}

