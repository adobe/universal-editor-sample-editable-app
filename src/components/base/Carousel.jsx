"use client";
import React from "react";
import Container from "./Container";
import "./Carousel.scss";

const AUTOPLAY_INTERVAL_MS = 5000;

const readBool = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  return value === "true" || value === true;
};

const CarouselSlide = (props) => {
  const { resource, data, isActive, index, total, extraClassName = "" } = props;

  const className = [
    "carousel-slide",
    isActive ? "is-active" : "",
    extraClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      data-aue-component="carousel-item"
      data-aue-resource={resource}
      data-aue-type="component"
      data-aue-label={data?.["cq:panelTitle"] || `Slide ${index + 1}`}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!isActive}
    >
      <div className="carousel-slide-content">
        <Container
          resource={resource}
          type="container"
          data={data}
          label="Slide Content"
        />
      </div>
    </div>
  );
};

const Carousel = (props) => {
  const { resource, type, data } = props;
  const [items, setItems] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const autoplay = readBool(data?.autoplay, false);
  const showIndicators = readBool(data?.showIndicators, true);
  const showNavigation = readBool(data?.showNavigation, true);

  React.useEffect(() => {
    if (!data) return;
    const itemKeys = Object.keys(data).filter((item) => {
      return data[item]?.["sling:resourceType"] === "wknd/components/container";
    });
    setItems(itemKeys);
    setActiveIndex(0);
  }, [resource, type, data]);

  React.useEffect(() => {
    if (!autoplay || items.length < 2 || isPaused) return undefined;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [autoplay, items.length, isPaused, activeIndex]);

  const goTo = (index) => {
    if (items.length === 0) return;
    const next = (index + items.length) % items.length;
    setActiveIndex(next);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const hasMultiple = items.length > 1;

  const containerHandlers = autoplay
    ? {
        onMouseEnter: () => setIsPaused(true),
        onMouseLeave: () => setIsPaused(false),
        onFocus: () => setIsPaused(true),
        onBlur: () => setIsPaused(false),
      }
    : {};

  return (
    <div
      className="carousel"
      data-aue-component="carousel"
      data-aue-resource={resource}
      data-aue-type={type}
      data-aue-label="Carousel"
      role="region"
      aria-roledescription="carousel"
      {...containerHandlers}
    >
      <div className="carousel-viewport">
        {items.map((item, index) => {
          const slideData = data[item];
          const strength = slideData?.overlayStrength;
          /* "medium" is the existing default — no extra class needed. */
          const overlayClass =
            strength && strength !== "medium"
              ? `carousel-slide--overlay-${strength}`
              : "";
          return (
            <CarouselSlide
              key={`${resource}/${item}`}
              resource={`${resource}/${item}`}
              data={slideData}
              isActive={index === activeIndex}
              index={index}
              total={items.length}
              extraClassName={overlayClass}
            />
          );
        })}
      </div>

      {hasMultiple && showNavigation && (
        <>
          <button
            type="button"
            className="carousel-control carousel-control-prev"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="carousel-control carousel-control-next"
            onClick={goNext}
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {hasMultiple && showIndicators && (
        <div className="carousel-indicators" role="tablist" aria-label="Slides">
          {items.map((item, index) => (
            <button
              key={`indicator-${item}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={data[item]?.["cq:panelTitle"] || `Slide ${index + 1}`}
              className={`carousel-indicator ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
