import { MovieData } from '@interfaces/index';
import IconPlay from '@assets/icons/play.svg';
import IconPlayDark from '@assets/icons/play-dark.svg';
import IconStar from '@assets/icons/star.svg';

function MovieCard({ movie }: { movie: MovieData }) {
  return (
    <div
      className="group relative w-full md:w-[250px] h-[166px] md:h-[146px] flex-shrink-0 font-regular text-white"
      style={{
        background: `url(${movie.backdrop_path}) 50% / cover no-repeat`,
      }}>
      <div
        className="absolute group-hover:hidden bottom-0  w-full  max-h-5/6 rounded flex flex-col justify-end items-center space-y-6 p-3"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 22.78%, #000 122.69%)',
        }}>
        <div className="max-w-fit p-3 rounded-full bg-black/50 border border-white">
          <img src={IconPlay} alt="icono reproducir película" />
        </div>
        <span>{movie.title}</span>
      </div>
      <div className="hidden absolute group-hover:flex flex-col h-full w-full bg-black/70 justify-end  space-y-6 p-3">
        <div className="flex items-center">
          <div className="cursor-pointer relative overflow-hidden w-7 h-7 mr-3 rounded-full p-2 bg-black/50 hover:bg-aqua border border-white hover:border-black">
            <div className="absolute inset-0 flex transition-transform duration-300 transform hover:-translate-x-full">
              <img
                src={IconPlay}
                alt="icono reproducir película"
                className=" px-2"
              />
              <img
                src={IconPlayDark}
                alt="icono reproducir película"
                className=" px-2"
              />
            </div>
          </div>
          <span>{movie.title}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              src={IconStar}
              alt={`calificación ${movie.vote_average}`}
              className="w-3.5 mr-1.5"
            />
            <span>{movie.vote_average}</span>
          </div>
          <span>{movie.release_date?.split('-')[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
