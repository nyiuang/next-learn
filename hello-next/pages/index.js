import Layout from '../components/MyLayout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.data.id}`} href={`/post?id=${props.data.id}`}>
      <a>{props.data.name}</a>
    </Link>
    <style jsx>{`
      a{
        text-decoration: none;
        color: blue
      }
      li{
        list-style: none;
      }
    `}</style>
  </li>
);

const Index = (props) => (
  <Layout>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <PostLink key={show.id} data={show} />
      ))}
    </ul>
    <style jsx>{`
      h1{
        color: blue;
      }
      li{
        list-style: none;
      }
    `}</style>
  </Layout>
);

Index.getInitialProps = async function(){
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index