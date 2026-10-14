export function RestaurantGuruBadge() {
  return (
    <>
      <link rel="stylesheet" href="https://awards.infcdn.net/2026/circle_v2.css" precedence="default" />
      <div id="circle-r-ribbon" className="restaurant-guru-badge rg-award-lang-pt_PT">
        <div className="r-ribbon_ahead restaurant-guru-heading">
          <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
            <defs>
              <path id="chuan-yue-award-heading-arc" d="M 30 80 a 50 50 0 1 1 100 0" />
            </defs>
            <text className="r-ribbon_ahead-heading" fill="#000" textAnchor="middle">
              <textPath startOffset="50%" href="#chuan-yue-award-heading-arc">Melhor ovo Centenário</textPath>
            </text>
          </svg>
        </div>
        <p className="r-ribbon_year">2026</p>
        <a
          href="https://pt.restaurantguru.com/ChuanYue-Lisbon"
          className="restaurant-guru-restaurant-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chuan Yue — Melhor ovo Centenário 2026, Restaurant Guru"
        >
          <span className="r-ribbon_title">Chuan Yue</span>
        </a>
        <div className="r-ribbon_ahead r-ribbon_ahead-bottom restaurant-guru-footer">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <path id="chuan-yue-award-subheading-arc" d="M 12 60 a 48 48 0 0 0 96 0" />
            </defs>
            <text className="r-ribbon_ahead-subh" fill="#000" textAnchor="middle">
              <textPath startOffset="50%" href="#chuan-yue-award-subheading-arc">
                <a href="https://restaurantguru.com" target="_blank" rel="noopener noreferrer">Restaurant Guru</a>
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}
