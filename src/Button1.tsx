import React from 'react';



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
type OwnPropsType={
    onClickFn: ()=>void
    btnClass: string
    title: string
}
