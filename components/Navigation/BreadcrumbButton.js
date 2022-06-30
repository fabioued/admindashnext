import Router from 'next/router'

const BreadcrumbButton = ({ title, link }) => {

    const newFunction = () => {
        Router.push(link)
    }
    return (
        <>
            <div className="action-btn">
                <button onClick={() => newFunction()} type="button" className="btn px-15 btn-success">
                    <i className="las la-plus fs-16"></i>{title}
                </button>
            </div>
        </>
    );
};

export default BreadcrumbButton;