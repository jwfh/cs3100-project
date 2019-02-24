import React, { Component } from 'react'
import { InlineMath, BlockMath } from 'react-katex';


export default class PostPreview extends Component {

  render() {
    return (
      <div>
        <InlineMath>
            \int_0^\infty x^2 dx
        </InlineMath>
        <BlockMath>
            \int_0^\infty x^2 dx
        </BlockMath>
      </div>
    )
  }
}
