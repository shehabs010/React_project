import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

function Wrapper({ title, children, bodyClass }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <body className={bodyClass} />
      </Helmet>
      {children}
    </>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string,
  bodyClass: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Wrapper;
