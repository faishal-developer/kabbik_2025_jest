'use client'
import { BlogInfoFromDB } from "@/utils/types";
import { decodeWord, formatDateDDMMYY } from "@/helpers/commonFunction";
import { container } from "../ui/static/tailwind.classes";
import { useEffect, useRef, useState } from "react";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import CommentSection from "./Comments.view";


const ElaborateBlog = ({ blog }: { blog: BlogInfoFromDB }) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(convertFromRaw(JSON.parse(blog?.content_body)))
    );
    const [currentContentLength, setCurrentContentLength] = useState(0);

    const editorRef = useRef<Editor>(null);

    const focus = () => {
        editorRef.current?.focus();
    };

    useEffect(() => {
        const content = editorState.getCurrentContent();
        setCurrentContentLength(content.getPlainText("").length);
    }, [editorState]);

    let className = "RichEditor-editor";
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first()?.getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
        }
    }

  return (
    <div>
        <div className='relative'>
           <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[256px] absolute left-0 bottom-[-15px]`}></div>
          <div className="container mx-auto px-4 pt-[67px] pb-6 ">
           <div className="text-center max-w-4xl mx-auto">
             <h1 className="font-bengali text-[35px]  font-bold text-white mb-6 leading-tight">
               {decodeWord(blog?.title)}
             </h1>
             <p className="font-bengali text-2xl md:text-[24px] text-white/90 font-normal leading-relaxed">
                চিন্তা, চেতনা ও চর্চার গল্প
             </p>
           </div>
         </div>
        </div>
        <div className={container('1306px')}>
            <div className="mt-10">
                <figure>
                    <img className="max-w-[100%] rounded-[8px] max-h-[100%]" src={blog?.featured_image} />
                </figure>
                <div className="text-white font-medium max-w-[1000px] mx-auto mt-5 text-[18px]">
                    {<Editor
                        readOnly={true}
                        editorState={editorState}
                        onChange={() => {}}
                        placeholder="Write a blog..."
                        ref={editorRef}
                        spellCheck={true}
                    />}
                </div>
            </div>
            <div>
                <CommentSection/>
            </div>
        </div>
    </div>
    
  );
};

export default ElaborateBlog;
