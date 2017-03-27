import _ from 'lodash/fp'
import React, { Component, PropTypes } from 'react'

import {
  customPropTypes,
  META,
} from '../../lib'

import Menu from '../../collections/Menu/Menu'

// `attached` text menus adds borders to the otherwise borderless `text` menu
// remove once this lands: https://github.com/Semantic-Org/Semantic-UI/issues/5205
const style = { border: 'none' }

/**
 * The month and year menu at the top of the calendar.
 */
export default class CalendarMenu extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    /** Month name **/
    monthName: PropTypes.string,

    /** Month number **/
    month: PropTypes.number,

    /** Year **/
    year: PropTypes.number,

    /** Current date **/
    date: PropTypes.any,

    /** Current calendar mode **/
    mode: PropTypes.string,
    /**
     * Called when a mode switch is performed (like switching from month view to
     * month or year selection)
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onChangeMode: PropTypes.func,
    /**
     * Called when paginating across months
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
  }

  static _meta = {
    name: 'CalendarMenu',
    parent: 'Datetime',
    type: META.TYPES.MODULE,
  }

  handleClick = (e) => {
    e.stopPropagation()
  }

  render() {
    const {
      monthName,
      year,
      onPrevious,
      onNext,
      onChangeMode,
      mode,
      date,
    } = this.props

    const items = _.compact([
      mode === 'DAY' && (
        <Menu.Item key='month' onClick={onChangeMode.bind(null, 'MONTH')}>
          {monthName}
        </Menu.Item>
      ),
      mode === 'YEAR' && (
        <Menu.Item key='year' onClick={onChangeMode.bind(null, 'YEAR')}>
          {year - 8}-{year + 7}
        </Menu.Item>
      ),
      _.includes(mode, ['HOUR', 'MINUTE']) && (
        <Menu.Item key='month' onClick={onChangeMode.bind(null, 'MONTH')}>
          {monthName}&nbsp;{date.getDate()}
        </Menu.Item>
      ),
      _.includes(mode, ['DAY', 'MONTH', 'HOUR', 'MINUTE']) && (
        <Menu.Item key='year' onClick={onChangeMode.bind(null, 'YEAR')}>
          {year}
        </Menu.Item>
      ),
    ])

    return (
      <Menu attached='top' fluid text widths={items.length + 2} style={style}>
        <Menu.Item icon='angle double left' onClick={onPrevious} />
        {items}
        <Menu.Item icon='angle double right' onClick={onNext} />
      </Menu>
    )
  }
}
