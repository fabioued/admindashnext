import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index"
import links from "../../lib/innerMenu"
import {
    Form,
    Input,
    Select,
    Upload,
    Button
} from 'antd';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

import {
    align,
    font,
    fontColor,
    fontSize,
    formatBlock,
    hiliteColor,
    horizontalRule,
    lineHeight,
    list,
    paragraphStyle,
    table,
    template,
    textStyle,
    image,
    link
} from "suneditor/src/plugins";


const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const AddBlog = () => {
    const editorRef = React.createRef();
    const { state, dispatch } = useContext(Context);
    const { current_page } = state;

    const { Option } = Select;

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'landing-page'
            });
        })();
    }, []);




    return (
        <>
            <InnerMenu links={links.blogsLinks} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                                    <h4 className="text-capitalize fw-500 breadcrumb-title pl-3">Add a Blog Post</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-12">
                    <div className="card card-Vertical card-default card-md mb-4">
                        <div className="card-body py-md-30">
                            <form className="createForm">
                                <div className="row">
                                    <div className="col-md-12 mb-25">
                                        <label for="formGroupExampleInputs" class="color-dark fs-14 fw-500 align-center">Title</label>
                                        <input type="text" className="form-control ih-medium ip-gray radius-xs b-light px-15" placeholder="" />
                                    </div>
                                    <div className="col-md-6 mb-25">
                                        <label for="formGroupExampleInput3" class="color-dark fs-14 fw-500 align-center">Author</label>
                                        <input type="text" className="form-control ih-medium ip-gray radius-xs b-light px-15" placeholder="" />
                                    </div>
                                    <div className="col-md-6 mb-25">
                                        <label for="formGroupExampleInput3" class="color-dark fs-14 fw-500 align-center">Language</label>
                                        <Select defaultValue="en" onChange={handleChange} style={{ width: '100%' }}>
                                            <Option value="en">English</Option>
                                            <Option value="fr">French</Option>
                                        </Select>
                                    </div>
                                    <div className="col-md-6 mb-25">
                                        <label for="formGroupExampleInput3" class="color-dark fs-14 fw-500 align-center">Input Tags</label>
                                        <input type="text" className="form-control ih-medium ip-gray radius-xs b-light px-15" placeholder="" />
                                    </div>
                                    <div className="col-md-6 mb-25">
                                        <label for="formGroupExampleInput3" class="color-dark fs-14 fw-500 align-center">Input SEO Keywords</label>
                                        <input type="text" className="form-control ih-medium ip-gray radius-xs b-light px-15" placeholder="City" />
                                    </div>

                                    <SunEditor
                                        autoFocus={true}
                                        lang="en"
                                        setOptions={{
                                            showPathLabel: false,
                                            minHeight: "50vh",
                                            maxHeight: "50vh",
                                            placeholder: "Enter your text here!!!",
                                            plugins: [
                                                align,
                                                font,
                                                fontColor,
                                                fontSize,
                                                formatBlock,
                                                hiliteColor,
                                                horizontalRule,
                                                lineHeight,
                                                list,
                                                paragraphStyle,
                                                table,
                                                template,
                                                textStyle,
                                                image,
                                                link
                                            ],
                                            buttonList: [
                                                ["undo", "redo"],
                                                ["font", "fontSize", "formatBlock"],
                                                ["paragraphStyle"],
                                                [
                                                    "bold",
                                                    "underline",
                                                    "italic",
                                                    "strike",
                                                    "subscript",
                                                    "superscript"
                                                ],
                                                ["fontColor", "hiliteColor"],
                                                ["removeFormat"],
                                                "/", // Line break
                                                ["outdent", "indent"],
                                                ["align", "horizontalRule", "list", "lineHeight"],
                                                ["table", "link", "image"]
                                            ],
                                            formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
                                            font: [
                                                "Arial",
                                                "Calibri",
                                                "Comic Sans",
                                                "Courier",
                                                "Garamond",
                                                "Georgia",
                                                "Impact",
                                                "Lucida Console",
                                                "Palatino Linotype",
                                                "Segoe UI",
                                                "Tahoma",
                                                "Times New Roman",
                                                "Trebuchet MS"
                                            ]
                                        }}

                                        onChange={handleChange}
                                    />

                                    <div className="col-md-8">
                                        <div className=" bookmark__button py-20  mt-15 flex-wrap">
                                            <div className="button-group">
                                                {<Button block className="btn-large btn btn-success btn-squared border-squared px-20 " onClick={() => showModal(blog)}>Save</Button>}
                                                {<Button block className="btn-large btn btn-danger  btn-squared border-squared px-30 " onClick={() => showDeleteBlogModal(blog)}>Delete</Button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* ends: .card */}
                </div>

            </div>

        </>
    );
};

export default AddBlog;