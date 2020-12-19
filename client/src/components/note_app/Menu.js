import React from 'react';
import { cx, css } from 'emotion';

exporst const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cx(
            className,
            css`
                & > * {
                    display: inline-block;
                }
                & > * + * {
                    margin-left: 15px;
                }
            `
        )}
    />
));

export default Menu;


