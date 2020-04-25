import React from 'react'

const Joke = (props) => {

    //console.log(props.setJoke);

    return (
        <div className='joke'>
            {props.randomJoke}
        </div>
    )
}

export default Joke
