import dynamic from 'next/dynamic'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../public/css/style.css';
import NextNProgress from "nextjs-progressbar";

// css
import '../public/vendor_assets/css/bootstrap/bootstrap.css';
import '../public/vendor_assets/css/fontawesome.css';
import '../public/vendor_assets/css/line-awesome.min.css';
import '../public/vendor_assets/css/select2.min.css';
import '../public/vendor_assets/css/slick.css';


//js 

dynamic(() => import('../public/vendor_assets/js/jquery/jquery-3.5.1.min.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/jquery/jquery-ui.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/bootstrap/popper.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/bootstrap/bootstrap.min.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/moment/moment.min.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/accordion.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/drawer.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/feather.min.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/loader.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/message.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/moment.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/notification.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/popover.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/select2.full.min.js'), { ssr: false })
dynamic(() => import('../public/theme_assets/js/icon-loader.js'), { ssr: false })
dynamic(() => import('../public/theme_assets/js/main.js'), { ssr: false })
dynamic(() => import('../public/vendor_assets/js/jquery/jquery-3.5.1.min.js'), { ssr: false })


// components

import TopNav from '../components/Navigation/TopBar';
import SideBar from '../components/Navigation/SideBar';
import { BackTop } from 'antd';
import { Provider } from '../context'

function MyApp({ Component, pageProps }) {
    return (
        <Provider>
            <BackTop className="back-top" />
            <NextNProgress color="#349E4D" />
            <ToastContainer position='top-right' />
            <div className="layout-light side-menu overlayScroll">
                <div className="mobile-search"></div>
                <div className="mobile-author-actions"></div>
                <TopNav />
                <div className="main-content">
                    <SideBar />
                    <div className="contents">
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>
        </Provider>
    );
}


export default MyApp;