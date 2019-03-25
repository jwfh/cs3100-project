import React, { Fragment } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { Typography } from '@material-ui/core';

const inlineMath = (mathContent) => (
  <InlineMath>
    \displaystyle {mathContent}
  </InlineMath>
);

const displayMath = (mathContent) => (
  <BlockMath>
    {mathContent}
  </BlockMath>
);

const renderMath = (content) => {
  return (
    <Typography>
      {content}
    </Typography>
  );
};

const PostDisplay = (props) => (
  <Fragment>
    <Typography>
      {props.title}
    </Typography>
    {renderMath(props.content)}
  </Fragment>
);

export default PostDisplay;
