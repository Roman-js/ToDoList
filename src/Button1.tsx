import React from 'react';

type OwnPropsType = {
    onClickFn: ()=>void
    btnClass: string
    title: string
}

class Button1 extends React.Component <OwnPropsType> {

    render = () => {
        return (

                <button onClick={this.props.onClickFn}
                        className={this.props.btnClass}>
                    {this.props.title}
                </button>
        );
    }
}


export default Button1;

