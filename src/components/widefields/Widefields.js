import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel-rtl';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Widefields.css';
import { Link } from 'react-router-dom';
import { getWideFields } from '../../services/specialityServices';
import logger from '../../services/logger'


class Widefields extends Component {
    state = {
        isMobile: false,
        widefileds: []
    }
    componentDidMount() {
        getWideFields().then(response => {

            this.setState({ widefileds: response.data })
            this.handleIsMobile();
            window.addEventListener('resize', this.handleIsMobile)
        }, error => { logger.log(error); window.location = "/error" })
    }

    handleIsMobile = () => {
        const isMobile = (window.innerWidth < 768);
        this.setState({ isMobile });
    }


    render() {
        const { widefileds, isMobile } = this.state;
        const WidefieldsItems = widefileds.length && widefileds.map(w => <div key={w.code} className="item">
            <Link to={{ pathname: `/specialities/fields/${w.code}` }}>{w.nameAr}   </Link></div>);

        return (
            <>
                {widefileds.length && !isMobile && <OwlCarousel loop
                    margin={10} autoWidth={true}
                    items={4}
                    autoplay={true}
                    rtlClass={"owl-rtl"}
                    rtl={true}

                    dots={false} className=" filter__slider  owl-theme">
                    {WidefieldsItems}

                </OwlCarousel>}
                {widefileds.length && isMobile && <div className="filter__slider">{WidefieldsItems}</div>}


            </>
        );
    }
}

export default Widefields;
