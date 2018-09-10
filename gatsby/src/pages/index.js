import React from "react";
import Link from 'gatsby-link';

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <Link to="/page-2/">Page 2</Link>
      <h2>Stars</h2>
      <ul>
        {
          data.starDataGraphQl.starDataList.map(star => (
            <li>({star.id}) {star.CommonName}</li>
          ))
          // <li>{data.starDataGraphQl.starDataList[4].CommonName}</li>
        }
      </ul>
    </div>
  )
}
export const starQuery = graphql`
  query StarListQuery {
    starDataGraphQl {
      starDataList {
          id,
          CommonName,
      }
    }
}
`

// query MyQuery {
//   site {
//     host,
//   }
// }

// export const query = graphql`
// query RepositoriesQuery {
//   githubGraphQl {
//     viewer {
//       repositories {
//         nodes {
//           name
//           url
//         }
//       }
//     }
//   }
// }
// `