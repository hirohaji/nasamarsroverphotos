import React, { useState, useEffect } from "react";

const placeHolder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

export const LazyImage = ({ photo, src, alt }) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();

  const onLoad = (event) => {
    event.target.classList.add("loaded");
  };

  const onError = (event) => {
    event.target.classList.add("has-error");
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: "75%",
          }
        );
        observer.observe(imageRef);
      } else {
        // Old browsers fallback
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <article key={photo.id}>
      <strong> Photo# {photo.id} </strong>
      <div
        className="image"
        ref={setImageRef}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
      >
        <img src={imageSrc} alt={alt} />
      </div>
    </article>
  );
};

export default LazyImage;

/*
<article key={photo.id}>
  <div
    className="image"
    ref={setImageRef}
    style={{ backgroundImage: "url(" + imageSrc + ")" }}
    alt={alt}
    onLoad={onLoad}
    onError={onError}
  />
  <Link
    to={{
      pathname: `/photo/`,
      state: { photo }
    }}
  >
    +info
  </Link>
</article>
*/
