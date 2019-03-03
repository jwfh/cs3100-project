import React, { Component, Fragment } from 'react'
import { InlineMath, BlockMath } from 'react-katex';


export default class PostPreview extends Component {

  render() {
    return (
      <Fragment>
        <p>Let <InlineMath>n</InlineMath> be a natural number with <InlineMath>6</InlineMath> dividing <InlineMath>n</InlineMath>. Show that <InlineMath>{String.raw`\phi(n)  \le \dfrac{n}{3}`}</InlineMath>.</p>
      </Fragment>

    )
  }
}
