import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {
  const [movieList, setMovieList] = useState([]); // lista de filmes
  const [featuredData, setFeaturedData] = useState(null); // filme em destaque

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista de todos os filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegando o filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      
      // TODO continuar
      // https://www.youtube.com/watch?v=tBweoUiMsDg
      // 11:19:00
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}