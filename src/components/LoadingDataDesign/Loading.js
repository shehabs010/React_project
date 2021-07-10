import './Loading.css';

import PropTypes from 'prop-types';
import React from 'react';

function LoadingData({ flag }) {
  return (
    <div className={`block-loading ${flag ? 'show' : ''}`}>
      <div className="loading-listing container p-0">
        <div className="flex-wrap">
          <div className="col-12 d-flex flex-wrap mb-15">
            <div className="animationLoading col-12">
              <div>
                <div id="one" />
              </div>
              <div id="four" />
              <div id="five" />
              <div id="six" />
            </div>
            <div className="animationLoading col-12">
              <div>
                <div id="one" />
              </div>
              <div id="four" />
              <div id="five" />
              <div id="six" />
            </div>
            <div className="animationLoading col-12">
              <div>
                <div id="one" />
              </div>
              <div id="four" />
              <div id="five" />
              <div id="six" />
            </div>
            <div className="animationLoading col-12">
              <div>
                <div id="one" />
              </div>
              <div id="four" />
              <div id="five" />
              <div id="six" />
            </div>
          </div>
          <div className="col-12 d-flex flex-wrap">
            <div className="animationLoading col-12">
              <div>
                <div id="one" />
              </div>
              <div id="four" />
              <div id="five" />
              <div id="six" />
            </div>
            <div className="animationLoading col-12">
              <div>
                <div id="one" />
              </div>
              <div id="four" />
              <div id="five" />
              <div id="six" />
            </div>
            <div className="animationLoading col-12">
              <div>
                <div id="one" />
              </div>
              <div id="four" />
              <div id="five" />
              <div id="six" />
            </div>
            <div className="animationLoading col-12">
              <div>
                <div id="one" />
              </div>
              <div id="four" />
              <div id="five" />
              <div id="six" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LoadingData.propTypes = {
  flag: PropTypes.bool,
};
export default LoadingData;
