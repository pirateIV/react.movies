import React from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatTime } from "utils/filters";
import StarRatings from "components/StarRatings";

const HeroMedia = ({ item }) => {
  const { t } = useTranslation();

  const buildURL = (imagePath) =>
    `https://image.tmdb.org/t/p/w780/${imagePath}`;

  const renderMetaInfo = () => {
    if (!item) return null;

    return (
      <div className="flex items-center gap-2 *:opacity-60 *:inset-y-0">
        <StarRatings className="aspect-11/2" votes={item?.vote_average} />
        <div id="vote-average">{item?.vote_average.toFixed(1)}</div>
        <div id="reviews">
          <span> · </span>
          {item?.vote_count} Reviews
        </div>
        {item?.release_date && (
          <div id="release-date">
            <span> · </span>
            {item?.release_date.substring(0, 4)}
          </div>
        )}
        {item?.runtime && (
          <div className="runtime">
            <span> · </span>
            {formatTime(item?.runtime)}
          </div>
        )}
      </div>
    );
  };

  const renderImage = () => {
    if (!item?.backdrop_path) return null;

    return (
      <Imgix
        src={buildURL(item.backdrop_path)}
        className="w-full h-full object-cover"
        sizes="(max-width: 800px) 100vw, 800px"
        loading="lazy"
        imgixParams={{
          auto: "compress,format",
          fit: "crop",
          w: 800,
          q: 80,
        }}
        htmlAttributes={{
          width: 800,
          height: 450,
        }}
        alt={item.title}
      />
    );
  };

  return (
    <Link
      id="featured"
      to={`movie/${item?.id}`}
      aria-label={item?.title || "link to movie"}
    >
      <div className="featured-container aspect-3/2 lg:aspect-25/9">
        <div className="featured-content">
          <div className="absolute p-10 top-0 xs:left-0 right-0 lg:hidden max-w-[300px]:right-0">
            <button
              title="watchTrailer"
              className="text-5xl text-white/50 hover:text-white"
            >
              <div className="i-ph-play-circle-light"></div>
            </button>
          </div>

          <h1>{item?.title}</h1>
          {item && (
            <>
              {renderMetaInfo()}
              <p>{item?.overview}</p>

              <button id="watch_trailer">
                <div className="i-ph-play"></div>
                {t("Watch Trailer")}
              </button>
            </>
          )}
        </div>

        <div className="featured-image">{renderImage()}</div>
      </div>
    </Link>
  );
};

export default HeroMedia;
