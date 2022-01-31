import React from "react";
import CardWrapper from "../../common/Card";
import PropTypes from "prop-types";

const ChildrenComponent = ({ children }) => {
    return React.Children.map(children, (child, i) => (
        <CardWrapper>
            <div className="d-flex">
                <span className="me-2">{i + 1}.</span> {child}
            </div>
        </CardWrapper>
    ));
};

ChildrenComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default ChildrenComponent;
