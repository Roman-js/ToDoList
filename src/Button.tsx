import React from 'react';



class Button extends React.Component <OwnPropsType> {

    render = () => {
        return (

                <button onClick={this.props.onClickFn}
                        className={this.props.btnClass}>
                    {this.props.title}
                </button>


        );
    }
}


export default Button;
type OwnPropsType={
    onClickFn: ()=>void
    btnClass: string
    title: string
}
