import React from 'react'
import Link from 'gatsby-link'

const SecondPage = () => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
  </div>
)

// export default ({ data }) => {
//   console.log(data);
//   return (
//     <div>
//     <Link to="/">List</Link>
//       <h2>Star Details</h2>
//       <h3>data.starDataGraphQl.starData.CommonName</h3>
//     </div>
//   )
// }

// // export default SecondPage

// export const starQuery = graphql`
//   query StarItemQuery {
//     starDataGraphQl {
//       starData (id: Int!) {
//         CommonName,
//       }
//     }
//   }
// `
