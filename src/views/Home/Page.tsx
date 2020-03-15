import "./scss/index.scss";

import classNames from "classnames";
import HEREMap from 'here-maps-react';
import * as React from "react";
import HPlatform, { HMap, HMapMarker, HMapPolyLine} from "react-here-map";
import { Link } from "react-router-dom";

import { Button, Loader, ProductsFeatured } from "../../components";
import { generateCategoryUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./types/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import noPhotoImg from "../../images/no-photo.svg";

const points = [
  { lat: 52.5309825, lng: 13.3845921 },
  { lat: 52.5311923, lng: 13.3853495 },
  { lat: 52.5313532, lng: 13.3861756 },
  { lat: 52.5315142, lng: 13.3872163 },
  { lat: 52.5316215, lng: 13.3885574 },
  { lat: 52.5320399, lng: 13.3925807 },
  { lat: 52.5321472, lng: 13.3935785 },
];

const coords = { lat: 52.5309825, lng: 13.3845921 };

const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };

  return (
    <>
  <HPlatform
    app_id="2Ts3vDUTLPW8kNUtyFRY"
    app_code="MDivMVFtNkpim-dWuetlWw"
    useCIT
    useHTTPS
	interactive
    includeUI
    includePlaces
  >
    <HMap
      style={{
        height: "400px",
        width: "800px",
      }}
mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
    useEvents // Required for events
// tslint:disable-next-line:no-console
    mapEvents={{ pointerdown: e => console.log("Map Pointer Down", e) }} // event handlers
    >
      <HMapPolyLine points={points} />
<HMapMarker coords={coords} icon={icon} />
    </HMap>
  </HPlatform>,
  document.getElementById("app")
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
	<HEREMap
	      appId="s1kDjVfOnj3pb1K9WQ3D"
	      appCode="_rUjaYJvp7j5NUDV2UHXfb23i_sa0eOekP_74XuarQo"
	    />
      <div
        className="home-page__hero"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage.url})` }
            : null
        }
      >
        <div className="home-page__hero-text">
          <div>
            <span className="home-page__hero__title">
              <h1>Final reduction</h1>
            </span>
          </div>
          <div>
            <span className="home-page__hero__title">
              <h1>Up to 70% off sale</h1>
            </span>
          </div>
        </div>
        <div className="home-page__hero-action">
          {loading && !categories ? (
            <Loader />
          ) : (
            categoriesExist() && (
              <Link
                to={generateCategoryUrl(
                  categories.edges[0].node.id,
                  categories.edges[0].node.name
                )}
              >
                <Button>Shop sale</Button>
              </Link>
            )
          )}
        </div>
      </div>
      <ProductsFeatured />
      {categoriesExist() && (
        <div className="home-page__categories">
          <div className="container">
            <h3>Shop by category</h3>
            <div className="home-page__categories__list">
              {categories.edges.map(({ node: category }) => (
                <div key={category.id}>
                  <Link
                    to={generateCategoryUrl(category.id, category.name)}
                    key={category.id}
                  >
                    <div
                      className={classNames(
                        "home-page__categories__list__image",
                        {
                          "home-page__categories__list__image--no-photo": !category.backgroundImage,
                        }
                      )}
                      style={{
                        backgroundImage: `url(${
                          category.backgroundImage
                            ? category.backgroundImage.url
                            : noPhotoImg
                        })`,
                      }}
                    />
                    <h3>{category.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
