
const BreadCrumb = ({ title, count }) => {
    return (
        <>
            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                    <h4 className="text-capitalize fw-500 breadcrumb-title"> {title} </h4>
                </div>
            </div>
        </>
    );
};

export default BreadCrumb;