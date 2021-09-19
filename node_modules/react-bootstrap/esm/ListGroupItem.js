import classNames from 'classnames';
import * as React from 'react';
import { useCallback } from 'react';
import BaseNavItem from '@restart/ui/NavItem';
import { useBootstrapPrefix } from './ThemeProvider';
import { jsx as _jsx } from "react/jsx-runtime";
const defaultProps = {
  variant: undefined,
  active: false,
  disabled: false
};
const ListGroupItem = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  active,
  disabled,
  className,
  variant,
  action,
  as,
  onClick,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group-item');
  const handleClick = useCallback(event => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick == null ? void 0 : onClick(event);
  }, [disabled, onClick]);

  if (disabled && props.tabIndex === undefined) {
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  return /*#__PURE__*/_jsx(BaseNavItem, {
    ref: ref,
    ...props,
    // eslint-disable-next-line no-nested-ternary
    as: as || (action ? props.href ? 'a' : 'button' : 'div'),
    onClick: handleClick,
    className: classNames(className, bsPrefix, active && 'active', disabled && 'disabled', variant && `${bsPrefix}-${variant}`, action && `${bsPrefix}-action`)
  });
});
ListGroupItem.defaultProps = defaultProps;
ListGroupItem.displayName = 'ListGroupItem';
export default ListGroupItem;