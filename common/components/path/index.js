import { default as React, PropTypes } from 'react';
import { map } from 'lodash';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import {
  fetchLink,
  hoverLink,
  unhoverLink
} from '../../actions';
import classNames from 'classnames';
import linkSelector from '../../selectors/link';

class PathItem extends React.Component {
  componentDidMount(){
    const {
      onLinkClick,
      url,
      onLinkHover,
      onLinkUnhover,
      onLinkAnchorHover,
      onLinkAnchorUnhover,
    } = this.props;

    $('.path-list').animate({ scrollLeft: $('.path-list')[0].scrollWidth }, 100);

    $(findDOMNode(this)).hover(function(e){
      e.preventDefault();
      onLinkHover(url);
    }, function(e){
      e.preventDefault();
      onLinkUnhover();
    });

  }
  render() {
    const { link, onPathItemClick, url, preview_url, will_be_chopped } = this.props;
    const itemClasses = classNames({
      'path-list__item': true,
      'is-hovered': (url == preview_url),
      'will-be-chopped': will_be_chopped
    });

    return (
      <div className={itemClasses} key={url} onClick={() => onPathItemClick(url)}>
        <div
          className="path-list__item__wrap"
          dangerouslySetInnerHTML={{__html: link.title}} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPathItemClick: (url) => {
      $('.l-links').animate({ scrollLeft: $('[id="'+encodeURIComponent(url)+'"]').offset().left }, 100);
    },
    onLinkHover: (href) => {
      dispatch(hoverLink(href))
    },
    onLinkUnhover: () => {
      dispatch(unhoverLink())
    }
  }
}

export default connect(linkSelector, mapDispatchToProps)(PathItem);
