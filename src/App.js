import React from 'react';
import './App.css';
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineFieldNumber } from 'react-icons/ai';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true)
  const [ url, setUrl ] = useState('https://api.themoviedb.org/3/person/popular');
  const [total_pages, setTotal_pages] = useState()
  const [ data, setData ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ api_key, setApi_key ] = useState('df8b08ecb436696fee41a00f8d87a540');
  const [ language, setLanguage ] = useState('en');


  const getData = () => {
    setLoading(true)
    fetch(`${url}?api_key=${api_key}&language=${language}&page=${page}`)
    .then(res => res.json())
    .then(res => {
      setData(res.results)
      setTotal_pages(res.total_pages)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }

  useEffect(() => {
    getData()
  }, [])


  const prev = () => {
    if (page === 1) {
      return
    }
    setPage(page - 1)
    getData()
  }

  const next = () => {
    setPage(page + 1)
    getData()
  }

  console.log(data)

  return (
    <div className="App">
      <div className='navbar'>
        <img src='https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2012/10/22/1350920078216/Silhouettes-from-popular--003.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=b9349a5eb98ad0f6484affb6bfd03c9c' alt='logo' style={{height: '55px'}}  />
        {loading
        ?
        ''
        :
        <div className='to-left'>
          <AiFillCaretLeft className='icon' onClick={prev} />
          <div className='nums'>
            <div className='btn'>
              {page === 1 ? <AiOutlineFieldNumber /> : page - 1}
            </div>
            <div className='btn mid'>
              <strong>{page}</strong>
            </div>
            <div className='btn'>
              {page + 1}
            </div>
          </div>
          <AiFillCaretRight className='icon' onClick={next} />
          <div className='tot'>total: {total_pages}</div>
        </div>  
        }
      </div>
      <div className='all'>
      {
        loading
        ?
          <img src='https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif' alt='loading' className='loading' />
        :
          data.map(actor => {
            return (
              <div key={actor.id} class="row">
                <div className="column">
                  <div className="card">
                    <div className='name'>{actor.name}</div>
                    <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} alt='image' />
                  </div>
                </div>
              </div>
            )
          }
        )
      }
      </div>
    </div>
  )
}

export default App;
