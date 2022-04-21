import Link from "next/link";

const Error = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-12">
                <div className=" content-center">
                    <div className="error-page text-center">
                        <div className="error-page__title">404</div>
                        <h5 className="fw-500">Sorry! the page you are looking for doesn't exist.</h5>
                        <div className="content-center mt-30">
                            <Link href="/dashboard">
                                <a className="btn btn-primary btn-default btn-squared px-30">
                                    Return Home</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;