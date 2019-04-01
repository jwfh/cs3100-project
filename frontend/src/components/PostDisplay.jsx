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
  <InlineMath>{'\\displaystyle ' + mathContent}</InlineMath>
);

const displayMath = (mathContent) => (
  <div style={{ display: 'block' }}>
    <BlockMath>{mathContent}</BlockMath>
  </div>
);

const renderContent = (content) => {
  const inlineOpen = getIndicesOf('\\(', content),
    inlineClose = getIndicesOf('\\)', content),
    displayOpen = getIndicesOf('\\[', content),
    displayClose = getIndicesOf('\\]', content);
  let components = [];
  if (
    inlineOpen.length !== inlineClose.length ||
    displayOpen.length !== displayClose.length ||
    !isValidMathIndices(inlineOpen, inlineClose) ||
    !isValidMathIndices(displayOpen, displayClose)
  ) {
    console.log('Missing $ inserted.');
  } else {
    // Merge indices into one array for open and one array for close
    let open = [],
      close = [];
    let i = 0,
      j = 0,
      k = 0;
    while (i < inlineOpen.length || j < displayOpen.length) {
      let inlineIdx = null,
        displayIdx = null,
        openIdx,
        closeIdx,
        mathType;

      if (i < inlineOpen.length) {
        inlineIdx = inlineOpen[i];
      }
      if (j < displayOpen.length) {
        displayIdx = displayOpen[j];
      }
      if (inlineIdx !== null && displayIdx !== null) {
        // We got two indices... pick the smaller one the decrement the other counter
        if (inlineIdx < displayIdx) {
          openIdx = inlineIdx;
          closeIdx = inlineClose[i];
          i++;
          mathType = 'inline';
        } else {
          openIdx = displayIdx;
          closeIdx = displayClose[j];
          j++;
          mathType = 'display';
        }
      } else if (inlineIdx === null) {
        // Must use the display
        openIdx = displayIdx;
        closeIdx = displayClose[j];
        j++;
        mathType = 'display';
      } else {
        // Must use inline
        openIdx = inlineIdx;
        closeIdx = inlineClose[i];
        i++;
        mathType = 'inline';
      }
      console.log(k, openIdx, closeIdx);
      let before = content.substring(k, openIdx),
        inside = content.substring(openIdx + 2, closeIdx);

      console.log('before', before);
      console.log('inside', inside);

      components.push(
        <Typography style={{ display: 'inline' }}>{before}</Typography>,
      );

      components.push(' ');

      if (mathType === 'display') {
        components.push(displayMath(inside));
      } else {
        components.push(inlineMath(inside));
      }

      components.push(' ');

      k = closeIdx + 2;
    }
    let last = content.substring(k + 2, content.length);
    console.log('last', last);
    components.push(<Typography>{last}</Typography>);
  }

  return components;
};

const PostDisplay = (props) => (
  <Fragment>
    <Typography variant="h6" component="p" style={{ display: 'block' }}>
      {props.title}
    </Typography>
    <div style={{ display: 'block' }}>{renderContent(props.content)}</div>
  </Fragment>
);

PostDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PostDisplay;
