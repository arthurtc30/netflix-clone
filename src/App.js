import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {
  const [movieList, setMovieList] = useState([]); // lista de filmes
  const [featuredData, setFeaturedData] = useState(null); // filme em destaque
  const [blackHeader, setBlackHeader] = useState(false); // variável que diz se o background do header deve aparecer

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista de todos os filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegando o filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      // pegando dados especificos (genero, temporadas, notas, etc)
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => { // coloca o background do header preto caso scrolle para baixo
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    // monitora scroll da página
    window.addEventListener('scroll', scrollListener)

    // remove monitoramento de scroll
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito por <b>Arthur Teixeira</b><br />
        Direitos de imagem para Netflix<br />
        Dados pegos do site TheMovieDB
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
        </div>
      }
    </div>
  );
}