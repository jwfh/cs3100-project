import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { InlineMath, BlockMath } from 'react-katex';
import { Typography } from '@material-ui/core';

// https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
const getIndicesOf = (searchStr, str, caseSensitive) => {
  console.log(str);
  var searchStrLen = searchStr.length;
  if (searchStrLen === 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
};

const isValidMathIndices = (openIdxs, closeIdxs) => {
  for (let i = 0; i < openIdxs.length; i++) {
    if (openIdxs[i] >= closeIdxs[i]) {
      return false;
    }
  }
  return true;
};

const inlineMath = (mathContent) => (
  <InlineMath>\displaystyle {mathContent}</InlineMath>
);

const displayMath = (mathContent) => <BlockMath>{mathContent}</BlockMath>;

const renderContent = (content) => {
  const inlineOpen = getIndicesOf('\\(', content),
    inlineClose = getIndicesOf('\\)', content),
    displayOpen = getIndicesOf('\\[', content),
    displayClose = getIndicesOf('\\]', content);
  if (
    inlineOpen.length !== inlineClose.length ||
    displayOpen.length !== displayClose.length ||
    !isValidMathIndices(inlineOpen, inlineClose) ||
    !isValidMathIndices(displayOpen, displayClose)
  ) {
    console.log('Missing $ inserted.');
  } else {
    let components = [];
  }

  return <div />;
};

const PostDisplay = (props) => (
  <Fragment>
    <Typography>{props.title}</Typography>
    {renderContent(props.content)}
  </Fragment>
);

PostDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PostDisplay;
