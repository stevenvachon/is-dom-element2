import isDOMNode from "is-dom";

const ELEMENT_NODE = 1; // https://mdn.io/Node/nodeType

export default element => isDOMNode(element) && element.nodeType===ELEMENT_NODE;
