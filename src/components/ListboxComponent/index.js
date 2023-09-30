import React, {useRef} from "react";
import { ViewportList } from 'react-viewport-list';

const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref
) {
    const { children, role, ...other } = props;
    const Row = ({props,type:Type}) => {
        return <Type {...props} key={props.id}/>
    }
    const itemCount = Array.isArray(children) ? children.length : 0;
    const viewboxRef = useRef(null)
    return (
        <div ref={ref} role={role} >
            <div {...other} ref={viewboxRef}>
                    <ViewportList
                        viewportRef={viewboxRef}
                        items={children}
                        count={itemCount}
                    >
                        {Row}
                    </ViewportList>
                {/*<List*/}
                {/*    height={250}*/}
                {/*    width={300}*/}
                {/*    rowHeight={itemSize}*/}
                {/*    overscanCount={5}*/}
                {/*    rowCount={itemCount}*/}
                {/*    rowRenderer={props => {*/}
                {/*        return React.cloneElement(children[props.index], {*/}
                {/*            style: props.style*/}
                {/*        });*/}
                {/*    }}*/}
                {/*    role={role}*/}
                {/*/>*/}
            </div>
        </div>
    );
});

export default ListboxComponent;