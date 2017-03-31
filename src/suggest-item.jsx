import React from 'react';
import shallowCompare from 'react/lib/shallowCompare';
import classnames from 'classnames';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import ActionSearch from 'material-ui/svg-icons/action/search';

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestItem extends React.Component {
  /**
   * Whether or not the component should update
   * @param {Object} nextProps The new properties
   * @param {Object} nextState The new state
   * @return {Boolean} Update or not?
   */
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  /**
   * When the suggest item got clicked
   * @param {Event} event The click event
   */
  onClick = event => {
    event.preventDefault();
    this.props.onSelect(this.props.suggest);
  };

  getListItem(suggest, classes) {
    const MapsPlace = props => <SvgIcon {...props}>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7
        13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38
        0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5
        1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </SvgIcon>;
    if (suggest.types) {
      return <ListItem className={classes}
                       leftIcon={<MapsPlace />}
                       style={this.props.style}
                       onMouseDown={this.props.onMouseDown}
                       onMouseOut={this.props.onMouseOut}
                       onClick={this.onClick}>
        {this.props.suggest.label}
      </ListItem>;
    }
    return <ListItem className={classes}
                     leftIcon={<ActionSearch />}
                     style={this.props.style}
                     onMouseDown={this.props.onMouseDown}
                     onMouseOut={this.props.onMouseOut}
                     onClick={this.onClick}>
      {this.props.suggest.label}
    </ListItem>;
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const classes = classnames(
      'geosuggest__item',
      this.props.className,
      this.props.suggestItemClassName,
      {'geosuggest__item--active': this.props.isActive},
      {
        [this.props.activeClassname]: this.props.activeClassname ?
          this.props.isActive : null
      }
    );
    return <div>
      {this.getListItem(this.props.suggest, classes)}
      <Divider inset={true}/>
    </div>;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestItem.defaultProps = {
  isActive: false,
  className: '',
  suggest: {}
};
