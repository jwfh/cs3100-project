import React, { Component, Fragment } from 'react'
import { InlineMath, BlockMath } from 'react-katex';


export default class PostPreview extends Component {

  render() {
    return (
      <Fragment>
        Inline math, <InlineMath>
            \int_0^\infty x^2 \, dx
        </InlineMath>, inline displayed math, <InlineMath>
          \displaystyle\int_0^\infty x^2 \, dx
        </InlineMath> and displayed math:
        <BlockMath>
            \int_0^\infty x^2 \, dx.
        </BlockMath>
      </Fragment>
    )
  }
}
