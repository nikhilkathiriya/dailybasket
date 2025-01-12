import React, { createRef, useEffect } from 'react';
import { PostcodeLookup } from "@ideal-postcodes/postcode-lookup";

const PostcodeLookupComponent = (props) => {
    const context = createRef();

    useEffect(() => {
        PostcodeLookup.setup({
            apiKey: "ak_m54qkativWKaEzi3pDziQL84Olapd",
            context: context.current,
            buttonClass: "btn btn-primary text-uppercase",
            buttonLabel: "Find",
            inputClass: "form-control",
            placeholder: "Seach Here",
            selectClass: "form-select",
            ...props
        });
    }, []);

    return <div ref={context}></div>;
};

export default PostcodeLookupComponent;